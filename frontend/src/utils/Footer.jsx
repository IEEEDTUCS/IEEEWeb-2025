import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const socials = [
    {
      name: "Facebook",
      icon: <Facebook size={28} color="#fff" />,
      href: "https://www.facebook.com/ieeedtu",
      bg: "bg-[#1877F3]",
      hoverBg: "group-hover:bg-[#1877F3]",
    },
    {
      name: "Instagram",
      icon: <Instagram size={28} color="#fff" />,
      href: "https://www.instagram.com/ieee.dtu/",
      bg: "bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600",
      hoverBg:
        "group-hover:from-yellow-400 group-hover:via-pink-500 group-hover:to-purple-600",
    },
    {
      name: "X",
      icon: <Twitter size={28} color="#fff" />,
      href: "https://twitter.com/dtu_ieee",
      bg: "bg-black",
      hoverBg: "group-hover:bg-black",
    },
  ];

  return (
    <footer className="w-full bg-gray-900 text-gray-300 pt-6 relative">
      {/* Copyright */}
      <div className="border-y-2 border-indigo-400 flex justify-center items-center backdrop-blur-3xl bg-black/25 shadow-inner py-2">
        <h4 className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} All rights reserved | IEEE DTU
        </h4>
      </div>

      {/* Logo & Tagline */}
      <div className="flex flex-col items-center mt-6">
        <div className="flex items-center gap-3">
          <img
            className="h-10 w-auto object-contain"
            src="/images/logo.png"
            alt="IEEE DTU Logo"
          />
          <h2 className="text-2xl font-bold text-white">IEEE DTU</h2>
        </div>
        <p className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 text-sm mt-1">
          Fostering Innovation & Excellence for Humanity
        </p>
      </div>

      {/* Links */}
      <div className="flex flex-col md:flex-row justify-around mt-8 gap-10 md:gap-0">
        {/* Quick Links */}
        <div>
          <h3 className="font-semibold text-lg text-white mb-3">Quick Links</h3>
          <ul className="space-y-2">
            {["Home", "About Us", "Faculty Advisor", "Contact Us"].map(
              (link) => (
                <li key={link}>
                  <a href="#" className="hover:text-indigo-400 transition">
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        {/* Social Media List */}
        <div>
          <h3 className="font-semibold text-lg text-white mb-3">Follow Us</h3>
          <div className="flex flex-col gap-4">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className={`group flex items-center gap-3 overflow-hidden w-44 rounded-full px-3 py-2 transition-all duration-300 ${social.bg} hover:pl-5`}
              >
                <span
                  className={`p-1 rounded-full transition-colors duration-300 ${social.hoverBg}`}
                >
                  {social.icon}
                </span>
                <span
                  className={`transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-in-out font-medium text-white`}
                >
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/*Ending Note*/}
      <div className="border-y-2 border-indigo-400 flex justify-center items-center backdrop-blur-3xl bg-black/25 shadow-inner py-2">
        <h4 className="text-sm text-gray-400">
          The website is made with &hearts; by IEEE WebDev Team
        </h4>
      </div>

    </footer>
  );
}



