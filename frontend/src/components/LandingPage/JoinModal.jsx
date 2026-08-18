"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Zap, Users, Trophy, BookOpen,
  ArrowRight, Star, ChevronRight, Sparkles,
} from "lucide-react";

/* ── data ── */
const PERKS = [
  { icon: <Trophy size={16} />,   title: "Flagship Events",    desc: "Vihaan, IEEEXtreme, TechWeek & more." },
  { icon: <BookOpen size={16} />, title: "IEEE Xplore",        desc: "700K+ research papers at your fingertips." },
  { icon: <Users size={16} />,    title: "300+ Members",       desc: "A 40-year community of engineers at DTU." },
  { icon: <Zap size={16} />,      title: "SIGs & Mentorship",  desc: "AI, ML, Robotics — with mentors from MAANG." },
];

const STATS = [
  { value: "40+",  label: "Years" },
  { value: "5K+",  label: "Registrations" },
  { value: "300+", label: "Members" },
  { value: "4",    label: "Chapters" },
];

/* membership reps — random one picked on click */
const REPS = [
  { name: "Bhavya Goel",       phone: "917982969225" },
  { name: "Drishti Kaushik",   phone: "919520002368" },
  { name: "Manit Vig",         phone: "919560566938" },
  { name: "Mayank Kanojjiya",  phone: "919250110578" },
  { name: "Hardik Aggarwal",   phone: "919319173701" },
  { name: "Shyla Vijay",       phone: "917982691483" },
  { name: "Sankalp Tripathi",  phone: "919013522191" },
  { name: "Saurabh Chauhan",   phone: "919643717883" },
  { name: "Prashay Joon",      phone: "917042527004" },
  { name: "Vishal Raj",        phone: "917909043293" },
];

const WA_MESSAGE = encodeURIComponent(
  "Hi! I'm interested in joining IEEE DTU. Could you please share more details about the membership process?"
);

function WhatsAppButton() {
  const [rep, setRep] = React.useState(null);
  const [animating, setAnimating] = React.useState(false);

  const handleClick = () => {
    if (animating) return;
    setAnimating(true);
    const chosen = REPS[Math.floor(Math.random() * REPS.length)];
    setRep(chosen);
    setTimeout(() => {
      window.open(`https://wa.me/${chosen.phone}?text=${WA_MESSAGE}`, "_blank");
      setAnimating(false);
    }, 600);
  };

  return (
    <motion.button
      onClick={handleClick}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="w-full flex items-center justify-center gap-2.5 rounded-xl py-3 text-sm font-bold text-white transition-all relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #16a34a, #15803d)",
        boxShadow: "0 4px 20px rgba(22,163,74,0.35)",
      }}
    >
      {/* WhatsApp icon */}
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 flex-shrink-0">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.105 1.523 5.823L.057 23.882a.75.75 0 0 0 .92.92l6.086-1.459A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.725 9.725 0 0 1-4.964-1.356l-.355-.212-3.686.884.899-3.643-.232-.373A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
      </svg>

      {animating ? (
        <span className="flex items-center gap-2">
          <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Connecting…
        </span>
      ) : (
        <span>Chat on WhatsApp</span>
      )}
    </motion.button>
  );
}

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScdVzhcEbKrc61Y3aUzhK1NTybm7MpRfYNBvNAHSzV1tTpBzA/viewform?embedded=true";

/* ══════════════════════════════════════════════════
   FLOATING PILL POPUP  — centered, compact, premium
══════════════════════════════════════════════════ */
export function JoinBanner({ onOpen, onDismiss }) {
  return (
    <motion.div
      initial={{ y: -80, opacity: 0, scale: 0.9 }}
      animate={{ y: 0,   opacity: 1, scale: 1   }}
      exit={{    y: -80, opacity: 0, scale: 0.9  }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      /* centered, fixed near the top, NOT full-width */
      className="fixed top-5 left-1/2 z-[990]"
      style={{ transform: "translateX(-50%)" }}
    >
      <div
        className="relative flex items-center gap-3 px-5 py-3 rounded-2xl"
        style={{
          background: "rgba(10, 10, 20, 0.88)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(99,102,241,0.35)",
          boxShadow: "0 8px 40px rgba(0,0,0,0.45), 0 0 0 1px rgba(99,102,241,0.1)",
          whiteSpace: "nowrap",
        }}
      >
        {/* animated glow dot */}
        <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-indigo-500" />
        </span>

        {/* label */}
        <p className="text-white/90 text-sm font-semibold">
          Join IEEE DTU
        </p>

        {/* CTA pill */}
        <motion.button
          onClick={onOpen}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-1.5 text-white text-xs font-bold px-3.5 py-1.5 rounded-xl"
          style={{
            background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
            boxShadow: "0 2px 12px rgba(79,70,229,0.45)",
          }}
        >
          Join Now <ChevronRight size={12} />
        </motion.button>

        {/* dismiss */}
        <button
          onClick={onDismiss}
          className="ml-1 text-white/30 hover:text-white/70 transition-colors"
          aria-label="Dismiss"
        >
          <X size={14} />
        </button>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════════ */
export function JoinModal({ open, onClose }) {
  const [formLoaded, setFormLoaded] = useState(false);

  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else { document.body.style.overflow = ""; setFormLoaded(false); }
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="bd"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[995]"
            style={{ background: "rgba(0,0,0,0.72)", backdropFilter: "blur(6px)" }}
          />

          {/* Modal panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1,    y: 0  }}
            exit={{    opacity: 0, scale: 0.94, y: 24  }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[996] flex items-center justify-center p-4"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="relative w-full flex flex-col md:flex-row overflow-hidden rounded-3xl"
              style={{
                maxWidth: 960,
                maxHeight: "90vh",
                pointerEvents: "auto",
                boxShadow: "0 32px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.06)",
              }}
            >
              {/* ── LEFT: form embed on pure white ── */}
              <div
                className="w-full md:w-[52%] flex flex-col"
                style={{ background: "#ffffff" }}
              >
                {/* form header */}
                <div
                  className="px-7 pt-6 pb-4 flex items-center justify-between flex-shrink-0"
                  style={{ borderBottom: "1px solid #f0f0f0" }}
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest text-indigo-500 mb-0.5">
                      Membership Form
                    </p>
                    <h2 className="text-lg font-bold text-gray-900">
                      Join IEEE DTU
                    </h2>
                  </div>
                  <img src="/images/logo.png" alt="IEEE DTU" className="h-9 w-auto object-contain" />
                </div>

                {/* iframe */}
                <div className="relative flex-1 overflow-hidden" style={{ minHeight: 480 }}>
                  {!formLoaded && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-white">
                      <div
                        className="w-9 h-9 rounded-full border-[3px] animate-spin"
                        style={{ borderColor: "#e0e7ff", borderTopColor: "#4f46e5" }}
                      />
                      <p className="text-gray-400 text-sm">Loading form…</p>
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
                      minHeight: 480,
                    }}
                  />
                </div>
              </div>

              {/* ── RIGHT: dark pitch panel ── */}
              <div
                className="w-full md:w-[48%] flex flex-col overflow-y-auto"
                style={{ background: "#09090f" }}
              >
                {/* close button */}
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center transition-colors"
                  style={{ background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.6)" }}
                  onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.15)"}
                  onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
                  aria-label="Close"
                >
                  <X size={15} />
                </button>

                <div className="p-7 flex flex-col gap-6">

                  {/* headline */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={14} className="text-indigo-400" />
                      <span className="text-indigo-400 text-xs font-bold uppercase tracking-widest">
                        Why join us
                      </span>
                    </div>
                    <h3 className="text-[1.65rem] font-extrabold text-white leading-tight">
                      Be part of{" "}
                      <span
                        className="text-transparent bg-clip-text"
                        style={{ backgroundImage: "linear-gradient(135deg, #818cf8, #c084fc)" }}
                      >
                        something bigger.
                      </span>
                    </h3>
                    <p className="text-white/45 text-sm mt-2 leading-relaxed">
                      DTU's oldest engineering society — 40+ years of technical excellence.
                    </p>
                  </div>

                  {/* stats */}
                  <div className="grid grid-cols-4 gap-2">
                    {STATS.map(({ value, label }) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="rounded-xl px-2 py-3 flex flex-col items-center text-center"
                        style={{
                          background: "rgba(99,102,241,0.1)",
                          border: "1px solid rgba(99,102,241,0.18)",
                        }}
                      >
                        <span className="text-xl font-extrabold text-indigo-300">{value}</span>
                        <span className="text-[10px] text-white/40 font-medium mt-0.5 leading-tight">{label}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* perks */}
                  <div className="flex flex-col gap-3">
                    {PERKS.map(({ icon, title, desc }, i) => (
                      <motion.div
                        key={title}
                        initial={{ opacity: 0, x: 12 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 + i * 0.07 }}
                        className="flex items-start gap-3 p-3 rounded-xl"
                        style={{
                          background: "rgba(255,255,255,0.03)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <div
                          className="flex-shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                          style={{ background: "rgba(99,102,241,0.18)", color: "#818cf8" }}
                        >
                          {icon}
                        </div>
                        <div>
                          <p className="text-white text-sm font-semibold">{title}</p>
                          <p className="text-white/40 text-xs leading-relaxed mt-0.5">{desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* testimonial */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.45 }}
                    className="rounded-xl p-4"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      border: "1px solid rgba(255,255,255,0.07)",
                    }}
                  >
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={11} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-white/60 text-xs leading-relaxed italic">
                      "IEEE DTU introduced me to some of the finest seniors and peers I could have asked for. If you're looking for a place to truly grow — there's no better place."
                    </p>
                    <p className="text-indigo-400 text-xs font-semibold mt-2">
                      — Ketan Shankar, Batch of 2026
                    </p>
                  </motion.div>

                  {/* fallback CTA */}
                  <WhatsAppButton />

                  <a
                    href="/IEEEDTU/join-us"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 rounded-xl py-3 text-sm font-bold text-white transition-all"
                    style={{
                      background: "linear-gradient(135deg, #4f46e5, #7c3aed)",
                      boxShadow: "0 4px 20px rgba(79,70,229,0.35)",
                    }}
                    onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.12)"}
                    onMouseLeave={e => e.currentTarget.style.filter = ""}
                  >
                    Open full form <ArrowRight size={14} />
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
