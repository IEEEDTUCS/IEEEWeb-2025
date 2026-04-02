import React from 'react';
import { motion } from 'framer-motion';
import BranchCounsellor from './FacultyCards/BranchCounsller';
import FacultyWindow from './FacultyCards/FacultyWindow';

export default function Faculty() {
  return (
    <section className="w-full bg-black py-16 px-4 sm:px-6 lg:px-8 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col gap-y-16">
        
        {/* --- HEADER SECTION --- 
            Fades in and slides slightly down when scrolled into view 
        */}
        <motion.div 
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex flex-col items-center justify-center text-center space-y-4"
        >
          <p className="text-blue-500 font-semibold tracking-[0.2em] uppercase text-sm md:text-base">
            Support System
          </p>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
            Meet Our <br className="md:hidden" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
              Faculty Advisors
            </span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full mt-6"></div>
        </motion.div>

        {/* --- BRANCH COUNSELLOR SECTION --- 
            Gently scales up from 90% to 100% 
        */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="w-full flex justify-center items-center"
        >
          <div className="w-full max-w-4xl relative">
            {/* Subtle glow behind the main counsellor */}
            <div className="absolute inset-0 bg-blue-500/5 blur-3xl rounded-full -z-10"></div>
            <BranchCounsellor />
          </div>
        </motion.div>

        {/* --- OTHER FACULTY SECTION --- 
            Slides up from the bottom 
        */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, delay: 0.4, ease: "easeOut" }}
          className="w-full"
        >
          <div className="flex flex-wrap justify-center items-stretch gap-6 md:gap-8">
            <FacultyWindow />
          </div>
        </motion.div>

      </div>
    </section>
  );
}