import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Chatbot from './Chatbot';

const ChatbotHelper = () => {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4">
            <AnimatePresence>
                {isChatOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                    >
                        <Chatbot onClose={() => setIsChatOpen(false)} />
                    </motion.div>
                )}
            </AnimatePresence>

            <motion.button
                onClick={() => setIsChatOpen(!isChatOpen)}
                className="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                aria-label={isChatOpen ? "Close chat" : "Open chat"}
            >
                <AnimatePresence mode="wait">
                    {isChatOpen ? (
                        <motion.div 
                            key="close" 
                            initial={{ rotate: -90, opacity: 0 }} 
                            animate={{ rotate: 0, opacity: 1 }} 
                            exit={{ rotate: 90, opacity: 0 }} 
                            transition={{ duration: 0.2 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </motion.div>
                    ) : (
                        <motion.div 
                            key="chat" 
                            initial={{ rotate: 90, opacity: 0 }} 
                            animate={{ rotate: 0, opacity: 1 }} 
                            exit={{ rotate: -90, opacity: 0 }} 
                            transition={{ duration: 0.2 }}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.button>
        </div>
    );
};

export default ChatbotHelper;
