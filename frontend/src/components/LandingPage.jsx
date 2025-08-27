import React, { useState } from "react";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

import StyledButton from "./LandingPage/StyledButton";

import Chatbot from '../components/ChatBot/chatBot'; // Using your specified import path



export default function LandingPage() {

    const { scrollY } = useScroll();

    const opacity = useTransform(scrollY, [0, 400], [1, 0]);

    const y = useTransform(scrollY, [0, 400], [0, -100]);

    const [isChatOpen, setIsChatOpen] = useState(false);



    const handleScrollDown = () => {

        const aboutSection = document.getElementById("about-section");

        if (aboutSection) {

            aboutSection.scrollIntoView({ behavior: "smooth" });

        }

    };



    return (

        <div className="w-full flex flex-col overflow-x-hidden relative">

            {/* Title */}

            <motion.section

                style={{ opacity, y }}

                className="relative h-screen w-full"

            >

                {/* Background */}

                <motion.div

                    className="absolute inset-0 bg-cover bg-center"

                    style={{ backgroundImage: "url('./images/dtu.png')" }}

                    initial={{ scale: 1.05 }}

                    animate={{ scale: 1 }}

                    transition={{

                        duration: 10,

                        ease: "easeInOut",

                        repeat: Infinity,

                        repeatType: "reverse",

                    }}

                />



                <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />



                <motion.div

                    className="relative container mx-auto flex flex-col items-start justify-center h-full px-6 md:px-12"

                    initial={{ opacity: 0, y: 40 }}

                    animate={{ opacity: 1, y: 0 }}

                    transition={{ duration: 1.2, ease: "easeInOut" }}

                >

                    <motion.h2

                        initial={{ opacity: 0, x: -40 }}

                        animate={{ opacity: 1, x: 0 }}

                        transition={{ duration: 1 }}

                        className="text-indigo-400 text-xl md:text-2xl font-medium tracking-[0.2em] uppercase"

                    >

                        Welcome to

                    </motion.h2>



                    <motion.h1

                        initial={{ opacity: 0, y: 30 }}

                        animate={{ opacity: 1, y: 0 }}

                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}

                        className="text-white text-5xl md:text-6xl lg:text-7xl font-extrabold mt-4 leading-snug drop-shadow-lg"

                    >

                        IEEE DTU Student Branch

                    </motion.h1>



                    <motion.h2

                        initial={{ opacity: 0, y: 30 }}

                        animate={{ opacity: 1, y: 0 }}

                        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}

                        className="text-indigo-300 text-lg md:text-2xl font-medium mt-4"

                    >

                        A World of Limitless Possibilities

                    </motion.h2>



                    {/* Buttons */}

                    <motion.div

                        initial={{ opacity: 0, y: 20 }}

                        animate={{ opacity: 1, y: 0 }}

                        transition={{ duration: 1, delay: 0.6 }}

                        className="flex flex-wrap gap-4 mt-10"

                    >

                        <StyledButton href="#form" variant="primary">

                            Contact Us

                        </StyledButton>

                        <StyledButton onClick={handleScrollDown} variant="secondary">

                            More About Us

                        </StyledButton>

                    </motion.div>

                </motion.div>

            </motion.section>



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

                    className="p-4 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"

                    whileHover={{ scale: 1.1 }}

                    whileTap={{ scale: 0.9 }}

                >

                    <AnimatePresence mode="wait">

                        {isChatOpen ? (

                            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>

                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>

                            </motion.div>

                        ) : (

                            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>

                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>

                            </motion.div>

                        )}

                    </AnimatePresence>

                </motion.button>

            </div>

        </div>

    );

}