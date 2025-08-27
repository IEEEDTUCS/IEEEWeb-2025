import React from "react";
import { Facebook, Instagram, Twitter, Phone } from "lucide-react";

export default function Footer() {
  const socials = [
    {
      name: "Facebook",
      icon: <Facebook size={18} />,
      href: "https://www.facebook.com/ieeedtu",
      color: "hover:text-[#1877F3]",
    },
    {
      name: "Instagram",
      icon: <Instagram size={18} />,
      href: "https://www.instagram.com/ieee.dtu/",
      color: "hover:text-pink-500",
    },
    {
      name: "X",
      icon: <Twitter size={18} />,
      href: "https://twitter.com/dtu_ieee",
      color: "hover:text-gray-300",
    },
  ];

  return (
    <footer className="w-full bg-gray-500 bg-[url('/footer.png')] text-gray-300 pt-10 pb-6 relative mt-20 font-sans">

      <div className="flex flex-col items-center text-center px-4">
        <div className="flex items-center gap-2">
          <img
            src="/images/logo.png"
            alt="IEEE DTU Logo"
            className="h-10 w-auto object-contain"
          />
          <h2 className="text-2xl font-bold text-white">IEEE DTU</h2>
        </div>
        <p className="text-gray-400 text-sm mt-1">
          Fostering Innovation & Excellence for Humanity
        </p>
      </div>

      
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mt-10 px-6">
        {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/IEEEDTU/about" },
                { name: "Events", href: "/IEEEDTU/events" },
                { name: "Council", href: "/IEEEDTU/council" },
              ].map((link) => (
                <li key={link.name}>
            <a
              href={link.href}
              className="hover:text-indigo-400 transition duration-200"
            >
              {link.name}
            </a>
                </li>
              ))}
            </ul>
          </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
            Follow Us
          </h3>
          <div className="flex flex-col gap-3">
            {socials.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center gap-3 px-3 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition ${social.color}`}
              >
                {social.icon}
                <span>{social.name}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Contact Us */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
            Contact Us
          </h3>
          <div className="space-y-4 text-sm">
            <div className="flex flex-col gap-1">
              <span className="font-medium text-white">Vaibhav Gautam</span>
              <span className="flex items-center gap-2 text-gray-300">
                <Phone size={16} className="text-blue-400" />
                +91 93552 57413
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-medium text-white">Ketan Shankar</span>
              <span className="flex items-center gap-2 text-gray-300">
                <Phone size={16} className="text-blue-400" />
                +91 95606 47659
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-medium text-white">Spruha Kar</span>
              <span className="flex items-center gap-2 text-gray-300">
                <Phone size={16} className="text-blue-400" />
                +91 72178 61438
              </span>
            </div>
          </div>
          <div className="mt-5 text-sm leading-6 text-gray-400">
            <p>Delhi Technological University,</p>
            <p>Shahbad Daulatpur, Main Bawana Road,</p>
            <p>Delhi-110042, India</p>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
            Newsletter
          </h3>
          <p className="text-sm mb-3 text-gray-400">
            Subscribe to our newsletter for more updates.
          </p>
          <form className="flex flex-col gap-3">
            <input
              type="text"
              placeholder="Your Name"
              className="px-3 py-2 bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <input
              type="email"
              placeholder="Your Email"
              className="px-3 py-2 bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm py-2 rounded-lg transition"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} IEEE DTU. All rights reserved.</p>
        <p className="mt-1">Made with ❤️ by IEEE WebDev Team</p>
      </div>
    </footer>
  );
}