/**
 * Split text into contextual chunks with overlap.
 * Chunks are split on sentence boundaries to preserve meaning.
 *
 * @param {string} text        Raw text to chunk
 * @param {string} source      Source identifier (e.g. "PDF: Echo.pdf")
 * @param {object} [options]
 * @param {number} [options.chunkSize=500]  Target chunk size in words
 * @param {number} [options.overlap=50]     Overlap in words between chunks
 * @returns {{ text: string, source: string }[]}
 */
export function chunkText(text, source, options = {}) {
  const { chunkSize = 500, overlap = 50 } = options;

  // Clean up the text
  const cleaned = text
    .replace(/\r\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\s+/g, " ")
    .trim();

  if (!cleaned) return [];

  // Split into sentences — handles abbreviations, decimals somewhat gracefully
  const sentences = cleaned.match(/[^.!?\n]+(?:[.!?\n]+|$)/g) || [cleaned];

  const chunks = [];
  let currentSentences = [];
  let currentWordCount = 0;

  for (const sentence of sentences) {
    const trimmed = sentence.trim();
    if (!trimmed) continue;

    const wordCount = trimmed.split(/\s+/).length;

    // If adding this sentence would exceed the chunk size, flush
    if (currentWordCount + wordCount > chunkSize && currentSentences.length > 0) {
      chunks.push({
        text: currentSentences.join(" ").trim(),
        source,
      });

      // Build overlap from the tail of current chunk
      const overlapSentences = [];
      let overlapWordCount = 0;
      for (let i = currentSentences.length - 1; i >= 0; i--) {
        const sWords = currentSentences[i].split(/\s+/).length;
        if (overlapWordCount + sWords > overlap) break;
        overlapSentences.unshift(currentSentences[i]);
        overlapWordCount += sWords;
      }

      currentSentences = overlapSentences;
      currentWordCount = overlapWordCount;
    }

    currentSentences.push(trimmed);
    currentWordCount += wordCount;
  }

  // Flush remaining
  if (currentSentences.length > 0) {
    const remaining = currentSentences.join(" ").trim();
    if (remaining.split(/\s+/).length > 10) {
      // Only keep if it has meaningful content
      chunks.push({ text: remaining, source });
    } else if (chunks.length > 0) {
      // Append tiny remainder to last chunk
      chunks[chunks.length - 1].text += " " + remaining;
    } else {
      chunks.push({ text: remaining, source });
    }
  }

  return chunks;
}

/**
 * Chunk pre-structured records (like ieee.json entries) into embedding-ready chunks.
 * Each record becomes its own chunk since they're already contextually coherent.
 *
 * @param {{ id: string, text: string, metadata?: object }[]} records
 * @param {string} source
 * @returns {{ text: string, source: string }[]}
 */
export function chunkRecords(records, source) {
  return records
    .filter((r) => r.text && r.text.trim().length > 10)
    .map((record) => ({
      text: record.text.trim(),
      source: `${source} [${record.id || "unknown"}]`,
    }));
}
