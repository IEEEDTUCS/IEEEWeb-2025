import React, { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const baseLinkClass =
    "relative inline-block px-2 py-1 text-gray-200 hover:text-white transition-all duration-200 after:block after:scale-x-0 after:bg-indigo-400 after:h-[2px] after:rounded-full after:transition-transform after:duration-200 hover:after:scale-x-100 hover:after:origin-center";

  const getLinkClass = (link) =>
    `${baseLinkClass} ${
      activeLink === link ? "scale-105 font-bold text-white" : ""
    } transition-transform duration-200`;

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-gray-900/80 shadow-lg w-full h-20 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-6 h-full flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <img
            src="/images/logo.png"
            alt="Homepage"
            className="h-12 w-auto object-contain"
          />
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8 font-medium text-lg">
          <Link
            href="/"
            className={getLinkClass("home")}
            onClick={() => setActiveLink("home")}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={getLinkClass("about")}
            onClick={() => setActiveLink("about")}
          >
            About Us
          </Link>
          <Link
            href="/faculty"
            className={getLinkClass("faculty")}
            onClick={() => setActiveLink("faculty")}
          >
            Faculty Advisor
          </Link>
          <Link
            href="/contact"
            className={getLinkClass("contact")}
            onClick={() => setActiveLink("contact")}
          >
            Contact
          </Link>

          {/* More Dropdown */}
          <div className="relative">
            <button
              onClick={() => setDashboardOpen(!dashboardOpen)}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg shadow-sm transition-colors"
            >
              More
            </button>
            {dashboardOpen && (
              <div className="absolute mt-2 right-0 w-48 bg-white text-gray-800 rounded-lg shadow-xl border border-gray-200 overflow-hidden">
                {["Events", "Chapter", "Council", "Testimonials"].map(
                  (item) => (
                    <Link
                      key={item}
                      href={`/${item.toLowerCase()}`}
                      onClick={() => {
                        setDashboardOpen(false);
                        setActiveLink(item.toLowerCase());
                      }}
                      className={`block w-full px-5 py-2.5 hover:bg-gray-100 transition-colors ${
                        activeLink === item.toLowerCase()
                          ? "font-bold text-indigo-600"
                          : ""
                      }`}
                    >
                      {item}
                    </Link>
                  )
                )}
              </div>
            )}
          </div>
        </div>

        {/* Hamburger Button (Mobile Only) */}
        <div className="md:hidden">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="text-white focus:outline-none"
          >
            {mobileOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile View */}
      {mobileOpen && (
        <div className="md:hidden bg-gray-900/95 text-white px-6 pb-4 space-y-3 border-t border-gray-800">
          {[
            { name: "Home", href: "/" },
            { name: "About Us", href: "/about" },
            { name: "Faculty Advisor", href: "/faculty" },
            { name: "Contact", href: "/contact" },
            { name: "Events", href: "/events" },
            { name: "Chapter", href: "/chapter" },
            { name: "Council", href: "/council" },
            { name: "Testimonials", href: "/testimonials" },
          ].map((item) => (
            <Link
              key={item.name}
              href={item.href}
              onClick={() => {
                setMobileOpen(false);
                setActiveLink(item.name.toLowerCase());
              }}
              className={`block transition-all duration-200 ${
                activeLink === item.name.toLowerCase()
                  ? "scale-105 font-bold text-indigo-400"
                  : "hover:text-indigo-400"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
}





