import React, { useState } from "react";
import { Facebook, Instagram, Twitter, Phone, Loader2 } from "lucide-react"; // 🌀 Added Loader icon

export default function Footer() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false); // 🟢 Loader state

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
      setLoading(true); // 🌀 Start loader
      const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/emails/subscribe`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        }
      );

      const data = await res.json();
      if(res.status === 200 && data.success) {
        setStatus("successButExists");
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
      setLoading(false); // 🌀 Stop loader
    }
  };

  return (
    <footer className="w-full bg-gray-500 bg-[url('/footer.png')] text-gray-300 pt-10 pb-6 relative mt-20 font-sans">
      {/* Header Section */}
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

      {/* Main Grid */}
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

        {/* Follow Us */}
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
            {[
              { name: "Vaibhav Gautam", phone: "+91 93552 57413" },
              { name: "Ketan Shankar", phone: "+91 95606 47659" },
              { name: "Spruha Kar", phone: "+91 72178 61438" },
            ].map((person) => (
              <div key={person.name} className="flex flex-col gap-1">
                <span className="font-medium text-white">{person.name}</span>
                <span className="flex items-center gap-2 text-gray-300">
                  <Phone size={16} className="text-blue-400" />
                  {person.phone}
                </span>
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
          <h3 className="text-lg font-semibold text-white mb-4 border-b border-gray-700 pb-2">
            Newsletter
          </h3>
          <p className="text-sm mb-3 text-gray-400">
            Subscribe to our newsletter for more updates.
          </p>

          <form className="flex flex-col gap-3" onSubmit={handleSubmit} noValidate>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              className="px-3 py-2 bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your Email"
              className="px-3 py-2 bg-gray-800 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
            />

            <button
              type="submit"
              disabled={loading} // 🌀 Disable button while loading
              className={`flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white text-sm py-2 rounded-lg transition ${
                loading ? "opacity-70 cursor-not-allowed" : ""
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
              <p className="text-indigo-400">
              You’re already subscribed.
              </p>
            )}

            {status === "success" && (
              <p className="text-indigo-400">
                Thank you {name}! You’ve been subscribed successfully.
              </p>
            )}
            {status === "error" && (
              <p className="text-red-500">{errorMessage}</p>
            )}
          </form>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="border-t border-gray-700 mt-10 pt-4 text-center text-xs text-gray-500">
        <p>&copy; {new Date().getFullYear()} IEEE DTU. All rights reserved.</p>
        <p className="mt-1">Made with ❤️ by IEEE WebDev Team</p>
      </div>
    </footer>
  );
}
