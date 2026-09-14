"use client";

import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Drawer from '@mui/material/Drawer';

import AboutIEEE from '@/components/About/aboutIntro/AboutIEEE';
import Chapter from '@/components/About/Chapter/Chapter';
import Faculty from '@/components/About/Faculty/Faculty';
import Echoes from '@/components/About/Echoes/Echoes';
import Signin from '../../utils/signin';
import { JoinBanner, JoinModal } from './JoinModal';
import SmoothScroll from '@/components/Common/SmoothScroll';

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

// Scroll-driven depth, scale, and collapse section matching the hero zoom aesthetic
function ScrollZoomSection({ children, id, className = "" }) {
    const sectionRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"],
    });

    const smoothSectionProgress = useSpring(scrollYProgress, {
        stiffness: 42,
        damping: 24,
        mass: 0.65,
        restDelta: 0.0005
    });

    // Entrance: 0 to 0.22 (zooms in from 0.85 -> 1.0, floats up from 70px -> 0, fades from 0.25 -> 1.0)
    // Active/Focal stay: 0.22 to 0.78 (scale: 1.0, y: 0, opacity: 1.0)
    // Collapse/Exit: 0.78 to 1.0 (collapses/zooms out from 1.0 -> 0.84, glides up 0 -> -70px, fades from 1.0 -> 0.25)
    const scale = useTransform(smoothSectionProgress, [0, 0.22, 0.78, 1], [0.85, 1, 1, 0.84]);
    const opacity = useTransform(smoothSectionProgress, [0, 0.18, 0.82, 1], [0.25, 1, 1, 0.25]);
    const y = useTransform(smoothSectionProgress, [0, 0.22, 0.78, 1], [70, 0, 0, -70]);
    const rotateX = useTransform(smoothSectionProgress, [0, 0.22, 0.78, 1], [2.5, 0, 0, -2.5]);
    const filter = useTransform(
        smoothSectionProgress,
        [0, 0.18, 0.82, 1],
        ["blur(4px)", "blur(0px)", "blur(0px)", "blur(4px)"]
    );

    return (
        <motion.section
            id={id}
            ref={sectionRef}
            style={{
                scale,
                opacity,
                y,
                rotateX,
                filter,
                transformOrigin: "center center",
                willChange: "transform, opacity, filter",
            }}
            className={`relative w-full ${className}`}
        >
            {children}
        </motion.section>
    );
}

export default function LandingPage() {
    const targetRef = React.useRef(null);

    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    const [openSignIn, setOpenSignIn]     = React.useState(false);
    const [showBanner, setShowBanner]     = React.useState(false);
    const [showModal, setShowModal]       = React.useState(false);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"],
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 22,
        damping: 28,
        mass: 0.75,
        restDelta: 0.001
    });

    const maskSize        = useTransform(smoothProgress, [0, 0.15, 0.35, 0.6], ["40000%", "3000%", "300%", "20%"]);
    const maskPosition    = useTransform(smoothProgress, [0, 0.2, 0.4, 0.5, 0.55, 0.6, 0.62], ["55% 50%", "53% 50%", "50% 50%", "50% 50%", "50% 40%", "50% 30%", "50% 20%"]);
    const textOpacity     = useTransform(smoothProgress, [0.45, 0.65], [0, 1]);
    const textY           = useTransform(smoothProgress, [0.45, 0.65], [40, 0]);
    const arrowOpacity    = useTransform(smoothProgress, [0, 0.05], [1, 0]);
    const containerBg     = useTransform(smoothProgress, [0.45, 0.65], ["#000000", "#000000"]);
    const headingColor    = useTransform(smoothProgress, [0.45, 0.65], ["#ffffff", "#ffffff"]);
    const subHeadingColor = useTransform(smoothProgress, [0.45, 0.65], ["#d1d5db", "#d1d5db"]);
    const videoOpacity    = useTransform(smoothProgress, [0.15, 0.6], [1, 0]);
    const bridgeOpacity   = useTransform(smoothProgress, [0.55, 0.78], [0, 1]);

    // Hero exit collapse on moving down away from it towards About section
    const heroScale       = useTransform(smoothProgress, [0.65, 0.95], [1, 0.85]);
    const heroOpacity     = useTransform(smoothProgress, [0.72, 0.98], [1, 0.25]);
    const heroY           = useTransform(smoothProgress, [0.65, 0.95], [0, -60]);

    // Show pill banner after 2.5s, once per session
    React.useEffect(() => {
        if (sessionStorage.getItem("joinBannerDismissed")) return;
        const t = setTimeout(() => setShowBanner(true), 2500);
        return () => clearTimeout(t);
    }, []);

    // Snackbar logic
    React.useEffect(() => {
        const now = Date.now();
        const saved = localStorage.getItem("hasShownSnackbar");
        if (saved) {
            const savedTime = parseInt(saved, 10);
            if (now - savedTime < 2 * 24 * 60 * 60 * 1000) return;
            localStorage.removeItem("hasShownSnackbar");
        }
        const timer = setTimeout(() => {
            setOpenSnackbar(true);
            localStorage.setItem("hasShownSnackbar", now.toString());
        }, 5500);
        return () => clearTimeout(timer);
    }, []);

    const handleSignInClick   = (e) => { e.preventDefault(); setOpenSignIn(true); };
    const handleSnackbarClose = (_, reason) => { if (reason === 'clickaway') return; setOpenSnackbar(false); };
    const handleBannerDismiss = () => { setShowBanner(false); sessionStorage.setItem("joinBannerDismissed", "1"); };

    return (
        <SmoothScroll>
            <main className="bg-[#000000] min-h-screen relative text-white selection:bg-blue-600 selection:text-white">
                {/* Global ambient background lighting for depth */}
                <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
                    <div className="absolute top-[25%] left-[-15%] w-[600px] h-[600px] rounded-full bg-blue-600/[0.07] blur-[160px]" />
                    <div className="absolute top-[55%] right-[-15%] w-[600px] h-[600px] rounded-full bg-blue-600/[0.07] blur-[170px]" />
                    <div className="absolute top-[80%] left-[10%] w-[550px] h-[550px] rounded-full bg-sky-600/[0.06] blur-[150px]" />
                </div>

                {/* Pill banner */}
                {showBanner && (
                    <JoinBanner
                        onOpen={() => { setShowBanner(false); setShowModal(true); }}
                        onDismiss={handleBannerDismiss}
                    />
                )}

                {/* Full modal */}
                <JoinModal open={showModal} onClose={() => setShowModal(false)} />

                {/* Hero */}
                <div ref={targetRef} className="relative w-full h-[400vh]">
                    <motion.div
                        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center"
                        style={{ backgroundColor: containerBg }}
                    >
                        {/* Collapsing Hero Stage as you scroll down away from it */}
                        <motion.div
                            className="relative w-full h-full flex items-center justify-center"
                            style={{ scale: heroScale, opacity: heroOpacity, y: heroY, transformOrigin: "center center" }}
                        >
                            {/* Scroll indicator */}
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

                            {/* Text */}
                            <motion.div
                                className="absolute z-10 flex flex-col items-center justify-center text-center px-4 w-full"
                                style={{ opacity: textOpacity, y: textY, top: "45%" }}
                            >
                                <motion.h1
                                    className="text-5xl md:text-7xl lg:text-8xl font-playfair font-bold tracking-tight drop-shadow-2xl"
                                    style={{ color: headingColor }}
                                >
                                    IEEE <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-blue-600">DTU</span>
                                </motion.h1>
                                <motion.h2
                                    className="text-xl md:text-2xl font-extrabold mt-6 font-[Orbitron] tracking-[0.25em] uppercase opacity-99"
                                    style={{ color: subHeadingColor }}
                                >
                                    A World of Limitless Possibilities
                                </motion.h2>
                            </motion.div>

                            {/* Masked video */}
                            <motion.div
                                className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none bg-white"
                                style={{
                                    maskImage: "url('/logo2.svg')",
                                    maskPosition,
                                    maskRepeat: "no-repeat",
                                    maskSize,
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
                                />
                            </motion.div>
                        </motion.div>

                        {/* Bottom bridge */}
                        <motion.div
                            className="absolute bottom-0 left-0 right-0 h-32 z-30 pointer-events-none"
                            style={{
                                background: "linear-gradient(to bottom, transparent, #000000)",
                                opacity: bridgeOpacity,
                            }}
                        />
                    </motion.div>
                </div>

                {/* Sections with continuous scroll-depth zoom and collapse */}
                <div className="relative z-30 w-full bg-black [perspective:1200px]">
                    <ScrollZoomSection id="about" className="bg-black">
                        <AboutIEEE />
                    </ScrollZoomSection>

                    <div className="h-[1px] w-full max-w-7xl mx-auto bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

                    <ScrollZoomSection id="chapters" className="bg-black py-8">
                        <Chapter />
                    </ScrollZoomSection>

                    <div className="h-[1px] w-full max-w-7xl mx-auto bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

                    <ScrollZoomSection id="faculty" className="bg-black py-8">
                        <Faculty />
                    </ScrollZoomSection>

                    <div className="h-[1px] w-full max-w-7xl mx-auto bg-gradient-to-r from-transparent via-zinc-800 to-transparent" />

                    <ScrollZoomSection id="echoes" className="bg-black py-8">
                        <Echoes />
                    </ScrollZoomSection>
                </div>

                {/* Themed Notification Snackbar */}
                <Snackbar
                    open={openSnackbar}
                    autoHideDuration={8000}
                    onClose={handleSnackbarClose}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                >
                    <div className="flex items-center gap-4 px-5 py-3.5 rounded-2xl bg-zinc-950/95 border border-blue-500/40 text-white shadow-[0_10px_35px_rgba(0,0,0,0.8),0_0_25px_rgba(37,99,235,0.3)] backdrop-blur-xl">
                        <div className="flex items-center gap-2.5">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
                            </span>
                            <span className="text-sm font-medium text-zinc-200">Get access to exclusive IEEE benefits!</span>
                        </div>
                        <button
                            onClick={handleSignInClick}
                            className="px-3.5 py-1.5 rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-xs font-bold text-white shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all cursor-pointer"
                        >
                            Sign in
                        </button>
                        <button
                            onClick={handleSnackbarClose}
                            className="text-zinc-400 hover:text-white transition-colors cursor-pointer text-xs ml-1 p-1"
                            aria-label="Close notification"
                        >
                            ✕
                        </button>
                    </div>
                </Snackbar>

                {/* Sign In Drawer */}
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
        </SmoothScroll>
    );
}
