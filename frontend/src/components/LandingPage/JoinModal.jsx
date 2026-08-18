"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Zap, Users, Trophy, BookOpen, ArrowRight, Star, ChevronRight } from "lucide-react";

/* ── perks shown on the right panel ── */
const PERKS = [
  {
    icon: <Trophy size={20} />,
    title: "Flagship Events",
    desc: "Vihaan — India's largest student hackathon, IEEEXtreme, TechWeek & more.",
  },
  {
    icon: <BookOpen size={20} />,
    title: "IEEE Xplore Access",
    desc: "700,000+ research papers, 37 peer-reviewed magazines at your fingertips.",
  },
  {
    icon: <Users size={20} />,
    title: "300+ Active Members",
    desc: "A 40-year-old community of engineers, innovators & leaders at DTU.",
  },
  {
    icon: <Zap size={20} />,
    title: "SIGs & Mentorship",
    desc: "Hands-on groups in AI, ML, Robotics, 3D Design and mentors from Microsoft, Google.",
  },
];

const STATS = [
  { value: "40+", label: "Years Legacy" },
  { value: "5K+", label: "Hackathon Registrations" },
  { value: "300+", label: "Active Members" },
  { value: "4", label: "Chapters" },
];

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScdVzhcEbKrc61Y3aUzhK1NTybm7MpRfYNBvNAHSzV1tTpBzA/viewform?embedded=true";

/* ════════════════════════════════════════════
   TOP BANNER
════════════════════════════════════════════ */
export function JoinBanner({ onOpen, onDismiss }) {
  return (
    <motion.div
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -60, opacity: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-[990] flex items-center justify-center"
      style={{
        background: "linear-gradient(90deg, #0f0c29, #1a1a6e, #24243e)",
        borderBottom: "1px solid rgba(99,102,241,0.35)",
      }}
    >
      {/* Animated shimmer line */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(90deg, transparent 0%, rgba(99,102,241,0.15) 50%, transparent 100%)",
        }}
        animate={{ x: ["-100%", "100%"] }}
        transition={{ repeat: Infinity, duration: 2.8, ease: "linear" }}
      />

      <div className="relative flex items-center gap-3 px-4 py-2.5 w-full max-w-4xl justify-center">
        {/* Pulse dot */}
        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500" />
        </span>

        <p className="text-white text-sm font-medium tracking-wide text-center">
          <span className="text-indigo-300 font-semibold">Applications open</span>
          {" · "}Join IEEE DTU — Delhi's oldest & largest engineering society
        </p>

        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.97 }}
          className="flex-shrink-0 flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold px-3.5 py-1.5 rounded-full transition-colors"
        >
          Join Now <ChevronRight size={13} />
        </motion.button>

        <button
          onClick={onDismiss}
          className="absolute right-3 text-white/40 hover:text-white/80 transition-colors"
          aria-label="Dismiss"
        >
          <X size={15} />
        </button>
      </div>
    </motion.div>
  );
}

/* ════════════════════════════════════════════
   FULL MODAL
════════════════════════════════════════════ */
export function JoinModal({ open, onClose }) {
  const [formLoaded, setFormLoaded] = useState(false);

  // Lock body scroll
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={onClose}
            className="fixed inset-0 z-[995] bg-black/70 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.93, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.93, y: 30 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[996] flex items-center justify-center p-4"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="relative w-full max-w-5xl max-h-[90vh] rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
              style={{
                pointerEvents: "auto",
                background: "#0a0a14",
                border: "1px solid rgba(99,102,241,0.2)",
              }}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
                aria-label="Close"
              >
                <X size={16} />
              </button>

              {/* ── LEFT: Google Form embed ── */}
              <div className="w-full md:w-[52%] flex flex-col" style={{ borderRight: "1px solid rgba(99,102,241,0.15)" }}>
                <div className="px-6 pt-6 pb-3 flex-shrink-0">
                  <p className="text-indigo-400 text-xs font-bold uppercase tracking-widest mb-1">Join IEEE DTU</p>
                  <h2 className="text-white text-xl font-bold">Fill out the form</h2>
                </div>

                <div className="relative flex-1 min-h-0" style={{ height: "clamp(400px, 55vh, 600px)" }}>
                  {!formLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#0a0a14]">
                      <div className="w-8 h-8 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin" />
                      <p className="text-white/40 text-sm">Loading form…</p>
                    </div>
                  )}
                  <iframe
                    src={FORM_URL}
                    title="IEEE DTU Membership Form"
                    width="100%"
                    height="100%"
                    frameBorder="0"
                    marginHeight="0"
                    marginWidth="0"
                    onLoad={() => setFormLoaded(true)}
                    style={{
                      display: formLoaded ? "block" : "none",
                      background: "transparent",
                    }}
                  />
                </div>
              </div>

              {/* ── RIGHT: Pitch panel ── */}
              <div
                className="w-full md:w-[48%] flex flex-col overflow-y-auto"
                style={{
                  background: "linear-gradient(160deg, #0f0c29 0%, #1a1060 50%, #0d0d1a 100%)",
                }}
              >
                <div className="p-7 flex flex-col gap-6">

                  {/* Logo + headline */}
                  <div className="flex flex-col items-start gap-4">
                    <img src="/images/logo.png" alt="IEEE DTU" className="h-12 w-auto object-contain" />
                    <div>
                      <h3 className="text-2xl font-bold text-white leading-tight">
                        Be part of{" "}
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                          something bigger.
                        </span>
                      </h3>
                      <p className="text-white/50 text-sm mt-1 leading-relaxed">
                        IEEE DTU — 40+ years of technical excellence at Delhi Technological University.
                      </p>
                    </div>
                  </div>

                  {/* Stats row */}
                  <div className="grid grid-cols-2 gap-3">
                    {STATS.map(({ value, label }) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="rounded-xl px-4 py-3 flex flex-col"
                        style={{ background: "rgba(99,102,241,0.1)", border: "1px solid rgba(99,102,241,0.2)" }}
                      >
                        <span className="text-2xl font-extrabold text-indigo-300">{value}</span>
                        <span className="text-xs text-white/50 font-medium">{label}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* Perks list */}
                  <div className="flex flex-col gap-3">
                    {PERKS.map(({ icon, title, desc }, i) => (
                      <motion.div
                        key={title}
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.15 + i * 0.07 }}
                        className="flex items-start gap-3"
                      >
                        <div
                          className="flex-shrink-0 w-9 h-9 rounded-lg flex items-center justify-center mt-0.5"
                          style={{ background: "rgba(99,102,241,0.18)", color: "#818cf8" }}
                        >
                          {icon}
                        </div>
                        <div>
                          <p className="text-white text-sm font-semibold">{title}</p>
                          <p className="text-white/45 text-xs leading-relaxed mt-0.5">{desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* Testimonial snippet */}
                  <div
                    className="rounded-xl p-4 flex flex-col gap-2"
                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}
                  >
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-white/70 text-xs leading-relaxed italic">
                      "IEEE DTU has been one of the most transformative journeys of my college life. It introduced me to some of the finest seniors and peers I could have asked for."
                    </p>
                    <p className="text-indigo-400 text-xs font-semibold">— Ketan Shankar, Batch of 2026</p>
                  </div>

                  {/* CTA fallback */}
                  <a
                    href="https://docs.google.com/forms/d/e/1FAIpQLScdVzhcEbKrc61Y3aUzhK1NTybm7MpRfYNBvNAHSzV1tTpBzA/viewform"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all"
                    style={{ background: "linear-gradient(135deg, #4f46e5, #7c3aed)" }}
                  >
                    Open full form <ArrowRight size={15} />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
