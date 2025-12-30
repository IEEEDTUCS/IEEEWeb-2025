from flask import Flask, request, Response, stream_with_context
from flask_cors import CORS
import os
import time

from langchain_huggingface import HuggingFaceEmbeddings
from langchain_community.chat_models import ChatOllama
from langchain_community.vectorstores import FAISS
from langchain_community.document_loaders import JSONLoader
from langchain.memory import ConversationBufferMemory
from langchain.chains import create_retrieval_chain
from langchain.chains.combine_documents import create_stuff_documents_chain
from langchain_core.prompts import ChatPromptTemplate, MessagesPlaceholder

# -------------------- Flask Setup --------------------
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000", "http://localhost:5173"], supports_credentials=True)

# -------------------- LLM --------------------
llm = ChatOllama(
    model="llama3.2",
    temperature=0.0,
)

# -------------------- Paths --------------------
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_PATH = os.path.join(BASE_DIR, "ieee.json")
DB_FAISS_PATH = os.path.join(BASE_DIR, "vector")

# -------------------- Embeddings --------------------
embeddings = HuggingFaceEmbeddings(
    model_name="BAAI/bge-large-en-v1.5"
)

# -------------------- Metadata --------------------
def metadata_func(record: dict, metadata: dict) -> dict:
    metadata["id"] = record.get("id")
    for k, v in record.get("metadata", {}).items():
        metadata[k] = v
    return metadata

# -------------------- Vector Store --------------------
def get_vectorstore():
    if not os.path.exists(DB_FAISS_PATH):
        loader = JSONLoader(
            file_path=DATA_PATH,
            jq_schema=".[]",
            content_key="text",
            metadata_func=metadata_func
        )
        docs = loader.load()
        vs = FAISS.from_documents(docs, embeddings)
        vs.save_local(DB_FAISS_PATH)
        return vs
    return FAISS.load_local(
        DB_FAISS_PATH,
        embeddings,
        allow_dangerous_deserialization=True
    )

vectorstore = get_vectorstore()

# -------------------- Prompt --------------------
SYSTEM_PROMPT = """
Role: You are the Official IEEE DTU Data Retrieval Assistant.
[STRICT SCOPE & CONTRADICTION LOGIC]
1. GREETINGS: You may respond politely to greetings and invite IEEE DTU questions.
2. OFF-TOPIC: Reply EXACTLY: "I can only help with IEEE DTU related questions. Ask me about our events, workshops, or activities!"
3. MISCONCEPTIONS: Reply with IEEE DTU clarification if misattributed.
[RESPONSE RULES]
Plain text only, single paragraph, no formatting.
Factual queries: 1 sentence.
Descriptive queries: max 3 sentences.
Context: {context}
"""

prompt = ChatPromptTemplate.from_messages([
    ("system", SYSTEM_PROMPT),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{input}")
])

doc_chain = create_stuff_documents_chain(llm, prompt)

retrieval_chain = create_retrieval_chain(
    retriever=vectorstore.as_retriever(search_kwargs={"k": 4}),
    combine_docs_chain=doc_chain
)

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
    question = data.get("question", "")
    session_id = data.get("session_id", "default")

    memory = get_memory(session_id)

    def generate():
        history = memory.load_memory_variables({})["chat_history"]
        result = retrieval_chain.invoke({
            "input": question,
            "chat_history": history
        })
        answer = result.get("answer", "")
        memory.save_context({"input": question}, {"answer": answer})
        yield answer

    return Response(
    answer,
    status=200,
    mimetype="text/plain"
)


# -------------------- Run --------------------
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5001, debug=True)
