'use client';

import React from 'react';
import { motion } from 'framer-motion';
import EventComponent from './EventComponent';
import eventsData from './EventsData';

// Variants for staggered animations
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function Events() {
  return (
    <div className="min-h-screen bg-[#111827] text-white mt-24">
      <div className="container mx-auto pt-16">
        {/* Header with motion */}
        <motion.header
          className="text-center mb-8 pb-16"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          
        >
          <motion.p
            className="text-xl font-semibold text-blue-400 tracking-widest mb-2 font-subheading"
            variants={itemVariants}
            transition={{
            duration: 1,       // total animation time
            ease: "easeInOut",   // easing curve
            
          }}
          >
            FUN & ACTIVITIES
          </motion.p>

          <motion.h1
            className="font-heading text-4xl md:text-5xl font-semibold tracking-tight mb-4"
            variants={itemVariants}
            transition={{
            duration: 1,       // total animation time
            ease: "easeInOut",   // easing curve
           
          }}
          >
            OUR EVENTS
          </motion.h1>

          <motion.p
            className="text-xl font-semibold font-subheading text-blue-400 tracking-wider"
            variants={itemVariants}
            transition={{
            duration: 1,       // total animation time
            ease: "easeInOut",   // easing curve
            // children animate one after another
          }}
          >
            SOME OF THE EVENTS CONDUCTED BY IEEE DTU THROUGHOUT THE YEAR
       
          </motion.p>
        </motion.header>

        {/* Main Grid with Motion */}
        <main>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="flex bg-white md:mx-[10%] mx-0  rounded-md flex-wrap justify-center gap-14 p-6 pt-12"
          >
            {eventsData.map((event, index) => (
              <motion.div
                key={event.title || index}
                variants={itemVariants}
                transition={{ duration: 1, ease: 'easeOut' }}
              >
                <EventComponent {...event} />
              </motion.div>
            ))}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
