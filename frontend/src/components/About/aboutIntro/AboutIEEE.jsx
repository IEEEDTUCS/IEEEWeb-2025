"use client";

import React from 'react';
import { motion } from 'framer-motion';
import Slideshow from './Slideshow';
import Stats from './Stats';
import WhatsAppButton from '@/utils/WhatsAppButton';

export default function AboutIEEE() {
  return (
    <div className="min-h-screen bg-black px-4 sm:px-6 lg:px-8 py-16 relative overflow-hidden">
      {/* Ambient background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Heading Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mb-16 relative z-10"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-blue-400 mb-3 inline-block">
          Heritage & Vision
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight font-heading mb-4">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-blue-600">IEEE DTU</span>
        </h2>
        <div className="w-24 h-1 bg-gradient-to-r from-sky-400 to-blue-600 mx-auto rounded-full shadow-[0_0_12px_rgba(37,99,235,0.5)]"></div>
      </motion.div>
      
      {/* Main Content */}
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="w-full mb-12 lg:mb-0">
          <div className="lg:flex lg:gap-12 items-center">
            {/* Text Section */}
            <motion.div
              initial={{ opacity: 0, x: -30, scale: 0.95 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="w-full lg:w-3/5"
            >
              <div className="space-y-4 text-base leading-relaxed text-zinc-300 tracking-[0.02rem] font-sans">
                <p>
                  <span className="text-white font-bold">IEEE DTU Student Branch</span>, established in <span className="text-blue-400 font-bold">1983</span>, 
                  is the <span className="text-white font-bold">oldest and largest society</span> at Delhi Technological University. 
                  With a history spanning over <span className="text-white font-bold">four decades</span>, it has grown into one of the most 
                  vibrant and pioneering student technical organizations on campus.
                </p>

                <p>
                  Under the distinguished guidance of <span className="text-white font-semibold">Dr. J. Panda</span>, IEEE DTU organizes 
                  flagship hackathons, technical conferences, and workshops throughout the year, empowering students with cutting-edge technology and fostering multidisciplinary collaboration.
                </p>

                <p>
                  IEEE DTU is driven by <span className="text-white font-semibold">four specialized chapters</span> — 
                  <span className="text-blue-400"> Computer Society (CS)</span>, <span className="text-purple-400"> Women in Engineering (WIE)</span>, <span className="text-emerald-400"> Power & Energy Society (PES-IAS)</span>, and <span className="text-teal-400"> Circuits & Systems Society (CASS)</span>. 
                  In addition, our esteemed publications — <span className="text-white font-bold">ECHO, IOTA, TRIGGER, and The Troika Times</span> — 
                  provide students an expansive platform to showcase technical research and creativity.
                </p>

                <p>
                  A strong mentoring network connects students directly with senior mentors and illustrious alumni at global tech giants including 
                  <span className="text-white font-semibold"> Microsoft</span>, <span className="text-white font-semibold">Google</span>, and <span className="text-white font-semibold">Amazon</span>.
                </p>

                <p>
                  With an unwavering commitment to innovation and leadership, <span className="text-white font-semibold">IEEE DTU</span> continues to shape world-class engineers, inventors, and changemakers.
                </p>
              </div>
            </motion.div>
            
            {/* Slideshow Section - Desktop */}
            <motion.div
              initial={{ opacity: 0, x: 30, scale: 0.92 }}
              whileInView={{ opacity: 1, x: 0, scale: 1 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block lg:w-2/5"
            >
              <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-zinc-800 bg-zinc-950/60 p-3 backdrop-blur-xl hover:border-blue-500/40 transition-all duration-500 group">
                <div className="rounded-2xl overflow-hidden h-[400px] relative">
                  <div className="w-full h-full">
                    <Slideshow />
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Mobile Slideshow */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8 }}
          className="block lg:hidden mb-16"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/20 border border-zinc-800 bg-zinc-950/60 p-3 backdrop-blur-xl">
            <div className="rounded-2xl overflow-hidden h-64 sm:h-80 md:h-96 relative">
              <div className="w-full h-full">
                <Slideshow />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      
      {/* Stats Section */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 relative z-10"
      >
        <Stats />
      </motion.div>

      {/* WhatsApp + Join Us CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="mt-10 mb-8 flex flex-col sm:flex-row justify-center items-center gap-4 relative z-10"
      >
        <WhatsAppButton style={{ maxWidth: 260 }} />
        <a
          href="/IEEEDTU/join-us"
          className="inline-flex items-center justify-center gap-2 w-full max-w-[260px] py-3.5 px-7 rounded-xl text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-[0_4px_20px_rgba(37,99,235,0.45)] hover:shadow-[0_6px_28px_rgba(37,99,235,0.65)] hover:-translate-y-0.5 transition-all duration-300 no-underline"
        >
          Join Us →
        </a>
      </motion.div>
    </div>
  );
}