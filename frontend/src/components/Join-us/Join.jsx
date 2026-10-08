"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import SmoothScroll from "@/components/Common/SmoothScroll";

/* ── WhatsApp SVG icon ── */
function WAIcon({ size = 16 }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" width={size} height={size} aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.118.554 4.105 1.523 5.823L.057 23.882a.75.75 0 0 0 .92.92l6.086-1.459A11.945 11.945 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.725 9.725 0 0 1-4.964-1.356l-.355-.212-3.686.884.899-3.643-.232-.373A9.718 9.718 0 0 1 2.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  );
}

const REPS = [
  { name: "Bhavya Goel",      phone: "917982969225" },
  { name: "Drishti Kaushik",  phone: "919520002368" },
  { name: "Manit Vig",        phone: "919560566938" },
  { name: "Mayank Kanojjiya", phone: "919250110578" },
  { name: "Hardik Aggarwal",  phone: "919319173701" },
  { name: "Shyla Vijay",      phone: "917982691483" },
  { name: "Sankalp Tripathi", phone: "919013522191" },
  { name: "Saurabh Chauhan",  phone: "919643717883" },
  { name: "Prashay Joon",     phone: "917042527004" },
  { name: "Vishal Raj",       phone: "917909043293" },
];

const WA_MESSAGE = encodeURIComponent(
  "Hi! I would like to join IEEE DTU. Could you please guide me through the membership process?"
);

/* Index to subtle accent border colour — cycles through blues/purples to stay on-brand */
const ACCENT_BORDERS = [
  "border-blue-500/40 hover:border-blue-400/70",
  "border-sky-500/40  hover:border-sky-400/70",
  "border-indigo-500/40 hover:border-indigo-400/70",
  "border-blue-600/40 hover:border-blue-500/70",
  "border-cyan-600/40 hover:border-cyan-400/70",
  "border-blue-500/40 hover:border-blue-400/70",
  "border-sky-600/40  hover:border-sky-400/70",
  "border-indigo-600/40 hover:border-indigo-500/70",
  "border-blue-500/40 hover:border-blue-400/70",
  "border-sky-500/40  hover:border-sky-400/70",
];

const cardVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.96 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.55, delay: 0.06 * i, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function JoinUs() {
  const [animating, setAnimating] = useState(false);

  const handleQuickConnect = () => {
    if (animating) return;
    setAnimating(true);
    const chosen = REPS[Math.floor(Math.random() * REPS.length)];
    setTimeout(() => {
      window.open(
        `https://wa.me/${chosen.phone}?text=${WA_MESSAGE}`,
        "_blank",
        "noopener,noreferrer"
      );
      setAnimating(false);
    }, 500);
  };

  return (
    <SmoothScroll>
      <main className="relative min-h-screen bg-[#000000] text-white selection:bg-blue-600 selection:text-white pt-24 pb-28 overflow-hidden">

        {/* Ambient blue orbs — matches every other page */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[5%]  left-[-15%] w-[650px] h-[650px] rounded-full bg-blue-600/[0.08] blur-[170px]" />
          <div className="absolute top-[45%] right-[-15%] w-[600px] h-[600px] rounded-full bg-blue-600/[0.07] blur-[180px]" />
          <div className="absolute bottom-[5%] left-[5%]  w-[550px] h-[550px] rounded-full bg-sky-600/[0.06]  blur-[150px]" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">

          {/* ── Page header ── */}
          <motion.header
            className="text-center max-w-3xl mx-auto mb-16"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-5 shadow-[0_0_20px_rgba(37,99,235,0.2)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              Membership Open
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-heading drop-shadow-2xl">
              JOIN{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-blue-600">
                IEEE DTU
              </span>
            </h1>

            <p className="mt-5 text-base sm:text-lg text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
              Connect directly with a membership coordinator on WhatsApp and become part
              of IEEE DTU&apos;s community of builders, learners, and changemakers.
            </p>

            {/* Quick-connect CTA */}
            <motion.button
              type="button"
              onClick={handleQuickConnect}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              disabled={animating}
              className="mt-8 inline-flex items-center gap-2.5 px-7 py-3.5 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-[0_4px_20px_rgba(37,99,235,0.45)] hover:shadow-[0_6px_28px_rgba(37,99,235,0.65)] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              <span className="text-green-400">
                <WAIcon size={18} />
              </span>
              {animating ? "Connecting you…" : "Quick Connect"}
              <span className="text-base leading-none">↗</span>
            </motion.button>
          </motion.header>

          {/* ── Section label ── */}
          <motion.div
            className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <div>
              <span className="text-xs uppercase tracking-[0.3em] font-semibold text-blue-400 mb-2 inline-block">
                Membership Coordinators
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Start a conversation.
              </h2>
            </div>
            <p className="hidden sm:block text-right text-xs leading-5 text-zinc-500">
              Choose a coordinator or use Quick Connect above.
            </p>
          </motion.div>

          {/* ── Coordinator cards ── */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5">
            {REPS.map((rep, index) => (
              <motion.a
                key={rep.name}
                href={`https://wa.me/${rep.phone}?text=${WA_MESSAGE}`}
                target="_blank"
                rel="noreferrer"
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -4, transition: { duration: 0.25 } }}
                className={`group relative flex flex-col overflow-hidden rounded-2xl border bg-zinc-950 p-5 transition duration-300 hover:shadow-[0_0_28px_rgba(37,99,235,0.18)] no-underline ${ACCENT_BORDERS[index % ACCENT_BORDERS.length]}`}
              >
                {/* Subtle top-right glow */}
                <div className="absolute -right-6 -top-6 h-20 w-20 rounded-full bg-blue-500/10 blur-2xl transition group-hover:bg-blue-500/25" />

                {/* Number badge + arrow */}
                <div className="relative flex items-start justify-between mb-6">
                  <span className="grid h-9 w-9 place-items-center rounded-full border border-blue-500/40 bg-black text-xs font-bold text-blue-400">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-base text-blue-400 transition group-hover:translate-x-1 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </div>

                {/* Name */}
                <h3 className="relative text-base font-bold text-white leading-snug">
                  {rep.name}
                </h3>

                {/* Role */}
                <p className="relative mt-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
                  Membership coordinator
                </p>

                {/* Divider */}
                <div className="relative mt-4 h-px w-full bg-zinc-800 transition group-hover:bg-blue-500/40" />

                {/* Phone */}
                <p className="relative mt-4 text-xs font-medium tracking-wide text-zinc-400">
                  +{rep.phone.slice(0, 2)} {rep.phone.slice(2, 7)} {rep.phone.slice(7)}
                </p>

                {/* WA label */}
                <div className="relative mt-3 flex items-center gap-1.5 text-xs font-semibold text-green-400">
                  <WAIcon size={13} />
                  Message on WhatsApp
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </main>
    </SmoothScroll>
  );
}
