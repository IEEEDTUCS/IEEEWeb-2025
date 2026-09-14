import React, { useState, useEffect, useRef } from "react";

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:4000";
const CHAT_API_URL = `${backendUrl}/api/chat`;

const Chatbot = ({ onClose }) => {
  const initialMessages = [
    { id: 1, text: "Hey there! 👋", sender: "bot" },
    { id: 2, text: "I'm the IEEE DTU Assistant. Ask me anything about IEEE DTU — events, chapters, hackathons, and more!", sender: "bot" },
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const chatWindowRef = useRef(null);

  useEffect(() => {
    if (chatWindowRef.current) {
      chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const streamBotResponse = async (userMessage) => {
    setIsTyping(true);
    const botMessageId = Date.now();

    // Add an empty bot message placeholder
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

      // Handle rate limiting
      if (response.status === 429) {
        const data = await response.json();
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? { ...msg, text: `⏳ ${data.message || "Too many requests. Please wait a moment and try again."}` }
              : msg
          )
        );
        return;
      }

      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("Streaming not supported");
      }

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
      // Update the existing placeholder — don't add a new message
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? { ...msg, text: "Sorry, I'm having trouble connecting right now. Please try again later." }
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
  };

  return (
    <div className="w-80 h-[500px] md:w-96 md:h-[600px] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden font-sans">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-700 flex-shrink-0">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold text-xs shadow-md">
            IEEE
          </div>
          <div>
            <h3 className="font-semibold text-white">IEEE DTU Assistant</h3>
            <p className="text-xs text-blue-100">Always here to help</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-blue-100 transition-colors"
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div
        ref={chatWindowRef}
        className="flex-1 p-4 space-y-3 overflow-y-auto bg-gray-50"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.sender === "bot" ? "justify-start" : "justify-end"}`}
          >
            <div
              className={`max-w-[80%] px-4 py-2.5 rounded-2xl shadow-sm text-sm leading-relaxed ${
                msg.sender === "bot"
                  ? "bg-white text-gray-800 rounded-bl-none border border-gray-200"
                  : "bg-blue-600 text-white rounded-br-none"
              }`}
            >
              {msg.text || (
                <span className="text-gray-300 italic text-xs">thinking...</span>
              )}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="px-4 py-2.5 rounded-2xl bg-white border border-gray-200 shadow-sm rounded-bl-none">
              <div className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0s" }} />
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.15s" }} />
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0.3s" }} />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
        <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isTyping}
            placeholder="Ask about IEEE DTU..."
            className="flex-1 px-4 py-2.5 text-sm bg-gray-50 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 transition-all"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default Chatbot;
