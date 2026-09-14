"use client";

import React from "react";
import { motion } from "framer-motion";
import { Quote } from "lucide-react";

function BranchCounsellor() {
  return (
    <div className="flex flex-col lg:flex-row border border-zinc-800/90 w-full max-w-6xl mx-auto bg-zinc-950/70 p-6 sm:p-8 lg:p-12 rounded-3xl shadow-[0_20px_60px_-15px_rgba(37,99,235,0.25)] gap-8 lg:gap-12 transition-all duration-500 hover:border-blue-500/40 group font-sans backdrop-blur-xl relative overflow-hidden">
      {/* Subtle top sheen */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

      {/* Image Section */}
      <div className="w-full lg:w-1/3 flex justify-center items-center">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900/60 p-2 shadow-2xl group-hover:border-blue-500/30 transition-all duration-500 w-full max-w-sm lg:max-w-none">
          <img
            src="/aboutPage/Faculty/Prof-J-Pand.jpeg"
            alt="Prof. Jeebananda Panda"
            className="rounded-xl object-cover w-full h-72 sm:h-80 lg:h-96 transition-all duration-700 group-hover:scale-[1.03]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent rounded-xl pointer-events-none" />
        </div>
      </div>
      
      {/* Content Section */}
      <div className="w-full lg:w-2/3 flex flex-col justify-center space-y-6 text-left">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400">
            <Quote className="w-5 h-5" />
          </div>
          <span className="text-xs uppercase tracking-widest text-blue-400 font-semibold">
            Message from Branch Counsellor
          </span>
        </div>

        <div className="space-y-4 text-sm sm:text-base leading-relaxed text-zinc-300 font-normal">
          <p>
            IEEE DTU's core purpose is to foster technological innovation and
            excellence for the benefit of humanity.
          </p>
          <p>
            IEEE DTU and its members inspire a global community through its highly
            cited publications, conferences, technology standards, and
            professional and educational activities. We aim to inspire and
            motivate the genius, to blossom into a societal revolution.
          </p>
          <p className="text-zinc-400">
            IEEE DTU will be essential to the global technical community and to
            technical professionals everywhere, and be universally recognized for
            the contributions of technology and of technical professionals in
            improving global conditions.
          </p>
        </div>
        
        {/* Name and Designation Section */}
        <div className="pt-4 border-t border-zinc-800/80">
          <h3 className="font-bold text-white text-xl sm:text-2xl tracking-tight leading-tight">
            Prof. Jeebananda Panda
          </h3>
          <p className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-blue-500 font-semibold tracking-wide text-sm mt-1">
            Branch Counsellor, IEEE DTU
          </p>
        </div>
      </div>
    </div>
  );
}

export default BranchCounsellor;