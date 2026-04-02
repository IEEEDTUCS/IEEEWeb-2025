"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import Signin from './signin'; 
import Drawer from '@mui/material/Drawer';

export default function Navbar({ setOpen, onClose }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [expandedFest, setExpandedFest] = useState(null); 
  const menuRef = useRef(null);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/IEEEDTU/about" },
    { name: "Events", href: "/IEEEDTU/events" },
    { name: "Council", href: "/IEEEDTU/council" },
  ];

  const festData = [
    {
      name: "Invictus",
      years: [
        { label: "Invictus '26", href: "https://www.invictusdtu.in/" },
        { label: "Invictus '25", href: "#" },
        { label: "Invictus '24", href: "#" },
        { label: "Invictus '23", href: "#" },
      ]
    },
    {
      name: "Vihaan",
      years: [
        { label: "Vihaan 009", href: "https://vihaan.ieeedtu.in/" },
        { label: "Vihaan 008", href: "#" },
        { label: "Vihaan 007", href: "#" },
        { label: "Vihaan 006", href: "#" },
      ]
    },
    {
      name: "Techweek",
      years: [
        { label: "Techweek '26", href: "https://techweek.ieeedtu.in/" },
        { label: "Techweek '25", href: "#" },
        { label: "Techweek '24", href: "#" },
        { label: "Techweek '23", href: "#" },
      ]
    }
  ];

  const [openSignIn, setOpenSignIn] = useState(false);

  const toggleFest = (name) => {
    setExpandedFest(expandedFest === name ? null : name);
  };

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className={`fixed top-0 z-50 w-full transition-all duration-500 ease-in-out ${
          isScrolled 
            ? "backdrop-blur-xl bg-black/70 border-b border-white/10 shadow-2xl py-0" 
            : "bg-transparent border-transparent py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="group">
            <img
              src="/images/logo.png"
              alt="IEEE DTU Logo"
              className={`h-12 w-auto object-contain transition-all duration-300 ${isScrolled ? "scale-90 opacity-100" : "scale-105 opacity-90 group-hover:opacity-100"}`}
            />
          </Link>
          
          <button
            onClick={() => setMenuOpen(true)}
            className="p-2 text-white hover:bg-white/10 rounded-full transition-all active:scale-90"
          >
            <Menu size={30} strokeWidth={1.5} /> {/* Made icon slightly thinner */}
          </button>
        </div>
      </motion.nav>

      {/* Sidebar Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <>
            {/* Dark Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />

            {/* Sidebar Content */}
            <motion.div
              ref={menuRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-full max-w-[320px] bg-[#050505] text-white z-[70] flex flex-col border-l border-white/10"
            >
              {/* Header */}
              <div className="p-6 flex justify-end">
                <button onClick={() => setMenuOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors">
                  <X size={26} strokeWidth={1.5} />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto px-8 py-4 custom-scrollbar">
                {/* Main Links */}
                <div className="space-y-6 mb-10">
                    {navLinks.map(({ name, href }) => (
                      <Link
                        key={name}
                        href={href}
                        // THINNER FONT HERE: text-lg, font-light, tracking-wide
                        className="block text-lg font-light tracking-wide hover:text-blue-400 transition-colors"
                        onClick={() => setMenuOpen(false)}
                      >
                        {name}
                      </Link>
                    ))}
                </div>

                <div className="h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent my-8" />

                {/* Fests with Accordion */}
                <div>
                    <p className="text-xs text-gray-500 uppercase tracking-widest font-medium mb-6">
                        Flagship Events
                    </p>
                    <div className="space-y-4">
                        {festData.map((fest) => (
                            <div key={fest.name} className="space-y-2">
                                <button
                                    onClick={() => toggleFest(fest.name)}
                                    // THINNER FONT HERE: text-base, font-light, tracking-wide
                                    className="w-full flex items-center justify-between text-base font-light tracking-wide hover:text-blue-400 transition-colors group"
                                >
                                    <span className={expandedFest === fest.name ? "text-blue-400" : ""}>{fest.name}</span>
                                    <ChevronDown 
                                      size={18} 
                                      strokeWidth={1.5}
                                      className={`transition-transform duration-300 ${expandedFest === fest.name ? "rotate-180 text-blue-400" : "opacity-50"}`} 
                                    />
                                </button>
                                
                                <AnimatePresence>
                                    {expandedFest === fest.name && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: "auto", opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden border-l border-white/10 ml-2"
                                        >
                                            {fest.years.map((year) => (
                                                <a
                                                    key={year.label}
                                                    href={year.href}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="block py-2 pl-4 text-sm font-light text-gray-400 hover:text-white hover:bg-white/5 transition-all"
                                                >
                                                    {year.label}
                                                </a>
                                            ))}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ))}
                    </div>
                </div>
              </div>

              {/* Footer / Sign In */}
              <div className="p-8 border-t border-white/5">
                <button
                  onClick={() => { setMenuOpen(false); setOpenSignIn(true); }}
                  // REDUCED CHUNKINESS: py-3 instead of py-4, font-semibold instead of font-bold
                  className="w-full py-3 bg-white text-black rounded-xl font-semibold tracking-wide hover:bg-gray-200 transition-all active:scale-95 shadow-xl"
                >
                  Sign In
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <Drawer
        anchor="right"
        open={openSignIn}
        onClose={() => setOpenSignIn(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#000",
            width: { xs: "100%", sm: "22rem", md: "25rem" },
            borderLeft: "1px solid rgba(255,255,255,0.1)"
          }
        }}
      >
        <Signin />
      </Drawer>
    </>
  );
}