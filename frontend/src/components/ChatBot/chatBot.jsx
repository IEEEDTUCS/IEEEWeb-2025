import React, { useState, useEffect, useRef } from 'react';


const Chatbot = ({ onClose }) => {
    const initialMessages = [
        { id: 1, text: 'Welcome to IEEE DTU', sender: 'bot' },
        { id: 2, text: 'Coming Soon', sender: 'bot' },
    ];

    const [messages, setMessages] = useState(initialMessages);
    const [input, setInput] = useState('');
    const [isTyping, setIsTyping] = useState(false);
    const chatWindowRef = useRef(null);

    useEffect(() => {
        if (chatWindowRef.current) {
            chatWindowRef.current.scrollTop = chatWindowRef.current.scrollHeight;
        }
    }, [messages, isTyping]);

    const getTestResponse = (userMessage) => {
        setIsTyping(true);
        setTimeout(() => {
            const lowerCaseMessage = userMessage.toLowerCase();
            let botText = "I'm not sure how to answer that. Can you ask something else?";

            if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
                botText = 'Hello there! How can I assist you today?';
            } else if (lowerCaseMessage.includes('events')) {
                botText = 'We have a workshop on Machine Learning next week. Are you interested in joining?';
            } else if (lowerCaseMessage.includes('contact')) {
                botText = 'You can reach out to us at ieee.dtu@dce.edu.';
            } else if (lowerCaseMessage.includes('bye')) {
                botText = 'Goodbye! Have a great day.';
            }

            const botMessage = { id: Date.now(), text: botText, sender: 'bot' };
            setMessages(prev => [...prev, botMessage]);
            setIsTyping(false);
        }, 1000);
    };

    const handleSendMessage = (e) => {
        e.preventDefault();
        if (input.trim() === '') return;
        const userMessage = { id: Date.now(), text: input, sender: 'user' };
        setMessages(prev => [...prev, userMessage]);
        getTestResponse(input);
        setInput('');
    };

    return (
        <div className="w-96 h-[600px] flex flex-col bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden font-sans">
            <div className="p-4 border-b border-gray-200 flex justify-between items-center flex-shrink-0">
                <div className="flex items-center space-x-3">
                    <img
                        src="/images/logo.png" alt="IEEE DTU Logo"
                        className="h-10 w-auto object-contain"
                        onError={(e) => { e.target.onerror = null; e.target.src='https://placehold.co/40x40/cccccc/FFFFFF?text=Error'; }}
                    />
                </div>
            </div>
            <div ref={chatWindowRef} className="flex-1 p-6 space-y-4 overflow-y-auto bg-gray-50">
                {messages.map(msg => (
                    <div key={msg.id} className={`flex ${msg.sender === 'bot' ? 'justify-start' : 'justify-end'}`}>
                        <div className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${msg.sender === 'bot' ? 'bg-blue-600 text-white rounded-bl-none' : 'bg-white text-gray-800 border border-gray-200 rounded-br-none'}`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {isTyping && (
                    <div className="flex justify-start">
                        <div className="px-4 py-2 rounded-2xl bg-gray-200 rounded-bl-none">
                            <div className="flex items-center space-x-1">
                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0s'}}></span>
                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                                <span className="w-2 h-2 bg-gray-500 rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></span>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4 border-t border-gray-200 bg-white flex-shrink-0">
                <form onSubmit={handleSendMessage} className="flex items-center space-x-3">
                    <input type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder="What do you want to know?" className="flex-1 w-full px-4 py-2 text-sm bg-white border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                    <button type="submit" className="flex-shrink-0 w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50" disabled={!input.trim()}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Chatbot;
