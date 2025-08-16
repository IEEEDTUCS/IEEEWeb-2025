import * as React from "react";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { motion } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown"; // Scroll arrow icon

const MotionButton = motion(Button);

export default function LandingPage() {
  // Function for smooth scrolling
  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  return (
    <div className="w-full flex flex-col overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative h-screen w-full">
        {/* Background Image */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('./images/dtu.png')" }}
          initial={{ scale: 1 }}
          animate={{ scale: 1.05 }}
          transition={{ duration: 8, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
        />

        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

        {/* Content */}
        <motion.div
          className="relative container mx-auto flex flex-col items-start justify-center h-full px-6 md:px-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.h2
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="text-indigo-400 text-2xl md:text-3xl font-semibold tracking-widest uppercase"
          >
            Welcome to
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="text-white text-5xl md:text-6xl lg:text-7xl font-bold mt-4 leading-snug drop-shadow-lg"
          >
            IEEE DTU Student Branch
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="text-indigo-300 text-2xl md:text-3xl font-semibold mt-4 "
          >
            A World of Limitless Possibilities
          </motion.h2>

          {/* Buttons */}
          <Stack direction="row" spacing={3} className="mt-10">
            <MotionButton
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.07, boxShadow: "0px 8px 25px rgba(99,102,241,0.6)" }}
              variant="contained"
              href="#"
              className="!bg-indigo-600 !text-white !px-6 !py-3 !rounded-xl !text-lg font-semibold shadow-md hover:!bg-indigo-700 transition-all duration-300"
            >
              Contact Us
            </MotionButton>

            <MotionButton
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.07, boxShadow: "0px 8px 25px rgba(129,140,248,0.6)" }}
              variant="outlined"
              href="#"
              className="!border-2 !border-indigo-400 !text-indigo-300 !px-6 !py-3 !rounded-xl !text-lg font-semibold hover:!bg-indigo-500 hover:!text-white transition-all duration-300"
            >
              More About Us
            </MotionButton>
          </Stack>
        </motion.div>

        {/* Scroll Arrow */}
        <motion.div
          onClick={handleScrollDown}
          className="absolute bottom-8 right-8 cursor-pointer p-3 rounded-full bg-indigo-600/80 hover:bg-indigo-500 transition-all"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <KeyboardArrowDownIcon className="!text-white !text-3xl" />
        </motion.div>
      </section>
    </div>
  );
}

