import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  const socials = [
    {
      name: "Facebook",
      icon: <Facebook size={24} color="#fff" />,
      href: "https://www.facebook.com/ieeedtu",
      bg: "bg-[#1877F3]",
      hoverBg: "group-hover:bg-[#1877F3]",
    },
    {
      name: "Instagram",
      icon: <Instagram size={24} color="#fff" />,
      href: "https://www.instagram.com/ieee.dtu/",
      bg: "bg-gradient-to-r from-yellow-400 via-pink-500 to-purple-600",
      hoverBg:
        "group-hover:from-yellow-400 group-hover:via-pink-500 group-hover:to-purple-600",
    },
    {
      name: "X",
      icon: <Twitter size={24} color="#fff" />,
      href: "https://twitter.com/dtu_ieee",
      bg: "bg-black",
      hoverBg: "group-hover:bg-black",
    },
  ];

  return (
    <footer className="w-full bg-gray-900 text-gray-300 pt-4 relative">
      <div className="border-y-2 border-indigo-400 flex justify-center items-center backdrop-blur-3xl bg-black/25 shadow-inner py-2">
        <h4 className="text-xs sm:text-sm text-gray-400">
          &copy; {new Date().getFullYear()} All rights reserved | IEEE DTU
        </h4>
      </div>

      <div className="flex flex-col items-center mt-4 px-4 text-center">
        <div className="flex items-center gap-2">
          <img
            className="h-8 sm:h-10 w-auto object-contain"
            src="/images/logo.png"
            alt="IEEE DTU Logo"
          />
          <h2 className="text-xl sm:text-2xl font-bold text-white">IEEE DTU</h2>
        </div>
        <p className="text-gray-400 text-xs sm:text-sm mt-1">
          Fostering Innovation & Excellence for Humanity
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-around mt-6 md:mt-8 gap-6 md:gap-0 px-6">
        <div className="text-center md:text-left">
          <h3 className="font-semibold text-base sm:text-lg text-white mb-2">
            Quick Links
          </h3>
          <ul className="space-y-1 sm:space-y-2">
            {["Home", "About Us", "Faculty Advisor", "Contact Us"].map(
              (link) => (
                <li key={link}>
                  <a
                    href="#"
                    className="hover:text-indigo-400 transition text-sm sm:text-base"
                  >
                    {link}
                  </a>
                </li>
              )
            )}
          </ul>
        </div>

        <div className="text-center md:text-left">
          <h3 className="font-semibold text-base sm:text-lg text-white mb-2">
            Follow Us
          </h3>
          <div className="flex flex-col gap-3 items-center md:items-start">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                className={`group flex items-center gap-2 overflow-hidden w-40 sm:w-44 rounded-full px-3 py-2 transition-all duration-300 ${social.bg} hover:pl-4`}
              >
                <span
                  className={`p-1 rounded-full transition-colors duration-300 ${social.hoverBg}`}
                >
                  {social.icon}
                </span>
                <span className="transform translate-x-10 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-in-out font-medium text-white text-sm">
                  {social.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="border-y-2 border-indigo-400 flex justify-center items-center backdrop-blur-3xl bg-black/25 shadow-inner py-2 mt-6">
        <h4 className="text-xs sm:text-sm text-gray-400 text-center">
          The website is made with &hearts; by IEEE WebDev Team
        </h4>
      </div>
    </footer>
  );
}




