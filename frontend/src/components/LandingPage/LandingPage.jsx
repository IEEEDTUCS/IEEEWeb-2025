import * as React from "react";
import { motion, useScroll, useTransform} from "framer-motion";

import Navbar from '../../utils/Navbar';
import StyledButton from "@/components/LandingPage/StyledButton";
import Link from "next/link"; 
//Snackbar Imports
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Signin from '../../utils/signin';
import Drawer from '@mui/material/Drawer';

// --- Alert component for Snackbar styling ---
const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function LandingPage() {
    const { scrollY } = useScroll();
    const opacity = useTransform(scrollY, [0, 400], [1, 0]);
    const y = useTransform(scrollY, [0, 400], [0, -100]);
    const [navbarOpened, setNavbarOpened] = React.useState(false);
   
    const[openSignIn , setOpenSignIn] = React.useState(false);
    // --- State and handlers for Snackbar Added Here ---
    const [openSnackbar, setOpenSnackbar] = React.useState(false);
    React.useEffect(() => {
  const now = Date.now();
  const saved = localStorage.getItem("hasShownSnackbar");

  if (saved) {
    const savedTime = parseInt(saved, 10);
    const twoDays = 2 * 24 * 60 * 60 * 1000; // ms in 2 days
    if (now - savedTime < twoDays) {
      return; // still within 2 days → don't show again
    } else {
      localStorage.removeItem("hasShownSnackbar"); // expired → clear it
    }
  }

  const timer = setTimeout(() => {
    setOpenSnackbar(true);
    localStorage.setItem("hasShownSnackbar", now.toString()); // store timestamp
  }, 5500);

  return () => clearTimeout(timer);
}, []);


    const handleSignInClick = () => {
        setOpenSignIn(true);
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
    }, [navbarOpened]);

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
                        className="text-white text-3xl md:text-6xl lg:text-7xl font-heading font-extrabold mt-1 leading-snug drop-shadow-lg"
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
            
            {/* --- Snackbar Component Added Here --- */}
            <div className="flex flex-row items-center">
            <Snackbar open={openSnackbar} autoHideDuration={8000} onClose={handleSnackbarClose}>
                <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%', alignItems: 'center' }}>
                    
                    <p className="mb-2 sm:inline">Get access to exclusive benefits!{"\u00A0"}{"\u00A0"}</p>
                    <Link
                        href={""}
                        onClick={handleSignInClick} 
                        className="border-2  border-white rounded cursor-pointer px-2 py-1 hover:bg-white hover:text-black"
                    >
                        Sign in
                    </Link>
                    
                </Alert>
            </Snackbar>
            </div>
            {/* --- End of Snackbar component --- */}
            <Drawer
                     anchor="right"
                     open={openSignIn}
                     onClose={() => setOpenSignIn(false)}
                     PaperProps={{
                       sx: {
                         backgroundColor: "#000",
                         width: { xs:"20rem", sm: "22rem", md: "25rem" },
                         
                       }
                     }}
                   >
                     <Signin />
                   </Drawer>
        </div>
    );
}