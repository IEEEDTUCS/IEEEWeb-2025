import * as React from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

import Navbar from '../../utils/Navbar';
import StyledButton from "@/components/LandingPage/StyledButton";
import Link from "next/link";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

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

    // --- SMOOTH PHYSICS ---
    // This makes the logo zoom feel "heavy" and smooth, removing jitter.
    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 15,
        mass: 0.1,
        restDelta: 0.001
    });

    const [navbarOpened, setNavbarOpened] = React.useState(false);

    // --- ANIMATION CONTROLS ---
    // 0.25 means the animation completes after scrolling 25% of the page height.
    const animationEnd = 0.25; 

    
    // 1. MASK SIZE (The Zoom)
    // Starts at 60% (Logo is big and visible). 
    // Ends at 5000% (Massive, creating a "full transparency" effect by pushing the mask edges off-screen).
    const maskSize = useTransform(smoothProgress, [0, animationEnd], ["80%", "50000%"]);
    
    // 2. TEXT VISIBILITY
    // Text starts fading in when animation is 80% done (animationEnd - 0.05).
    const contentOpacity = useTransform(smoothProgress, [animationEnd - 0.05, animationEnd], [0, 1]);
    
    // 3. TEXT SLIDE
    const contentY = useTransform(smoothProgress, [animationEnd - 0.05, animationEnd], [50, 0]);

    // --- SNACKBAR LOGIC ---
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    React.useEffect(() => {
        const openNavbar = () => setNavbarOpened(true);
        window.addEventListener("wheel", openNavbar, { passive: true });
        window.addEventListener("touchmove", openNavbar, { passive: true });
        
        const hasShownSnackbar = localStorage.getItem("hasShownSnackbar");
        if (!hasShownSnackbar) {
            const timer = setTimeout(() => {
                setOpenSnackbar(true);
                localStorage.setItem("hasShownSnackbar", "true");
            }, 5500);
            return () => clearTimeout(timer);
        }

        return () => {
            window.removeEventListener("wheel", openNavbar);
            window.removeEventListener("touchmove", openNavbar);
        };
    }, []);

    const handleSignInClick = () => setOpenSnackbar(true);
    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') return;
        setOpenSnackbar(false);
    };

    return (
        // TALL CONTAINER for scrolling space
        <div ref={targetRef} className="relative w-full h-[400vh] bg-[#111]">
            
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
                
                {/* Navbar */}
                <div className="z-50 w-full absolute top-0">
                    <Navbar setOpen={navbarOpened} onClose={() => setNavbarOpened(false)} />
                </div>

                {/* --- MASKED VIDEO CONTAINER --- */}
                <motion.div 
                    className="absolute inset-0 z-0 flex items-center justify-center"
                    style={{
                        // REMOVED "y: maskY" so the video stays centered and full height!
                        
                        // CSS Masking
                        maskImage: "url('/logo2.svg')",
                        maskPosition: "21% 50%",
                        maskRepeat: "no-repeat",
                        maskMode: "alpha",
                        maskSize: maskSize, // Applies the smooth zoom
                    
                        // Webkit Masking (Chrome/Safari)
                        WebkitMaskImage: "url('/logo2.svg')",
                        WebkitMaskPosition: "21% 50%",
                        WebkitMaskRepeat: "no-repeat",
                        WebkitMaskMode: "alpha",
                        WebkitMaskSize: maskSize,
                    }}
                >
                    <video 
                        autoPlay 
                        loop 
                        muted 
                        playsInline 
                        className="w-full h-full object-cover"
                    >
                        {/* Ensure this path matches your file exactly */}
                        <source src="/ieeevideo.mp4" type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                </motion.div>

                {/* --- DARK OVERLAY --- */}
                {/* This darkens the video so white text is readable */}
                <motion.div 
                    className="absolute inset-0 bg-black/60 z-10 pointer-events-none"
                    style={{ opacity: contentOpacity }} 
                />

                {/* --- TEXT CONTENT --- */}
                <motion.div
                    className="relative z-20 container mx-auto flex flex-col items-start justify-center h-full px-6 md:px-12 pointer-events-auto"
                    style={{ 
                        opacity: contentOpacity, 
                        y: contentY 
                    }}
                >
                    <h2 className="text-[#70A6E3] text-xl md:text-xl font-heading font-bold tracking-[0.1em] uppercase">
                        Welcome to
                    </h2>

                    <h1 className="text-white text-3xl md:text-6xl lg:text-7xl font-heading font-extrabold mt-1 leading-snug drop-shadow-lg">
                        IEEE DTU Student Branch
                    </h1>

                    <h2 className="text-[#70A6E3] text-xl md:text-2xl tracking-[0.1em] font-heading font-[500] mt-1 mb-8">
                        A World of Limitless Possibilities
                    </h2>

                    <div className="flex flex-wrap gap-4 mt-10">
                        <StyledButton href="/IEEEDTU/about" variant="primary">
                            More About Us
                        </StyledButton>
                        <StyledButton href="/IEEEDTU/council" variant="secondary">
                            Contact Us
                        </StyledButton>
                    </div>

                    <p
                        className="text-white/80 text-sm mt-4 cursor-pointer hover:text-white transition-colors"
                        onClick={handleSignInClick}
                    >
                        Already a member? Sign in here.
                    </p>
                </motion.div>
            </div>

            {/* --- SNACKBAR --- */}
            <Snackbar open={openSnackbar} autoHideDuration={8000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
                    Get access to exclusive benefits!{"\u00A0"}{"\u00A0"}
                    <Link
                        href="/api/auth/signin"
                        className="border-2 border-white rounded cursor-pointer px-2 py-1 hover:bg-white hover:text-black"
                    >
                        Sign in
                    </Link>
                </Alert>
            </Snackbar>
        </div>
    );
}