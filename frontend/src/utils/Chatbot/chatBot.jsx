import React, { useState, useEffect, useRef } from "react";

const Chatbot = ({ onClose }) => {
  const initialMessages = [
    { id: 1, text: "Want to know more about IEEE DTU?", sender: "bot" },
    { id: 2, text: "Just ask our AI Assistant!", sender: "bot" }
  ];

  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const [sessionId] = useState(() => {
    let sid = localStorage.getItem("chat_session_id");
    if (!sid) {
      sid = "user_" + Math.random().toString(36).slice(2, 11);
      localStorage.setItem("chat_session_id", sid);
    }
    return sid;
  });

  const chatWindowRef = useRef(null);

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
      { id: botMessageId, text: "", sender: "bot" }
    ]);

    try {
      const response = await fetch("http://localhost:5001/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          question: userMessage,
          session_id: sessionId
        })
      });

      if (!response.body) throw new Error("No stream");

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      let botText = "";

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        botText += decoder.decode(value, { stream: true });

        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === botMessageId
              ? { ...msg, text: botText }
              : msg
          )
        );
      }
    } catch {
      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === botMessageId
            ? {
                ...msg,
                text:
                  "Sorry, I am having trouble connecting. Please try again later."
              }
            : msg
        )
      );
    } finally {
      setIsTyping(false);
    }
  };


  const handleSendMessage = () => {
    if (!input.trim() || isTyping) return;

    setMessages((prev) => [
      ...prev,
      { id: Date.now(), text: input, sender: "user" }
    ]);

    streamBotResponse(input);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="w-80 h-[500px] md:w-96 md:h-[600px] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden font-sans">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 flex justify-between items-center bg-gradient-to-r from-blue-600 to-blue-700">
        <div className="flex items-center space-x-3">
          <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center text-blue-600 font-bold shadow-md">
            IEEE
          </div>
          <div>
            <h3 className="font-semibold text-white">IEEE DTU Assistant</h3>
            <p className="text-xs text-blue-100">Always here to help</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-blue-100"
          aria-label="Close chat"
        >
          ✕
        </button>
      </div>

      {/* Messages */}
      <div
        ref={chatWindowRef}
        className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === "bot" ? "justify-start" : "justify-end"
            }`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl shadow-sm ${
                msg.sender === "bot"
                  ? "bg-white text-gray-800 rounded-bl-none border"
                  : "bg-blue-600 text-white rounded-br-none"
              }`}
            >
              <p className="text-sm leading-relaxed">{msg.text}</p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="px-4 py-3 rounded-2xl bg-white border shadow-sm">
              <span className="animate-pulse text-sm text-gray-500">
                Typing…
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white">
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            disabled={isTyping}
            placeholder="Ask about IEEE DTU..."
            className="flex-1 px-4 py-3 text-sm bg-gray-50 border rounded-full focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
          <button
            onClick={handleSendMessage}
            disabled={!input.trim() || isTyping}
            className="w-12 h-12 bg-blue-600 text-white rounded-full hover:bg-blue-700 disabled:opacity-50"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;

