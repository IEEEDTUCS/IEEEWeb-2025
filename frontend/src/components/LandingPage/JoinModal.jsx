"use client";
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, Zap, Users, Trophy, BookOpen,
  ArrowRight, Star, ChevronRight, Sparkles,
} from "lucide-react";

/* ── site blue palette ── */
const BLUE    = "#2563eb";
const BLUE_DK = "#1d4ed8";
const BLUE_BG = "rgba(37,99,235,0.12)";
const BLUE_BD = "rgba(37,99,235,0.22)";

/* ── data ── */
const PERKS = [
  { icon: <Trophy size={16} />,   title: "Flagship Events",   desc: "Vihaan, IEEEXtreme, TechWeek & more." },
  { icon: <BookOpen size={16} />, title: "IEEE Xplore",       desc: "700K+ research papers at your fingertips." },
  { icon: <Users size={16} />,    title: "300+ Members",      desc: "A 40-year community of engineers at DTU." },
  { icon: <Zap size={16} />,      title: "SIGs & Mentorship", desc: "AI, ML, Robotics — mentors from MAANG." },
];

const STATS = [
  { value: "40+",  label: "Years" },
  { value: "5K+",  label: "Registrations" },
  { value: "300+", label: "Members" },
  { value: "4",    label: "Chapters" },
];

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

const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfgGoyFCC737i6_9kHCwuSo5ZVPND-Os6Oqbl2p_zh41WdyjA/viewform?embedded=true";

/* ── internal WhatsApp button (modal only) ── */
function WABtn({ style = {} }) {
  const [animating, setAnimating] = React.useState(false);
  const handleClick = () => {
    if (animating) return;
    setAnimating(true);
    const rep = REPS[Math.floor(Math.random() * REPS.length)];
    setTimeout(() => {
      window.open(`https://wa.me/${rep.phone}?text=${WA_MESSAGE}`, "_blank");
      setAnimating(false);
    }, 500);
  };
  return (
    <button
      onClick={handleClick}
      className="flex-1 flex items-center justify-center gap-1.5 px-3 py-2.5 sm:py-3 rounded-xl text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-green-600 to-green-700 shadow-[0_4px_16px_rgba(22,163,74,0.3)] hover:shadow-[0_6px_20px_rgba(22,163,74,0.4)] border-none cursor-pointer transition-all"
      style={style}
      onMouseEnter={e => e.currentTarget.style.filter = "brightness(1.1)"}
      onMouseLeave={e => e.currentTarget.style.filter = ""}
    >
      <svg viewBox="0 0 24 24" fill="currentColor" width={14} height={14} className="sm:w-4 sm:h-4 flex-shrink-0">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
        <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.105 1.523 5.823L.057 23.882a.75.75 0 0 0 .92.92l6.086-1.459A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.725 9.725 0 0 1-4.964-1.356l-.355-.212-3.686.884.899-3.643-.232-.373A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z"/>
      </svg>
      <span className="hidden xs:inline sm:inline">{animating ? "Connecting…" : "WhatsApp"}</span>
      <span className="xs:hidden sm:hidden">{animating ? "..." : "WA"}</span>
    </button>
  );
}

/* ══════════════════════════════════════════════════
   PILL BANNER
══════════════════════════════════════════════════ */
export function JoinBanner({ onOpen, onDismiss }) {
  return (
    <motion.div
      initial={{ y: -80, opacity: 0, scale: 0.9 }}
      animate={{ y: 0,   opacity: 1, scale: 1   }}
      exit={{    y: -80, opacity: 0, scale: 0.9  }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-3 left-3 right-3 sm:top-5 sm:left-4 sm:right-4 md:left-1/2 md:right-auto z-[990] md:w-auto"
    >
      <div className="md:translate-x-[-50%] md:relative">
        <div
          className="relative flex items-center justify-between gap-2 px-3 py-2 sm:gap-3 sm:px-4 rounded-full border border-blue-500/30 bg-zinc-950/90 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.7),0_0_20px_rgba(37,99,235,0.25)] hover:border-blue-500/50 transition-all duration-300"
        >
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <span className="relative flex h-2 w-2 sm:h-2.5 sm:w-2.5 flex-shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 bg-blue-500" />
              <span className="relative inline-flex rounded-full h-2 w-2 sm:h-2.5 sm:w-2.5 bg-blue-500" />
            </span>

            <p className="text-white text-xs sm:text-sm font-semibold tracking-wide truncate">
              Join IEEE DTU
            </p>
          </div>

          <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
            <motion.button
              onClick={onOpen}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-1 sm:gap-1.5 text-white text-[11px] sm:text-xs font-bold px-2.5 py-1.5 sm:px-3.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 shadow-[0_2px_14px_rgba(37,99,235,0.5)] hover:shadow-[0_4px_20px_rgba(37,99,235,0.7)] transition-all cursor-pointer whitespace-nowrap"
            >
              Join Now <ChevronRight size={11} className="sm:hidden" /><ChevronRight size={12} className="hidden sm:inline" />
            </motion.button>

            <button
              onClick={onDismiss}
              className="text-zinc-400 hover:text-white transition-colors flex-shrink-0 p-1 cursor-pointer"
              aria-label="Dismiss"
            >
              <X size={13} className="sm:hidden" />
              <X size={14} className="hidden sm:inline" />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════
   MODAL
══════════════════════════════════════════════════ */
export function JoinModal({ open, onClose }) {
  useEffect(() => {
    if (open) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            key="bd"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 z-[995] bg-black/80 backdrop-blur-md"
          />

          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[996] flex items-end md:items-center justify-center p-0 md:p-4"
            style={{ pointerEvents: "none" }}
          >
            <div
              className="relative w-full flex flex-col md:flex-row overflow-hidden md:rounded-3xl rounded-t-3xl border border-zinc-800 shadow-[0_32px_80px_rgba(0,0,0,0.8),0_0_50px_rgba(37,99,235,0.15)] bg-zinc-950"
              style={{
                maxWidth: 960,
                height: "auto",
                maxHeight: "92vh",
                pointerEvents: "auto",
              }}
            >
              {/* ── LEFT: form — hidden on mobile ── */}
              <div className="hidden md:flex md:w-[52%] flex-col bg-zinc-950 border-r border-zinc-800/80">
                <div
                  className="px-7 pt-6 pb-4 flex items-center justify-between flex-shrink-0 border-b border-zinc-800/80 bg-zinc-900/50"
                >
                  <div>
                    <p className="text-xs font-bold uppercase tracking-widest mb-0.5 text-blue-400">
                      Membership Form
                    </p>
                    <h2 className="text-lg font-bold text-white">Join IEEE DTU</h2>
                  </div>
                  <img src="/images/logo.png" alt="IEEE DTU" className="h-9 w-auto object-contain" />
                </div>

                <div className="relative flex-1 overflow-hidden bg-zinc-950" style={{ minHeight: 480 }}>
                  <iframe
                    src={FORM_URL}
                    title="IEEE DTU Membership Form"
                    width="100%" height="100%"
                    frameBorder="0" marginHeight="0" marginWidth="0"
                    style={{ display: "block", minHeight: 480 }}
                  />
                </div>
              </div>

              {/* ── RIGHT: pitch ── */}
              <div
                className="w-full md:w-[48%] flex flex-col overflow-y-auto bg-zinc-950"
              >
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors cursor-pointer"
                  aria-label="Close"
                >
                  <X size={15} />
                </button>

                <div className="p-5 sm:p-7 flex flex-col gap-5 sm:gap-6">

                  {/* headline */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles size={14} className="text-blue-400" />
                      <span className="text-xs font-bold uppercase tracking-widest text-blue-400">
                        Why join us
                      </span>
                    </div>
                    <h3 className="text-2xl sm:text-[1.65rem] font-extrabold text-white leading-tight">
                      Be part of{" "}
                      <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-blue-600">
                        something bigger.
                      </span>
                    </h3>
                    <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                      DTU's oldest engineering society — 40+ years of technical excellence.
                    </p>
                  </div>

                  {/* stats */}
                  <div className="grid grid-cols-4 gap-2 sm:gap-3">
                    {STATS.map(({ value, label }) => (
                      <motion.div key={label}
                        initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="rounded-xl px-2 sm:px-3 py-3 sm:py-4 flex flex-col items-center text-center bg-blue-500/10 border border-blue-500/20"
                      >
                        <span className="text-lg sm:text-xl font-extrabold text-blue-400">{value}</span>
                        <span className="text-[9px] sm:text-[10px] text-zinc-400 font-medium mt-0.5 leading-tight">{label}</span>
                      </motion.div>
                    ))}
                  </div>

                  {/* perks */}
                  <div className="flex flex-col gap-2.5 sm:gap-3">
                    {PERKS.map(({ icon, title, desc }, i) => (
                      <motion.div key={title}
                        initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.12 + i * 0.07 }}
                        className="flex items-start gap-2.5 sm:gap-3 p-2.5 sm:p-3 rounded-xl bg-zinc-900/60 border border-zinc-800"
                      >
                        <div className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center bg-blue-500/10 text-blue-400">
                          {icon}
                        </div>
                        <div>
                          <p className="text-white text-xs sm:text-sm font-semibold">{title}</p>
                          <p className="text-zinc-400 text-[11px] sm:text-xs leading-relaxed mt-0.5">{desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>

                  {/* testimonial */}
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.45 }}
                    className="rounded-xl p-3 sm:p-4 bg-zinc-900/60 border border-zinc-800"
                  >
                    <div className="flex gap-0.5 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={10} className="sm:size-11 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <p className="text-zinc-300 text-[11px] sm:text-xs leading-relaxed italic">
                      "IEEE DTU introduced me to some of the finest seniors and peers I could have asked for. If you're looking for a place to truly grow — there's no better place."
                    </p>
                    <p className="text-[11px] sm:text-xs font-semibold mt-2 text-blue-400">
                      — Ketan Shankar, Batch of 2026
                    </p>
                  </motion.div>

                  {/* CTAs — Join Us left, WhatsApp right */}
                  <div className="flex gap-2">
                    <a
                      href="/IEEEDTU/join-us"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 flex items-center justify-center gap-1.5 sm:gap-2 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-[0_4px_20px_rgba(37,99,235,0.45)] hover:shadow-[0_6px_25px_rgba(37,99,235,0.65)] transition-all no-underline"
                      style={{ textDecoration: 'none' }}
                    >
                      Join Us <ArrowRight size={13} className="sm:hidden" /><ArrowRight size={14} className="hidden sm:inline" />
                    </a>
                    <WABtn />
                  </div>

                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
