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

    // 2. Retrieve top 10 relevant chunks for maximum context
    const results = search(queryEmbedding, 10);
    const context = results
      .map(
        (r, i) =>
          `[Source ${i + 1}: ${r.source} | Relevance: ${r.score.toFixed(3)}]\n${r.text}`
      )
      .join("\n\n");

    // 3. Build the RAG prompt
    const systemPrompt = `You are the official IEEE DTU AI Assistant — a knowledgeable, friendly, and professional chatbot for the IEEE Student Branch at Delhi Technological University (DTU).

STRICT RULES:
1. ONLY answer using the information provided in the Context below. Do NOT use any external knowledge or make up facts.
2. If the Context does not contain enough information to fully answer the question, say: "I don't have that specific information. Please reach out to IEEE DTU directly for more details."
3. If the user asks something completely unrelated to IEEE or IEEE DTU, politely say: "I can only assist with questions about IEEE and IEEE DTU."
4. If the user greets you (hello, hi, hey), respond warmly and introduce yourself briefly, then ask how you can help.
5. Keep responses clear, concise, and well-structured. Use 1-3 sentences for factual queries, up to 5 sentences for descriptive questions.
6. Be conversational and approachable — you represent IEEE DTU to its visitors.
7. Do NOT use markdown formatting like ** or ## in responses. Use plain text only.`;

    const userPrompt = `Context:
${context}

User Question: ${message.trim()}

Answer:`;

    // 4. Stream the response from Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-3.5-flash-lite" });

    const result = await model.generateContentStream({
      contents: [
        { role: "user", parts: [{ text: systemPrompt + "\n\n" + userPrompt }] },
      ],
      generationConfig: {
        temperature: 0.3,
        maxOutputTokens: 512,
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
