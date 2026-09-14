'use client';

import React from 'react';
import { motion } from 'framer-motion';
import EventComponent from './EventComponent';
import eventsData from './EventsData';
import SmoothScroll from '../Common/SmoothScroll';

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export default function Events() {
  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#000000] text-white selection:bg-blue-600 selection:text-white pt-24 pb-28 overflow-hidden">
        {/* Global Ambient Blue Lighting Orbs */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="absolute top-[5%] left-[-15%] w-[650px] h-[650px] rounded-full bg-blue-600/[0.08] blur-[170px]" />
          <div className="absolute top-[40%] right-[-15%] w-[600px] h-[600px] rounded-full bg-blue-600/[0.07] blur-[180px]" />
          <div className="absolute bottom-[10%] left-[5%] w-[550px] h-[550px] rounded-full bg-sky-600/[0.06] blur-[150px]" />
          <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] [background-size:24px_24px] opacity-40 pointer-events-none" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {/* Header Section */}
          <motion.header
            className="text-center max-w-3xl mx-auto mb-14"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-5 shadow-[0_0_20px_rgba(37,99,235,0.2)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              Fun & Technical Activities
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-heading drop-shadow-2xl">
              OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-blue-600">EVENTS</span>
            </h1>

            {/* Sub-Heading */}
            <p className="mt-4 text-base sm:text-lg text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
              From India&apos;s largest student hackathons to global programming challenges and hands-on workshops — discover landmark initiatives organized by IEEE DTU.
            </p>
          </motion.header>

          {/* Main Events Grid */}
          <main>
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            >
              {eventsData.map((event, index) => (
                <motion.div
                  key={event.title || index}
                  variants={itemVariants}
                  className="flex justify-center"
                >
                  <EventComponent {...event} />
                </motion.div>
              ))}
            </motion.div>
          </main>
        </div>
      </div>
    </SmoothScroll>
  );
}
