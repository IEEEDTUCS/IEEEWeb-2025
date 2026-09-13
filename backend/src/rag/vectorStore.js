import { readFileSync, writeFileSync, existsSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DB_PATH = path.join(__dirname, "vectorstore.json");

let store = { chunks: [] };

/**
 * Load the vector store from disk into memory.
 * Call this once at server startup.
 */
export function loadStore() {
  if (existsSync(DB_PATH)) {
    const raw = readFileSync(DB_PATH, "utf-8");
    store = JSON.parse(raw);
    console.log(`📦 Vector store loaded: ${store.chunks.length} chunks`);
  } else {
    console.warn("⚠️  Vector store not found. Run 'npm run ingest' first.");
    store = { chunks: [] };
  }
  return store;
}

/**
 * Persist the current in-memory store to disk.
 */
export function saveStore() {
  writeFileSync(DB_PATH, JSON.stringify(store), "utf-8");
  console.log(`💾 Vector store saved: ${store.chunks.length} chunks`);
}

/**
 * Insert a chunk with its embedding into the store.
 * @param {{ text: string, source: string, embedding: number[] }} chunk
 */
export function insertChunk(chunk) {
  store.chunks.push({
    text: chunk.text,
    source: chunk.source,
    embedding: chunk.embedding,
  });
}

/**
 * Clear all data from the store (in memory only — call saveStore() to persist).
 */
export function clearStore() {
  store = { chunks: [] };
}

/**
 * Compute cosine similarity between two vectors.
 * @param {number[]} a
 * @param {number[]} b
 * @returns {number} similarity score between -1 and 1
 */
function cosineSimilarity(a, b) {
  let dot = 0;
  let normA = 0;
  let normB = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  const denom = Math.sqrt(normA) * Math.sqrt(normB);
  return denom === 0 ? 0 : dot / denom;
}

/**
 * Search for the most similar chunks to a query embedding.
 * @param {number[]} queryEmbedding - The query's embedding vector
 * @param {number}   [topK=3]       - Number of results to return
 * @returns {{ text: string, source: string, score: number }[]}
 */
export function search(queryEmbedding, topK = 3) {
  if (store.chunks.length === 0) {
    return [];
  }

  const scored = store.chunks.map((chunk) => ({
    text: chunk.text,
    source: chunk.source,
    score: cosineSimilarity(queryEmbedding, chunk.embedding),
  }));

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, topK);
}

/**
 * Get statistics about the current store.
 */
export function getStats() {
  const sources = {};
  for (const chunk of store.chunks) {
    const key = chunk.source.split(" [")[0]; // Group by base source
    sources[key] = (sources[key] || 0) + 1;
  }
  return {
    totalChunks: store.chunks.length,
    sources,
  };
}
