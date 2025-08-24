import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [active, setActive] = useState("");
  const mobileMenuRef = useRef(null);
  const dropdownRef = useRef(null);
  const moreBtnRef = useRef(null);

  const router = useRouter();
  const isHome = router.pathname === "/"; // ✅ landing page check

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/IEEEDTU/about" },
  ];

  const moreLinks = [
    { name: "Events", href: "/IEEEDTU/events" },
    { name: "Chapter", href: "/IEEEDTU/Chapters/CS" },
    { name: "Council", href: "/IEEEDTU/council" },
    { name: "Testimonials", href: "/IEEEDTU/testimonials" },
  ];

  const linkStyle =
    "relative px-2 py-1 text-gray-300 hover:text-white after:block after:scale-x-0 after:bg-indigo-400 after:h-[2px] after:rounded-full after:transition-transform hover:after:scale-x-100 transition-all duration-200";
  const activeStyle = "text-white font-semibold scale-105";

  useEffect(() => {
    function handleClickOutside(e) {
      if (mobileOpen && mobileMenuRef.current && !mobileMenuRef.current.contains(e.target)) {
        setMobileOpen(false);
      }
      if (dropdownOpen) {
        const clickedMore = moreBtnRef.current && moreBtnRef.current.contains(e.target);
        const insideDropdown = dropdownRef.current && dropdownRef.current.contains(e.target);
        if (!clickedMore && !insideDropdown) setDropdownOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === "Escape") {
        setMobileOpen(false);
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, [mobileOpen, dropdownOpen]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      {(mobileOpen || dropdownOpen) && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-[1px] z-40"
          onClick={() => {
            setMobileOpen(false);
            setDropdownOpen(false);
          }}
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

          <div className="hidden md:flex ms-auto items-center gap-8 text-lg">
            {navLinks.map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                onClick={() => setActive(name.toLowerCase())}
                className={`${linkStyle} ${active === name.toLowerCase() ? activeStyle : ""}`}
              >
                {name}
              </Link>
            ))}

            <div className="relative" ref={dropdownRef}>
              <button
                ref={moreBtnRef}
                onClick={() => setDropdownOpen((p) => !p)}
                className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-md transition-colors"
              >
                More
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200 z-50">
                  {moreLinks.map(({ name, href }) => (
                    <Link
                      key={name}
                      href={href}
                      onClick={() => {
                        setDropdownOpen(false);
                        setActive(name.toLowerCase());
                      }}
                      className={`block px-5 py-2 hover:bg-gray-100 transition-colors ${
                        active === name.toLowerCase() ? "font-bold text-indigo-600" : ""
                      }`}
                    >
                      {name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="md:hidden">
            <button onClick={() => setMobileOpen((p) => !p)} className="text-white">
              {mobileOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>

        {mobileOpen && (
          <div
            ref={mobileMenuRef}
            className="absolute top-24 left-0 w-full bg-gray-900/95 text-white px-6 pb-4 space-y-3 border-t border-gray-800 z-50"
          >
            {[...navLinks, ...moreLinks].map(({ name, href }) => (
              <Link
                key={name}
                href={href}
                onClick={() => {
                  setMobileOpen(false);
                  setActive(name.toLowerCase());
                }}
                className={`block transition-all duration-200 ${
                  active === name.toLowerCase() ? "scale-105 font-bold text-indigo-400" : "hover:text-indigo-400"
                }`}
              >
                {name}
              </Link>
            ))}
          </div>
        )}
      </nav>
    </>
  );
}
