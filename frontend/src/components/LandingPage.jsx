import * as React from "react";
import {AnimatePresence, motion, useScroll, useTransform} from "framer-motion";
import Navbar from '../utils/Navbar';
import StyledButton from "./LandingPage/StyledButton";
import Chatbot from '../components/ChatBot/chatBot';
//Snackbar Imports
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

// --- Alert component for Snackbar styling ---
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LandingPage() {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const y = useTransform(scrollY, [0, 400], [0, -100]);
    const [navbarOpened, setNavbarOpened] = React.useState(false);
    const [isChatOpen, setIsChatOpen] = React.useState(false);
    // --- State and handlers for Snackbar Added Here ---
    const [openSnackbar, setOpenSnackbar] = React.useState(false);

    const handleSignInClick = () => {
        setOpenSnackbar(true);
    };

    const handleSnackbarClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };
    // --- End of Snackbar state and handlers ---


    React.useEffect(() => {
        const openNavbar = () => {
            setNavbarOpened(true); // open on every scroll gesture

        };

        window.addEventListener("wheel", openNavbar, { passive: true });
        window.addEventListener("touchmove", openNavbar, { passive: true });

        return () => {
            window.removeEventListener("wheel", openNavbar);
            window.removeEventListener("touchmove", openNavbar);
        };
    }, []); // no navbarOpened dependency — keeps listener stable

    return (
        <div className="w-full h-screen flex flex-col overflow-hidden snap-y snap-mandatory">
            <Navbar setOpen={navbarOpened} onClose={() => setNavbarOpened(false)} />

            {/* Title */}
            <motion.section
                style={{ opacity, y }}
                className="relative h-screen w-full"
            >
                {/* Background  */}
                <motion.div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{
                        backgroundImage: "url('./images/IEEE-Family.jpg')",
                        filter: "blur(1px)"
                    }}
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
                        className="text-[#70A6E3] text-xl md:text-xl font-heading font-bold tracking-[0.1em] uppercase"
                    >
                        Welcome to
                    </motion.h2>

                    <motion.h1
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
                        className="text-white text-5xl md:text-6xl lg:text-7xl font-heading font-extrabold mt-1 leading-snug drop-shadow-lg"
                    >
                        IEEE DTU Student Branch
                    </motion.h1>

                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
                        className="text-[#70A6E3] text-xl md:text-2xl tracking-[0.1em] font-heading font-[500] mt-1 mb-8"
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
                        <StyledButton href="/IEEEDTU/about" variant="primary" >
                            More About Us
                        </StyledButton>
                        <StyledButton href="/IEEEDTU/council" variant="secondary">
                            Contact Us
                        </StyledButton>
                    </motion.div>
                    {/* --- Clickable text to trigger Snackbar Added Here --- */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.8 }}
                        className="text-white/80 text-sm mt-4 cursor-pointer hover:text-white transition-colors"
                        onClick={handleSignInClick}
                    >
                        Already a member? Sign in here.
                    </motion.p>
                    {/* --- End of clickable text --- */}
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
            {/* --- Snackbar Component Added Here --- */}
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="info" sx={{ width: '100%' }}>
                    This feature is coming soon!
                </Alert>
            </Snackbar>
            {/* --- End of Snackbar component --- */}
        </div>
    );
}
