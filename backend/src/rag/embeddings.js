import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const embeddingModel = genAI.getGenerativeModel({ model: "gemini-embedding-001" });

/**
 * Embed a single text string.
 * @param {string} text
 * @returns {Promise<number[]>} 768-dimensional embedding vector
 */
export async function embed(text) {
  const result = await embeddingModel.embedContent(text);
  return result.embedding.values;
}

/**
 * Embed an array of texts in batches (max 100 per API call).
 * Includes retry with exponential backoff for rate limits.
 * @param {string[]} texts
 * @returns {Promise<number[][]>}
 */
export async function embedBatch(texts) {
  const BATCH_SIZE = 10; // Reduced from 20 to avoid rate limits
  const allEmbeddings = [];

  for (let i = 0; i < texts.length; i += BATCH_SIZE) {
    const batch = texts.slice(i, i + BATCH_SIZE);
    const batchNum = Math.floor(i / BATCH_SIZE) + 1;
    const totalBatches = Math.ceil(texts.length / BATCH_SIZE);
    console.log(`   📦 Batch ${batchNum}/${totalBatches} (${batch.length} texts)...`);

    let attempt = 0;
    const maxRetries = 5;

    while (attempt < maxRetries) {
      try {
        const result = await embeddingModel.batchEmbedContents({
          requests: batch.map((text) => ({
            content: { parts: [{ text }] },
          })),
        });
        allEmbeddings.push(...result.embeddings.map((e) => e.values));
        break;
      } catch (err) {
        attempt++;
        if (attempt >= maxRetries) throw err;
        // Longer backoff for rate limits: 10s, 20s, 40s, 80s
        const delay = Math.pow(2, attempt) * 5000;
        console.warn(
          `   ⚠️  Rate limited — retry ${attempt}/${maxRetries} in ${Math.round(delay / 1000)}s...`
        );
        await new Promise((r) => setTimeout(r, delay));
      }
    }

    // Increased delay between batches to 5s for free tier rate limits
    if (i + BATCH_SIZE < texts.length) {
      console.log(`   ⏳ Waiting 5s before next batch...`);
      await new Promise((r) => setTimeout(r, 5000));
    }
  }

  return allEmbeddings;
}
