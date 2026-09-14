import { GoogleGenerativeAI } from "@google/generative-ai";
import { embed } from "../rag/embeddings.js";
import { search, loadStore } from "../rag/vectorStore.js";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Load vector store into memory on first import
loadStore();

/**
 * POST /api/chat
 * Streams a RAG-grounded response from Gemini.
 */
export async function handleChat(req, res) {
  const { message } = req.body;

  if (!message || typeof message !== "string" || !message.trim()) {
    return res
      .status(400)
      .json({ success: false, message: "A non-empty 'message' string is required." });
  }

  try {
    // 1. Embed the user's query
    const queryEmbedding = await embed(message.trim());

    // 2. Retrieve top 6 relevant chunks
    const results = search(queryEmbedding, 6);
    const context = results
      .map(
        (r, i) =>
          `[Source ${i + 1}: ${r.source} | Relevance: ${r.score.toFixed(3)}]\n${r.text}`
      )
      .join("\n\n");

    // 3. Build the RAG prompt
    const systemPrompt = `You are the official IEEE DTU AI Assistant — a knowledgeable, friendly, and concise chatbot for the IEEE Student Branch at Delhi Technological University (DTU).

KNOWLEDGE PRIORITY (follow in order):
1. CONTEXT FIRST: If the retrieved Context contains relevant information, use it as your primary source. Prefer specific facts, names, dates, and numbers from the Context over general knowledge.
2. IEEE GENERAL KNOWLEDGE: If the Context lacks sufficient detail but the question is about IEEE, IEEE societies (CS, WIE, PES, CASS, SIGHT, etc.), IEEE events (IEEEXtreme, hackathons, conferences), IEEE membership, IEEE standards, or engineering topics — answer using your training knowledge. You know IEEE well.
3. DTU GENERAL: For questions about Delhi Technological University itself (location, departments, campus) that are not in Context, you may answer from general knowledge.
4. OFF-TOPIC BLOCK: If the question has nothing to do with IEEE, IEEE DTU, engineering, or technology — politely decline: "I'm here to help with IEEE and IEEE DTU topics. For anything else, feel free to explore the web!"

RESPONSE RULES:
- Greetings (hi, hello, hey): Warmly introduce yourself as the IEEE DTU Assistant and ask how you can help.
- Factual questions: 1-2 sentences, precise and direct.
- Descriptive questions: Up to 4 sentences, well-structured.
- If you genuinely don't have the answer even after checking Context and your knowledge: "I don't have that specific detail right now. For the latest info, reach out to IEEE DTU at ieeedtu.contact@gmail.com or visit ieeedtu.in."
- NEVER make up names, dates, or numbers. If unsure about a specific detail, say so and point to official channels.
- No markdown (no **, ##, bullet points). Plain conversational text only.
- Be warm, professional, and confident — you represent IEEE DTU.`;

    const userPrompt = `Context (retrieved from IEEE DTU knowledge base):
${context || "No specific context retrieved for this query."}

User Question: ${message.trim()}

Answer:`;

    // 4. Stream the response from Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });

    const result = await model.generateContentStream({
      contents: [
        { role: "user", parts: [{ text: systemPrompt + "\n\n" + userPrompt }] },
      ],
      generationConfig: {
        temperature: 0.2,
        maxOutputTokens: 300,
      },
    });

    // Set streaming headers
    res.setHeader("Content-Type", "text/plain; charset=utf-8");
    res.setHeader("Transfer-Encoding", "chunked");
    res.setHeader("Cache-Control", "no-cache, no-store");
    res.setHeader("X-Content-Type-Options", "nosniff");

    for await (const chunk of result.stream) {
      const text = chunk.text();
      if (text) {
        res.write(text);
      }
    }

    res.end();
  } catch (err) {
    console.error("❌ Chat error:", err.message);

    if (!res.headersSent) {
      res.status(500).json({
        success: false,
        message: "Something went wrong. Please try again later.",
      });
    } else {
      // Headers already sent (mid-stream error), just end the response
      res.end();
    }
  }
}
