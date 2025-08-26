"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X, Facebook, Instagram, Twitter } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const sidebarRef = useRef(null);
  const router = useRouter();

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/IEEEDTU/about" },
    { name: "Events", href: "/IEEEDTU/events" },
    { name: "Chapter", href: "/IEEEDTU/Chapters/CS" },
    { name: "Council", href: "/IEEEDTU/council" },
    { name: "Testimonials", href: "/IEEEDTU/testimonials" },
  ];

  // Close sidebar on outside click / Esc
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    };
    const onKey = (e) => e.key === "Escape" && setMobileOpen(false);
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  // Prevent scroll when sidebar open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [mobileOpen]);

  // Utility styles
  const linkBase =
    "relative text-lg tracking-wide transition-all duration-300 after:content-[''] after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-indigo-400 after:transition-all after:duration-300 hover:after:w-full";
  const activeStyle = "font-semibold text-white after:w-full";

  return (
    <>
      {/* Overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Top Navbar */}
      <nav className="fixed top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-gray-800 shadow-lg">
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="IEEE DTU Logo"
              className="h-12 w-auto object-contain drop-shadow-md"
            />
          </Link>

          {/* Right Section (Auth Buttons + Hamburger) */}
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-300 hover:text-white border border-gray-600 hover:border-indigo-400 transition-all"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 shadow-md transition-all"
            >
              Sign Up
            </Link>

            {/* Hamburger Toggle */}
            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="text-white relative z-50 focus:outline-none"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {/* Sidebar Menu (Hamburger Drawer) */}
        <div
          ref={sidebarRef}
          className={`fixed top-0 right-0 h-full w-72 
            bg-indigo-950/95 backdrop-blur-xl 
            text-white px-8 py-8 flex flex-col 
            border-l border-indigo-800 shadow-2xl
            z-50 transform transition-transform duration-300 ease-in-out ${
              mobileOpen ? "translate-x-0" : "translate-x-full"
            }`}
        >
          {/* Nav Links */}
          <div className="flex flex-col gap-7 mt-14">
            {navLinks.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                onClick={() => setMobileOpen(false)}
                className={`${linkBase} ${
                  router.pathname === href
                    ? activeStyle
                    : "text-gray-300 hover:text-indigo-300"
                }`}
              >
                {name}
              </Link>
            ))}
          </div>

          {/* Social Icons */}
          <div className="mt-auto flex justify-center gap-6 pt-6 border-t border-indigo-800">
            <a
              href="https://www.facebook.com/ieeedtu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-all hover:scale-110"
            >
              <Facebook size={22} />
            </a>
            <a
              href="https://www.instagram.com/ieee.dtu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition-all hover:scale-110"
            >
              <Instagram size={22} />
            </a>
            <a
              href="https://twitter.com/dtu_ieee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-sky-400 transition-all hover:scale-110"
            >
              <Twitter size={22} />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
