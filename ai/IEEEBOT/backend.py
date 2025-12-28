from flask import Flask, request, Response, render_template_string, stream_with_context
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

app = Flask(__name__)

llm=ChatOllama(
    model="llama3.2", 
    streaming=True,
    temperature=0.0,
)

base_dir=os.path.dirname(os.path.abspath(__file__))
data_path=os.path.join(base_dir, "ieee.json")
DB_FAISS_PATH=os.path.join(base_dir, "vector")

embeddings=HuggingFaceEmbeddings(model_name="BAAI/bge-large-en-v1.5")

def metadata_func(record: dict, metadata: dict) -> dict:
    metadata["id"]=record.get("id")
    
    inner_meta=record.get("metadata", {})
    for key, value in inner_meta.items():
        metadata[key]=value

    return metadata

def get_vectorstore():
    if not os.path.exists(DB_FAISS_PATH):
        loader=JSONLoader(
            file_path=data_path,
            jq_schema=".[]",
            content_key="text",
            metadata_func=metadata_func
        )
        
        docs=loader.load()
        
        vectorstore=FAISS.from_documents(docs, embeddings)
        vectorstore.save_local(DB_FAISS_PATH)
        return vectorstore
    else:
        return FAISS.load_local(
            DB_FAISS_PATH, 
            embeddings, 
            allow_dangerous_deserialization=True
        )

vector=get_vectorstore()

sessions_memory={}

template = """
Role: You are the Official IEEE DTU Data Retrieval Assistant.

[STRICT SCOPE & CONTRADICTION LOGIC]
1. GREETINGS: You may respond politely to greetings (e.g., "hello", "hi", "how are you"). Identify yourself as the IEEE DTU assistant and immediately invite questions about IEEE DTU.
2. OFF-TOPIC: If the query is unrelated to IEEE DTU (e.g., weather, coffee, general math), reply EXACTLY: "I can only help with IEEE DTU related questions. Ask me about our events, workshops, or activities!"
3. MISCONCEPTIONS: If a user associates IEEE DTU with something it is NOT (e.g., a sports club, music band), reply: "IEEE DTU is a technical society focused on engineering and innovation; I don't have information regarding [User's Topic]."


[RESPONSE ARCHITECTURE - MANDATORY]
1. FORMATTING: Use plain text only. PROHIBITED: bolding (**), italics (*), headers (#), bullet points (-), or line breaks.
2. STRUCTURE: Your entire response must be a single, continuous block of text. Do not use multiple paragraphs.
3. LIMITS: Factual queries must be exactly 1 sentence. Descriptive queries must be maximum 3 sentences.

[INTERNAL LOGIC & CONTEXT TRACKING]
1. COREFERENCE RESOLUTION: You must analyze the chat_history to resolve pronouns. If the previous turn discussed "TechWeek", then "it", "its", or "the event" refers specifically to TechWeek.
2. METADATA SENSITIVITY: Distinguish between years using the metadata. If asked about 2024, do not provide 2025 data.
3. DATA GAP RULE: If the subject is an IEEE DTU entity but the detail is missing from the Context, say: "I don't have that information."

Context: {context}
"""

custom_prompt = ChatPromptTemplate.from_messages([
    ("system", template),
    MessagesPlaceholder(variable_name="chat_history"),
    ("human", "{input}"),
])

question_answer_chain=create_stuff_documents_chain(llm, custom_prompt)

query_model=create_retrieval_chain(
    retriever=vector.as_retriever(search_kwargs={"k": 4}),
    combine_docs_chain=question_answer_chain
)

@app.route("/")
def home():
    file_path = os.path.join("IEEEBOT", "index.html")
    
    try:
        with open(file_path, "r", encoding="utf-8") as f:
            return render_template_string(f.read())
    except FileNotFoundError:
        return f"Error: index.html not found at {file_path}. Check your folder name!"

def get_user_memory(session_id):
    now = time.time()
    expired=[sid for sid, data in sessions_memory.items() if now - data['last_active']>600]
    for sid in expired:
        del sessions_memory[sid]
        print(f"Cleared session: {sid}")

    if session_id not in sessions_memory:
        sessions_memory[session_id] = {
            "memory":ConversationBufferMemory(
                memory_key="chat_history", 
                return_messages=True, 
                output_key="answer",
                k=3
            ),
            "last_active": now
        }
    else:
        sessions_memory[session_id]["last_active"]=now
    return sessions_memory[session_id]["memory"]

@app.route("/chat", methods=["POST"])
def chat():
    data=request.json
    user_input=data.get("question")
    session_id =data.get("session_id", "default_user")

    memory=get_user_memory(session_id)

    def generate():
        chat_history=memory.load_memory_variables({})["chat_history"]
        full_response=""
        for chunk in query_model.stream({"input": user_input, "chat_history": chat_history}):
            if 'answer' in chunk:
                full_response+=chunk['answer']
                yield chunk['answer']

        memory.save_context({"input": user_input},{"answer": full_response})

    return Response(
        stream_with_context(generate()), 
        mimetype='text/plain',
        headers={'X-Accel-Buffering':'no'}
    )

if __name__ == "__main__":
    app.run(debug=True, port=5000)
