import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X, Facebook, Instagram, Twitter } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");
  const sidebarRef = useRef(null);

  const router = useRouter();
  const isHome = router.pathname === "/";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/IEEEDTU/about" },
    { name: "Events", href: "/IEEEDTU/events" },
    { name: "Chapter", href: "/IEEEDTU/Chapters/CS" },
    { name: "Council", href: "/IEEEDTU/council" },
    { name: "Testimonials", href: "/IEEEDTU/testimonials" },
  ];

  const linkStyle =
    "relative block text-lg tracking-wide transition-all duration-300 hover:text-indigo-400 hover:scale-105";
  const activeStyle = "font-semibold text-indigo-400";

  useEffect(() => {
    function handleClickOutside(e) {
      if (mobileOpen && sidebarRef.current && !sidebarRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") setMobileOpen(false);
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <nav
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
          isHome
            ? "bg-transparent border-b border-transparent"
            : "bg-gray-950/80 backdrop-blur-md border-b border-gray-800 shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="IEEE DTU Logo"
              className="h-12 w-auto object-contain drop-shadow-md"
            />
          </Link>

          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg text-sm font-medium text-gray-200 hover:text-white border border-gray-600 hover:border-indigo-400 transition-all"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 shadow transition-all"
            >
              Sign Up
            </Link>

            <button
              onClick={() => setMobileOpen((p) => !p)}
              className="text-white relative z-50"
            >
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        <div
          ref={sidebarRef}
          className={`fixed top-0 right-0 h-full w-72 bg-gray-900/95 text-white px-8 py-8 flex flex-col justify-between border-l border-gray-800 z-50 transform transition-transform duration-300 ${
            mobileOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col gap-7 mt-14">
            {navLinks.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                onClick={() => {
                  setMobileOpen(false);
                  setActive(name.toLowerCase());
                }}
                className={`${linkStyle} ${
                  active === name.toLowerCase() ? activeStyle : "text-gray-300"
                }`}
              >
                {name}
              </Link>
            ))}
          </div>

          <div className="flex justify-center gap-6 pt-8 border-t border-gray-700">
            <a
              href="https://www.facebook.com/ieeedtu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-blue-500 transition-colors"
            >
              <Facebook size={22} />
            </a>
            <a
              href="https://www.instagram.com/ieee.dtu/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-pink-500 transition-colors"
            >
              <Instagram size={22} />
            </a>
            <a
              href="https://twitter.com/dtu_ieee"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-sky-400 transition-colors"
            >
              <Twitter size={22} />
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
