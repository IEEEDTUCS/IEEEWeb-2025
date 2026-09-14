"use client";

import React from 'react';
import { motion } from 'framer-motion';
import BranchCounsellor from './FacultyCards/BranchCounsller';
import FacultyWindow from './FacultyCards/FacultyWindow';

const Faculty = () => {
  return (
    <div className="flex flex-col gap-y-16 py-12 bg-black text-white relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      {/* Header Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center space-y-4 max-w-4xl mx-auto px-4 relative z-10"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-blue-400 mb-2 inline-block">
          Support System
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-heading">
          Meet Our Faculty <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-blue-600">Advisors</span>
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Distinguished professors and visionary mentors providing strategic guidance, research inspiration, and academic stewardship to IEEE DTU.
        </p>
      </motion.div>

      {/* Branch Counsellor Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.93, y: 40 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-70px" }}
        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 px-4"
      >
        <BranchCounsellor />
      </motion.div>

      {/* Faculty Cards Section */}
      <div className="relative z-10">
        <FacultyWindow />
      </div>
    </div>
  );
};

export default Faculty;