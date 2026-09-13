import express from "express";
import { handleChat } from "../Controllers/chatController.js";
import { rateLimiter } from "../rag/rateLimiter.js";

const router = express.Router();

// POST /api/chat — rate limited, streaming RAG response
router.post("/chat", rateLimiter, handleChat);

export default router;
