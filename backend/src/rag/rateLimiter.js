/**
 * In-memory sliding window rate limiter.
 * No external dependencies — works with a simple Map.
 *
 * Config: 5 requests per 60-second sliding window, keyed by client IP.
 */

const windows = new Map();
const WINDOW_MS = 60 * 1000; // 1 minute
const MAX_REQUESTS = 5;

// Garbage-collect expired entries every 5 minutes
setInterval(() => {
  const now = Date.now();
  for (const [ip, timestamps] of windows) {
    const valid = timestamps.filter((t) => now - t < WINDOW_MS);
    if (valid.length === 0) {
      windows.delete(ip);
    } else {
      windows.set(ip, valid);
    }
  }
}, 5 * 60 * 1000).unref(); // .unref() so this timer doesn't prevent process exit

/**
 * Express middleware — rate limits by client IP.
 * Returns 429 if the limit is exceeded.
 */
export function rateLimiter(req, res, next) {
  const ip =
    req.headers["x-forwarded-for"]?.split(",")[0]?.trim() ||
    req.ip ||
    "unknown";

  const now = Date.now();

  // Get existing timestamps for this IP, filter to current window
  let timestamps = windows.get(ip) || [];
  timestamps = timestamps.filter((t) => now - t < WINDOW_MS);

  if (timestamps.length >= MAX_REQUESTS) {
    const oldestInWindow = timestamps[0];
    const retryAfterMs = oldestInWindow + WINDOW_MS - now;
    const retryAfterSec = Math.ceil(retryAfterMs / 1000);

    res.setHeader("Retry-After", retryAfterSec);
    return res.status(429).json({
      success: false,
      message: `Rate limit exceeded. Please try again in ${retryAfterSec} seconds.`,
      retryAfter: retryAfterSec,
    });
  }

  timestamps.push(now);
  windows.set(ip, timestamps);
  next();
}
