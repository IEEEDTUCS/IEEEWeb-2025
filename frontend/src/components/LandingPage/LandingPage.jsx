"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Drawer from '@mui/material/Drawer';

// --- YOUR COMPONENTS --- 
import AboutIEEE from '@/components/About/aboutIntro/AboutIEEE'
import Chapter from '@/components/About/Chapter/Chapter'
import Faculty from '@/components/About/Faculty/Faculty'
import Signin from '../../utils/signin';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LandingPage() {
    const targetRef = React.useRef(null);
    
    // --- STATE ---
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [openSignIn, setOpenSignIn] = React.useState(false);

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

    // --- ANIMATION TIMELINE ---
    // Smooth zoom out from massive to 20%
    const maskSize = useTransform(smoothProgress, [0, 0.2, 0.4, 0.6], ["40000%", "2000%", "200%", "20%"]);
    
    const maskPosition = useTransform(smoothProgress, [0, 0.2, 0.4, 0.5 ,0.55, 0.6, 0.62], ["55% 50%", "53% 50%", "50% 50%", "50% 50%", "50% 40%", "50% 30%", "50% 20%"]);
    
    const textOpacity = useTransform(smoothProgress, [0.45, 0.6], [0, 1]);
    const textY = useTransform(smoothProgress, [0.45, 0.6], [40, 0]);
    const arrowOpacity = useTransform(smoothProgress, [0, 0.05], [1, 0]);

    // --- COLOR & LOGO TRANSITIONS ---
    const containerBg = useTransform(smoothProgress, [0.45, 0.65], ["#000000", "#000000"]);
    const headingColor = useTransform(smoothProgress, [0.45, 0.65], ["#ffffff", "#ffffff"]); 
    const subHeadingColor = useTransform(smoothProgress, [0.45, 0.65], ["#d1d5db", "#d1d5db"]);
    
    // Fades the video out to reveal the white background inside the mask when it gets small
    const videoOpacity = useTransform(smoothProgress, [0.15, 0.6], [1, 0]);

    // --- SNACKBAR LOGIC ---
    React.useEffect(() => {
        const now = Date.now();
        const saved = localStorage.getItem("hasShownSnackbar");

        if (saved) {
            const savedTime = parseInt(saved, 10);
            const twoDays = 2 * 24 * 60 * 60 * 1000; 
            if (now - savedTime < twoDays) return; 
            localStorage.removeItem("hasShownSnackbar");
        }

        const timer = setTimeout(() => {
            setOpenSnackbar(true);
            localStorage.setItem("hasShownSnackbar", now.toString());
        }, 5500);

        return () => clearTimeout(timer);
    }, []);

    const handleSignInClick = (e) => {
        e.preventDefault(); 
        setOpenSignIn(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenSnackbar(false);
    };

    return (
        <main className="bg-[#000000] min-h-screen relative">

            {/* --- 2. HERO SECTION --- */}
            <div ref={targetRef} className="relative w-full h-[400vh]">
                <motion.div 
                    className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center"
                    style={{ backgroundColor: containerBg }}
                >
                    
                    {/* Scroll Indicator */}
                    <motion.div 
                        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-40 text-white flex flex-col items-center pointer-events-none"
                        style={{ opacity: arrowOpacity }} 
                    >
                        <motion.div
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: [0, 10, 0] }}
                            transition={{ 
                                opacity: { delay: 1.5, duration: 0.8 }, 
                                y: { repeat: Infinity, duration: 2, ease: "easeInOut", delay: 1.5 } 
                            }}
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
                        style={{ opacity: textOpacity, y: textY, top: "45%" }}
                    >
                        <motion.h1 
                            className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold tracking-tight drop-shadow-2xl"
                            style={{ color: headingColor }}
                        >
                            IEEE <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">DTU</span>
                        </motion.h1>
                        <motion.h2 
                            className="text-xl md:text-2xl font-extrabold mt-6 font-[Orbitron] tracking-[0.25em] uppercase opacity-99"
                            style={{ color: subHeadingColor }}
                        >
                            A World of Limitless Possibilities
                        </motion.h2>
                    </motion.div>

                    {/* Masked Video */}
                    <motion.div 
                        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none bg-white"
                        style={{
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
                        <motion.video 
                            src="https://res.cloudinary.com/dmeyryjzj/video/upload/q_auto/f_auto/v1775135234/ieee_fun_compressed_hq_1_b1jygs.mp4" 
                            autoPlay muted loop playsInline 
                            className="w-full h-full object-cover" 
                            style={{ opacity: videoOpacity }} 
                        />
                        <motion.div 
                            className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"
                            style={{ opacity: videoOpacity }} 
                        ></motion.div>
                    </motion.div>
                </motion.div>
            </div>

            {/* --- 3. SECTIONS --- */}
            <div className="relative z-30 bg-[#0a0a0a] w-full border-t border-white/10">
                <section id="about" className="py-20 bg-white">
                    <AboutIEEE />
                </section>

                <section id="chapters" className="py-20 bg-[#ffffff] border-t border-white/5">
                    <Chapter />
                </section>

                <section id="faculty" className="py-20 bg-[#ffffff] border-t border-white/5">
                    <Faculty />
                </section>
            </div>

            {/* --- Snackbar --- */}
            <Snackbar open={openSnackbar} autoHideDuration={8000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%', alignItems: 'center' }}>
                    <span className="mr-4">Get access to exclusive benefits!</span>
                    <button
                        onClick={handleSignInClick} 
                        className="border-2 border-white rounded cursor-pointer px-2 py-1 text-sm transition-colors hover:bg-white hover:text-black"
                    >
                        Sign in
                    </button>
                </Alert>
            </Snackbar>

            {/* --- Sign In Drawer --- */}
            <Drawer
                anchor="right"
                open={openSignIn}
                onClose={() => setOpenSignIn(false)}
                PaperProps={{
                    sx: {
                        backgroundColor: "#000",
                        width: { xs: "100%", sm: "22rem", md: "25rem" },
                    }
                }}
            >
                <Signin />
            </Drawer>
        </main>
    );
}