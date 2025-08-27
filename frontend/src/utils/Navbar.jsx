import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState("");
  const mobileMenuRef = useRef(null);

  const router = useRouter();
  const isHome = router.pathname === "/";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/IEEEDTU/about" },
    { name: "Events", href: "/IEEEDTU/events" },
    { name: "Council", href: "/IEEEDTU/council" },
  ];

  useEffect(() => {
    function handleClickOutside(e) {
      if (
        mobileOpen &&
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(e.target)
      ) {
        setMobileOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") {
        setMobileOpen(false);
      }
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
          className="fixed inset-0 bg-black/50 backdrop-blur-[1px] z-40"
          aria-hidden="true"
        />
      )}

      <nav
        className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
          isHome
            ? "bg-transparent border-b border-transparent"
            : "bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 shadow-lg"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-24 flex justify-between items-center">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo.png" alt="IEEE DTU Logo" className="h-12 w-auto object-contain" />
          </Link>
          <button onClick={() => setMobileOpen((p) => !p)} className="text-white">
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Right-side sliding mobile menu */}
      <div
        ref={mobileMenuRef}
        className={`fixed top-0 right-0 h-full w-72 max-w-full bg-black text-white px-6 pb-4 pt-28 space-y-3 border-l border-gray-800 z-50 transform transition-transform duration-300 ease-in-out
        ${mobileOpen ? "translate-x-0" : "translate-x-full"}
        `}
        style={{ willChange: "transform" }}
      >
        {navLinks.map(({ name, href }) => (
          <Link
            key={name}
            href={href}
            onClick={() => {
              setMobileOpen(false);
              setActive(name.toLowerCase());
            }}
            className={`block transition-all duration-200 ${
              active === name.toLowerCase()
                ? "scale-105 font-bold text-brand"
                : "hover:text-brand"
            }`}
          >
            {name}
          </Link>
        ))}
      </div>
    </>
  );
}
