"use client"; // Required for Framer Motion hooks in Next.js

import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Link from "next/link";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// --- YOUR COMPONENTS ---
import Navbar from '../../utils/Navbar'; 
import AboutIEEE from '../About/AboutIEEE'; 

// --- CORRECTED IMPORTS ---
import Chapter from '../About/Chapter/Chapter'; 
import Faculty from '../About/Faculty/Faculty';  

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LandingPage() {
    const targetRef = React.useRef(null);
    
    // --- SCROLL SETUP ---
    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"], 
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 20, 
        damping: 30,    
        mass: 0.8,     
        restDelta: 0.001
    });

    // --- THE NEW NAVBAR LINKS ---
    const eventLinks = [
        { name: "Invictus", href: "https://www.invictusdtu.in/" },
        { name: "Vihaan", href: "https://vihaan.ieeedtu.in/" },
        { name: "Techweek", href: "https://techweek.ieeedtu.in/" },
    ];

    // --- ANIMATION TIMELINE ---
    const maskSize = useTransform(smoothProgress, [0, 0.1, 0.2, 0.35, 0.55], ["20000%", "2000%", "800%", "200%", "30%"]);
    const maskPosition = useTransform(smoothProgress, [0, 0.5, 0.7], ["21% 50%", "21% 50%", "50% 50%"]);
    const videoMaskOpacity = useTransform(smoothProgress, [0.65, 0.75], [1, 0]);
    const textOpacity = useTransform(smoothProgress, [0.65, 0.8], [0, 1]);
    const textY = useTransform(smoothProgress, [0.65, 0.8], [40, 0]);
    const arrowOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);

    // --- SNACKBAR LOGIC ---
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    React.useEffect(() => {
        const hasShownSnackbar = localStorage.getItem("hasShownSnackbar");
        if (!hasShownSnackbar) {
            const timer = setTimeout(() => {
                setOpenSnackbar(true);
                localStorage.setItem("hasShownSnackbar", "true");
            }, 5500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenSnackbar(false);
    };

    return (
        <main className="bg-[#000000] min-h-screen relative">
            
            {/* --- 1. FIXED NAVBAR --- 
                z-[100] keeps it above everything else.
                We pass eventLinks to render Invictus, Vihaan, Techweek.
            */}
            <div className="fixed top-0 left-0 w-full z-[100]">
                <Navbar links={eventLinks} />
            </div>

            {/* --- 2. HERO SECTION WITH VIDEO MASK --- */}
            <div ref={targetRef} className="relative w-full h-[400vh]">
                <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-[#000000]">
                    
                    {/* Scroll Indicator */}
                    <motion.div 
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 text-white flex flex-col items-center pointer-events-none"
                        style={{ opacity: arrowOpacity }} 
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: [0, 10, 0] }}
                            transition={{ opacity: { delay: 1.5, duration: 0.8 }, y: { repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1.5 } }}
                        >
                            <p className="text-xs uppercase tracking-[0.3em] mb-3 opacity-60 font-bold text-center">Scroll</p>
                            <svg className="w-6 h-6 mx-auto opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                        </motion.div>
                    </motion.div>

                    {/* Text Behind Mask */}
                    <motion.div 
                        className="absolute z-10 flex flex-col items-center justify-center text-center px-4 w-full"
                        style={{ opacity: textOpacity, y: textY, top: "40%" }}
                    >
                        <h1 className="text-white text-5xl md:text-7xl lg:text-8xl font-playfair font-bold tracking-tight drop-shadow-2xl">
                            IEEE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">DTU</span>
                        </h1>
                        <h2 className="text-gray-300 text-sm md:text-lg mt-6 font-sans font-light tracking-[0.3em] uppercase opacity-90">
                            A World of Limitless Possibilities
                        </h2>
                    </motion.div>

                    {/* Masked Video */}
                    <motion.div 
                        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none"
                        style={{
                            opacity: videoMaskOpacity, 
                            maskImage: "url('/logo2.svg')",
                            maskPosition: maskPosition, 
                            maskRepeat: "no-repeat",
                            maskSize: maskSize, 
                            WebkitMaskImage: "url('/logo2.svg')",
                            WebkitMaskPosition: maskPosition, 
                            WebkitMaskRepeat: "no-repeat",
                            WebkitMaskSize: maskSize,
                        }}
                    >
                        <video src="https://res.cloudinary.com/dmeyryjzj/video/upload/q_auto/f_auto/v1775135234/ieee_fun_compressed_hq_1_b1jygs.mp4" autoPlay loop muted playsInline className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"></div>
                    </motion.div>

                </div>
            </div>

         {/* --- 3. ALL ABOUT SECTIONS --- */}
            <div className="relative z-30 bg-[#0a0a0a] w-full border-t border-white/10">
                
                {/* About Main Component */}
                <section id="about" className="py-20">
                    <AboutIEEE />
                </section>

                {/* Chapter Component (Updated Tag) */}
                <section id="chapters" className="py-20 bg-[#000000] border-t border-white/5">
                    <Chapter />
                </section>

                {/* Faculty Component */}
                <section id="faculty" className="py-20 bg-[#0a0a0a] border-t border-white/5">
                    <Faculty />
                </section>

            </div>

            {/* --- SNACKBAR --- */}
            <Snackbar open={openSnackbar} autoHideDuration={8000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%', backgroundColor: '#006AFF', color: 'white' }}>
                    Join the community!{"\u00A0"}{"\u00A0"}
                    <Link href="/api/auth/signin" className="border-2 border-white rounded cursor-pointer px-2 py-1 hover:bg-white hover:text-[#006AFF] font-bold uppercase text-sm">
                        Sign in
                    </Link>
                </Alert>
            </Snackbar>

        </main>
    );
}