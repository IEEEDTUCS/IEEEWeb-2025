import React, { useState, useEffect, useRef } from "react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
const CHAT_API_URL = `${backendUrl}/api/chat`;

const Chatbot = ({ onClose }) => {
  const initialMessages = [
    { id: 1, text: "Hey! 👋 I'm the IEEE DTU Assistant.", sender: "bot" },
    { id: 2, text: "Ask me anything about IEEE DTU — events, chapters, membership, hackathons, SIGs, and more!", sender: "bot" },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatWindowRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const streamBotResponse = async (userMessage) => {
    setIsTyping(true);
    const botMessageId = Date.now();

    setMessages((prev) => [
      ...prev,
      { id: botMessageId, text: "", sender: "bot" },
    ]);

    try {
      const response = await fetch(CHAT_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }),
      });

      if (response.status === 429) {
        const data = await response.json();
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? { ...msg, text: `⏳ ${data.message || "Too many requests. Please wait a moment."}` }
              : msg
          )
        );
        setIsTyping(false);
        return;
      }

      if (!response.ok) throw new Error(`Server error: ${response.status}`);
      if (!response.body) throw new Error("Streaming not supported");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let botText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;
        botText += decoder.decode(value, { stream: true });
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId ? { ...msg, text: botText } : msg
          )
        );
      }
    } catch (err) {
      console.error("Chat error:", err);
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? { ...msg, text: "Sorry, I'm having trouble connecting right now. Please try again." }
            : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;
    const userMessage = { id: Date.now(), text: input, sender: "user" };
    setMessages((prev) => [...prev, userMessage]);
    streamBotResponse(input);
    setInput("");
    inputRef.current?.focus();
  };

  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{
        width: "22rem",
        height: "520px",
        borderRadius: 20,
        background: "#05070d",
        border: "1px solid rgba(112,166,227,0.22)",
        boxShadow: "0 24px 64px rgba(0,0,0,0.7), 0 0 0 1px rgba(112,166,227,0.08)",
        fontFamily: "inherit",
      }}
    >
      {/* ── Header ── */}
      <div
        style={{
          padding: "14px 16px",
          borderBottom: "1px solid rgba(112,166,227,0.15)",
          background: "linear-gradient(135deg, #0a1424 0%, #0d1829 100%)",
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Avatar */}
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 10,
              fontWeight: 800,
              color: "#fff",
              letterSpacing: "0.05em",
              flexShrink: 0,
              boxShadow: "0 0 12px rgba(37,99,235,0.4)",
            }}
          >
            IEEE
          </div>
          <div>
            <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: "#e2e8f0", lineHeight: 1.3 }}>
              IEEE DTU Assistant
            </p>
            {/* Online indicator */}
            <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 2 }}>
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "inline-block",
                  boxShadow: "0 0 6px rgba(34,197,94,0.7)",
                }}
              />
              <span style={{ fontSize: 10, color: "#70a6e3", fontWeight: 500 }}>Online</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            borderRadius: 8,
            color: "rgba(255,255,255,0.5)",
            width: 28,
            height: 28,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            transition: "all 0.15s",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.1)";
            e.currentTarget.style.color = "#fff";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = "rgba(255,255,255,0.05)";
            e.currentTarget.style.color = "rgba(255,255,255,0.5)";
          }}
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>

      {/* ── Messages ── */}
      <div
        ref={chatWindowRef}
        style={{
          flex: 1,
          overflowY: "auto",
          padding: "14px 12px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
          scrollbarWidth: "none",
        }}
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            style={{
              display: "flex",
              justifyContent: msg.sender === "bot" ? "flex-start" : "flex-end",
            }}
          >
            <div
              style={{
                maxWidth: "82%",
                padding: "9px 13px",
                borderRadius: msg.sender === "bot" ? "4px 16px 16px 16px" : "16px 4px 16px 16px",
                fontSize: 13,
                lineHeight: 1.55,
                ...(msg.sender === "bot"
                  ? {
                      background: "rgba(112,166,227,0.08)",
                      border: "1px solid rgba(112,166,227,0.18)",
                      color: "#cbd5e1",
                    }
                  : {
                      background: "linear-gradient(135deg, #2563eb, #1d4ed8)",
                      color: "#fff",
                      boxShadow: "0 2px 12px rgba(37,99,235,0.3)",
                    }),
              }}
            >
              {msg.text || (
                <span style={{ color: "rgba(203,213,225,0.3)", fontStyle: "italic", fontSize: 12 }}>
                  thinking...
                </span>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                padding: "10px 14px",
                borderRadius: "4px 16px 16px 16px",
                background: "rgba(112,166,227,0.08)",
                border: "1px solid rgba(112,166,227,0.18)",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {[0, 0.18, 0.36].map((delay, i) => (
                <span
                  key={i}
                  style={{
                    width: 6,
                    height: 6,
                    borderRadius: "50%",
                    background: "#70a6e3",
                    display: "inline-block",
                    animation: "ieeeBounceDot 1.2s ease-in-out infinite",
                    animationDelay: `${delay}s`,
                  }}
                />
              ))}
            </div>
          </div>
        )}
        <style>{`
          @keyframes ieeeBounceDot {
            0%, 80%, 100% { transform: translateY(0); opacity: 0.4; }
            40% { transform: translateY(-5px); opacity: 1; }
          }
        `}</style>
      </div>

      {/* ── Input ── */}
      <div
        style={{
          padding: "10px 12px",
          borderTop: "1px solid rgba(112,166,227,0.12)",
          background: "rgba(10,20,36,0.6)",
          flexShrink: 0,
        }}
      >
        <form
          onSubmit={handleSendMessage}
          style={{ display: "flex", alignItems: "center", gap: 8 }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            placeholder="Ask about IEEE DTU..."
            style={{
              flex: 1,
              padding: "9px 14px",
              fontSize: 13,
              borderRadius: 20,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(112,166,227,0.2)",
              color: "#e2e8f0",
              outline: "none",
              transition: "border-color 0.15s",
            }}
            onFocus={(e) => (e.target.style.borderColor = "rgba(112,166,227,0.5)")}
            onBlur={(e) => (e.target.style.borderColor = "rgba(112,166,227,0.2)")}
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            style={{
              flexShrink: 0,
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: input.trim() && !isTyping
                ? "linear-gradient(135deg, #2563eb, #1d4ed8)"
                : "rgba(255,255,255,0.05)",
              border: "1px solid rgba(112,166,227,0.2)",
              color: input.trim() && !isTyping ? "#fff" : "rgba(255,255,255,0.2)",
              cursor: input.trim() && !isTyping ? "pointer" : "not-allowed",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "all 0.15s",
              boxShadow: input.trim() && !isTyping ? "0 2px 10px rgba(37,99,235,0.35)" : "none",
            }}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
        <p style={{ margin: "6px 0 0", fontSize: 10, color: "rgba(112,166,227,0.4)", textAlign: "center" }}>
          Powered by IEEE DTU · AI may make mistakes
        </p>
      </div>
    </div>
  );
};

export default Chatbot;
