import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [active, setActive] = useState("");

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/IEEEDTU/about" },
    // { name: "Faculty Advisor", href: "/faculty" },
    // { name: "Contact", href: "/contact" },
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

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/80 backdrop-blur-xl border-b border-gray-800 shadow-lg">
      <div className="max-w-7xl mx-auto px-6 h-20 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="IEEE DTU Logo"
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-lg">
          {navLinks.map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              onClick={() => setActive(name.toLowerCase())}
              className={`${linkStyle} ${
                active === name.toLowerCase() ? activeStyle : ""
              }`}
            >
              {name}
            </Link>
          ))}

          {/* Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((prev) => !prev)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-md transition-colors"
            >
              More
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white text-gray-800 rounded-lg shadow-lg overflow-hidden border border-gray-200">
                {moreLinks.map(({ name, href }) => (
                  <Link
                    key={name}
                    href={href}
                    onClick={() => {
                      setDropdownOpen(false);
                      setActive(name.toLowerCase());
                    }}
                    className={`block px-5 py-2 hover:bg-gray-100 transition-colors ${
                      active === name.toLowerCase()
                        ? "font-bold text-indigo-600"
                        : ""
                    }`}
                  >
                    {name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen((prev) => !prev)}
            className="text-white"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-900/95 text-white px-6 pb-4 space-y-3 border-t border-gray-800">
          {[...navLinks, ...moreLinks].map(({ name, href }) => (
            <Link
              key={name}
              href={href}
              onClick={() => {
                setMobileOpen(false);
                setActive(name.toLowerCase());
              }}
              className={`block transition-all duration-200 ${
                active === name.toLowerCase()
                  ? "scale-105 font-bold text-indigo-400"
                  : "hover:text-indigo-400"
              }`}
            >
              {name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}






