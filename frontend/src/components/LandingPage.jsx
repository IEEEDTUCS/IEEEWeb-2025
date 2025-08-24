import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import StyledButton from "./LandingPage/StyledButton";

export default function LandingPage() {
  const { scrollY } = useScroll();
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);
  const y = useTransform(scrollY, [0, 400], [0, -100]);

  const handleScrollDown = () => {
    const aboutSection = document.getElementById("about-section");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="w-full flex flex-col overflow-x-hidden relative">
      {/* Title */}
      <motion.section
        style={{ opacity, y }}
        className="relative h-screen w-full"
      >
        {/* Background  */}
        <motion.div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('./images/dtu.png')" }}
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{
            duration: 10,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />

        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80" />

        <motion.div
          className="relative container mx-auto flex flex-col items-start justify-center h-full px-6 md:px-12"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
        >
          <motion.h2
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1 }}
            className="text-indigo-400 text-xl md:text-2xl font-medium tracking-[0.2em] uppercase"
          >
            Welcome to
          </motion.h2>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
            className="text-white text-5xl md:text-6xl lg:text-7xl font-extrabold mt-4 leading-snug drop-shadow-lg"
          >
            IEEE DTU Student Branch
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
            className="text-indigo-300 text-lg md:text-2xl font-medium mt-4"
          >
            A World of Limitless Possibilities
          </motion.h2>

          {/* Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="flex flex-wrap gap-4 mt-10"
          >
            <StyledButton href="#form" variant="primary">
              Contact Us
            </StyledButton>
            <StyledButton onClick={handleScrollDown} variant="secondary">
              More About Us
            </StyledButton>
          </motion.div>
        </motion.div>

        {/* Scroll Down */}
        <motion.div
          onClick={handleScrollDown}
          className="absolute bottom-8 right-8 cursor-pointer p-3 rounded-full 
                     bg-white/10 backdrop-blur-md border border-white/20 
                     hover:bg-white/20 transition-all shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: [0, -10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <KeyboardArrowDownIcon className="!text-white !text-3xl" />
        </motion.div>
      </motion.section>
    </div>
  );
}


