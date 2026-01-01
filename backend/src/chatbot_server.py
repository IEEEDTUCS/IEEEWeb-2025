from flask import Flask, request, Response, stream_with_context
from flask_cors import CORS
import os
import time
import threading
import json
from langchain_core.documents import Document
from langchain_core.output_parsers import StrOutputParser
from langchain.callbacks.base import BaseCallbackHandler
from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.chat_models import ChatOllama
from langchain_community.vectorstores import FAISS
from langchain.memory import ConversationBufferMemory
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

os.environ["TF_CPP_MIN_LOG_LEVEL"] = "3"
os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

# -------------------- Flask Setup --------------------
app = Flask(__name__)
CORS(app, supports_credentials=True)

class FlaskStreamingHandler(BaseCallbackHandler):
    def __init__(self):
        self.tokens = []

    def on_llm_new_token(self, token: str, **kwargs):
        self.tokens.append(token)

# -------------------- Paths --------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "ieee.json")
DB_FAISS_PATH = os.path.join(BASE_DIR, "vector")

# -------------------- Embeddings --------------------
embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-large-en-v1.5"
)
llm=ChatOllama(
    model="llama3.2",
    temperature=0.0
    )

def get_vectorstore():
    if not os.path.exists(DB_FAISS_PATH):
        print(f"--- REBUILDING DATABASE FROM {DATA_PATH} ---")
        try:
            with open(DATA_PATH, 'r', encoding='utf-8') as f:
                data = json.load(f)
            docs = []
            for record in data:
                meta_str = f"{record.get('id')} {record.get('metadata', {}).get('event', '')}"
                combined_content = f"{record.get('text', '')} \nKeywords: {meta_str}"
                
                doc = Document(
                    page_content=combined_content,
                    metadata={"id": record.get("id"), **record.get("metadata", {})}
                )
                docs.append(doc)
            vs = FAISS.from_documents(docs, embeddings)
            vs.save_local(DB_FAISS_PATH)
            print(f"--- SUCCESS: Database built with {len(docs)} records ---")
            return vs
        except Exception as e:
            print(f"--- ERROR: {e} ---")
            return None
    print("--- LOADING EXISTING DATABASE ---")
    return FAISS.load_local(DB_FAISS_PATH, embeddings, allow_dangerous_deserialization=True)

vectorstore = get_vectorstore()

rephrase_system_prompt = """
Given the chat history and the latest user question, rephrase the question to be a standalone search query.
If the user says "it", "he", or "she", replace it with the specific name from history.
Output ONLY the rewritten question. Do not answer.
"""
rephrase_chain = ( 
    ChatPromptTemplate.from_messages([
        ("system", rephrase_system_prompt),
        MessagesPlaceholder(variable_name="chat_history"),
        ("human", "{input}"),
    ])
    | llm 
    | StrOutputParser()
)

# -------------------- Prompt --------------------
SYSTEM_PROMPT = """
Role: You are the Official IEEE DTU Data Retrieval Assistant.

[STRICT LOGIC ORDER - MANDATORY]
1. IF DATA EXISTS: If the Context contains information about the query (e.g., Deva Nand, Sonam Rewari), start the answer IMMEDIATELY with that data. You are STRICTLY FORBIDDEN from starting with "Hello" or "I am the assistant" in this case.
2. IF ONLY GREETING: Only if the user says "hi" or "hello" without any name or topic, identify yourself as the assistant.
3. DATA GAP: If the topic is IEEE DTU but the detail is not in Context, say: "I don't have that information."
4. OFF-TOPIC: If the query is unrelated to IEEE DTU, say: "I can only assist with IEEE DTU-related questions."

[RESPONSE FORMAT]
- Plain text only. NO bold, NO italics, NO bullet points.
- Single continuous block of text (one paragraph).
- Factual queries: exactly 1 sentence. Descriptive: maximum 3 sentences.

[GROUNDING]
Use ONLY the provided Context. Resolve pronouns (he, she, it) using Chat History.

Context: {context}
Chat History: {chat_history}
User Query: {input}
"""

answer_prompt = ChatPromptTemplate.from_messages([
    ("system", SYSTEM_PROMPT),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{input}")
])

# -------------------- Session Memory --------------------
sessions = {}

def get_memory(session_id):
    now = time.time()
    for sid in list(sessions.keys()):
        if now - sessions[sid]["last_active"] > 600:
            del sessions[sid]

    if session_id not in sessions:
        sessions[session_id] = {
            "memory": ConversationBufferMemory(
                memory_key="chat_history",
                return_messages=True,
                output_key="answer",
                k=3
            ),
            "last_active": now
        }

    sessions[session_id]["last_active"] = now
    return sessions[session_id]["memory"]

# -------------------- Routes --------------------
@app.route("/health", methods=["GET"])
def health():
    return {"status": "ok", "service": "IEEE DTU Chatbot"}

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json
    question = data.get("question")
    session_id = data.get("session_id", "default")
    
    memory = get_memory(session_id)
    history = memory.load_memory_variables({})["chat_history"]

    queries_to_run = [question] 
    
    if history:
        try:
            rewritten = rephrase_chain.invoke({"chat_history": history, "input": question})
            rewritten = rewritten.strip()
            if len(rewritten) > 3 and rewritten != question:
                queries_to_run.append(rewritten)
        except:
            pass

    all_docs = []
    seen_ids = set()

    for q in queries_to_run:
        docs = vectorstore.similarity_search(q, k=10) 
        for d in docs:
            unique_id = d.metadata.get('id', d.page_content[:20])
            if unique_id not in seen_ids:
                all_docs.append(d)
                seen_ids.add(unique_id)

    def generate():
        handler = FlaskStreamingHandler()
        streaming_llm = ChatOllama(model="llama3.2", temperature=0.0, callbacks=[handler])
        doc_chain = create_stuff_documents_chain(streaming_llm, answer_prompt)
        
        done = False
        def run_chain():
            nonlocal done
            doc_chain.invoke({
                "input": question,
                "chat_history": history,
                "context": all_docs
            })
            done = True

        threading.Thread(target=run_chain, daemon=True).start()

        full_answer = ""
        while not done or handler.tokens:
            if len(handler.tokens) > 0:
                token = handler.tokens.pop(0)
                full_answer += token
                yield token
            else:
                time.sleep(0.01)
        memory.save_context({"input": question}, {"answer": full_answer})

    return Response(stream_with_context(generate()), mimetype="text/plain")

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True, use_reloader=False)