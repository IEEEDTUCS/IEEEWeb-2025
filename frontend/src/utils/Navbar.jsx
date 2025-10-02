import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Signin from './signin'; 
import Drawer from '@mui/material/Drawer';

export default function Navbar({ setOpen, onClose }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const router = useRouter();
  const isHome = router.pathname === "/";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/IEEEDTU/about" },
    { name: "Events", href: "/IEEEDTU/events" },
    { name: "Council", href: "/IEEEDTU/council" },
  ];

  const [openSignIn, setOpenSignIn] = useState(false);
  // Keep body from scrolling when sidebar is open
  useEffect(() => {
    setMenuOpen(setOpen);
  }, [setOpen]);

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (menuOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
        onClose && onClose();
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen, onClose]);

  return (
    <>
      {/* Top Navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 15 }}
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
          isHome
            ? "bg-transparent border-b border-transparent"
            : "bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/images/logo.png"
              alt="IEEE DTU Logo"
              className="h-12 w-auto object-contain"
            />
          </Link>
          {/* Hamburger icon always visible */}
          <button
            onClick={() => setMenuOpen(true)}
            className="text-white"
          >
            <Menu size={28} />
          </button>
        </div>
      </motion.nav>

      {/* Slide-in Sidebar */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 80, damping: 18 }}
            className="fixed top-0 right-0 h-full w-72 bg-black text-white px-6 pt-24 pb-8 space-y-6 border-l border-gray-800 z-50"
            style={{ boxShadow: "0 0 40px 0 rgba(0,0,0,0.4)" }}
          >
            {/* Close Button */}
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute top-6 right-6 text-white"
            >
              <X size={28} />
            </button>

            {/* Navigation Links */}
            {navLinks.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                className="block text-xl tracking-[0.1rem] font-heading hover:text-gray-300 transition-colors"
                onClick={() => setMenuOpen(false)}
              >
                {name}
              </Link>
            ))}

            {/* Divider */}
            <div className="border-t border-gray-800 my-4"></div>

            {/* Sign In Button */}
            <button
              onClick={() => { setMenuOpen(false); setOpenSignIn(true); }}
              className="block w-full text-center py-2 bg-gray-800 rounded-md hover:bg-gray-700 transition-colors font-semibold"
            >
              Sign In
            </button>
          </motion.div>
          
        )}
      </AnimatePresence>
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
    </>
  );
}
