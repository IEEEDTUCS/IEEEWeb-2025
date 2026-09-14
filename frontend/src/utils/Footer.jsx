import React, { useState, useRef } from "react";
import { Facebook, Instagram, Twitter, Phone, Loader2 } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const footerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: footerRef,
    offset: ["start end", "end end"],
  });

  const smoothFooterProgress = useSpring(scrollYProgress, {
    stiffness: 42,
    damping: 24,
    mass: 0.65,
    restDelta: 0.0005,
  });

  // Smooth zoom-in entrance as the user approaches the footer
  const scale = useTransform(smoothFooterProgress, [0, 0.9], [0.88, 1.0]);
  const opacity = useTransform(smoothFooterProgress, [0, 0.5], [0.3, 1.0]);
  const y = useTransform(smoothFooterProgress, [0, 0.9], [60, 0]);

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

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus(null);
    setErrorMessage("");

    if (!name.trim()) {
      setStatus("error");
      setErrorMessage("Username is required");
      return;
    }

    if (!validateEmail(email)) {
      setStatus("error");
      setErrorMessage("Please provide a valid email");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/emails/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        }
      );
      const data = await res.json();
      if (res.status === 409) {
        setStatus("successButExists");
        return;
      }
      if (res.ok && res.status === 201 && data.success) {
        setStatus("success");
        setName("");
        setEmail("");
      } else {
        setStatus("error");
        setErrorMessage(data.message || "Subscription failed!");
      }
    } catch (error) {
      setStatus("error");
      setErrorMessage("Network error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer ref={footerRef} className="w-full bg-black bg-[url('/footer.png')] border-t border-zinc-900 text-gray-300 pt-12 pb-8 relative font-sans overflow-hidden">
      <motion.div
        style={{ scale, opacity, y, transformOrigin: "center top" }}
        className="w-full"
      >
        {/* Header Section */}
        <div className="flex flex-col items-center text-center px-4">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="IEEE DTU Logo"
              className="h-10 w-auto object-contain"
            />
            <h2 className="text-2xl font-bold text-white font-heading">IEEE DTU</h2>
          </div>
          <p className="text-gray-400 text-sm mt-1">
            Fostering Innovation & Excellence for Humanity
          </p>
        </div>

        {/* Main Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10 mt-10 px-6">
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-zinc-800 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: "Home", href: "/" },
                { name: "About Us", href: "/#about" },
                { name: "Events", href: "/IEEEDTU/events" },
                { name: "Council", href: "/IEEEDTU/council" },
                { name: "Join Us", href: "/IEEEDTU/join-us" },
              ].map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="hover:text-blue-400 transition duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-zinc-800 pb-2">
              Follow Us
            </h3>
            <div className="flex flex-col gap-3">
              {socials.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800 transition ${social.color}`}
                >
                  {social.icon}
                  <span>{social.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Contact Us */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-zinc-800 pb-2">
              Contact Us
            </h3>
            <div className="space-y-4 text-sm">
              {[
                { name: "Rudit Madaan", phone: "+91 96257 01606" },
                { name: "Bhavit Jain", phone: "+91 97737 25773" },
                { name: "Jitendra Kumar Singh", phone: "+91 75368 21441" },
              ].map((person) => (
                <div key={person.name} className="flex flex-col gap-1">
                  <span className="font-medium text-white">{person.name}</span>
                  <a
                    href={`tel:${person.phone.replace(/\s+/g, "")}`}
                    className="flex items-center gap-2 text-gray-300 hover:text-blue-400 transition"
                  >
                    <Phone size={16} className="text-blue-400" />
                    {person.phone}
                  </a>
                </div>
              ))}
            </div>
            <div className="mt-5 text-sm leading-6 text-gray-400">
              <p>Delhi Technological University,</p>
              <p>Shahbad Daulatpur, Main Bawana Road,</p>
              <p>Delhi-110042, India</p>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4 border-b border-zinc-800 pb-2">
              Stay in Touch
            </h3>
            <p className="text-xs text-gray-400 mb-3 leading-relaxed">
              Subscribe to our newsletter for event announcements and updates.
            </p>
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your Name"
                className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500"
                required
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your Email"
                className="px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500"
                required
              />

              <button
                type="submit"
                disabled={loading}
                className={`flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white text-sm font-semibold py-2 rounded-lg shadow-lg shadow-blue-600/20 border border-blue-500/30 transition-all ${
                  loading ? "opacity-70 cursor-not-allowed" : "active:scale-[0.98]"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Sending...
                  </>
                ) : (
                  "Subscribe"
                )}
              </button>

              {status === "successButExists" && (
                <p className="text-blue-400 text-xs mt-1">
                  You’re already subscribed.
                </p>
              )}

              {status === "success" && (
                <p className="text-blue-400 text-xs mt-1">
                  Thank you {name}! You’ve been subscribed successfully.
                </p>
              )}
              {status === "error" && (
                <p className="text-red-400 text-xs mt-1">{errorMessage}</p>
              )}
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-zinc-900 mt-10 pt-4 text-center text-xs text-gray-500">
          <p>&copy; {new Date().getFullYear()} IEEE DTU. All rights reserved.</p>
          <p className="mt-1">Made with ❤️ by IEEE WebDev Team</p>
        </div>
      </motion.div>
    </footer>
  );
}
