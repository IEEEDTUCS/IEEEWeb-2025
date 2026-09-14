"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { BookOpen, ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
import "swiper/css";
import "swiper/css/navigation";

const echoes = [
  {
    title: "Echo 1.O",
    subtitle: "Inaugural Edition",
    link: "https://drive.google.com/file/d/1FXXYn6BYUEXEwRdoakvRNpoODFWLWz29/preview",
    image: "/echoes/echoes1.jpg",
  },
  {
    title: "Echo 2.O",
    subtitle: "Innovation Frontier",
    link: "https://drive.google.com/file/d/1dKqNR00hXFaOFR62Zxm40tx7U53MsHb8/preview",
    image: "/echoes/echoes2.jpg",
  },
  {
    title: "Echo 3.O",
    subtitle: "Tech Horizons",
    link: "https://drive.google.com/file/d/1j5NUIw4WbflgP3znGsNri8gF3RDPNtOj/preview",
    image: "/echoes/echoes3.jpg",
  },
  {
    title: "Echo 4.O",
    subtitle: "Empowering Minds",
    link: "https://drive.google.com/file/d/1Ihxx9r-3F841MfW7KAC8pI6UhNzUd4-_/preview",
    image: "/echoes/echoes4.jpg",
  },
  {
    title: "Echo 5.O",
    subtitle: "Future Forward",
    link: "https://drive.google.com/file/d/1hT9ceYOAZfqYOgnMZTNJYpW-H8JX0fKb/preview",
    image: "/echoes/echoes5.jpg",
  },
  {
    title: "Echo 6.O",
    subtitle: "Decade of Impact",
    link: "https://drive.google.com/file/d/14ksyQxVNlmvn-Dlejx3UxAlmt6Ph8dB1/preview",
    image: "/echoes/echoes6.jpg",
  },
];

const Echoes = () => {
  const [selectedPdf, setSelectedPdf] = useState(null);

  return (
    <section className="w-full bg-black text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 rounded-full blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-blue-400 mb-2 inline-block">
            Official Publications
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight font-heading">
            ECHO – IEEE DTU <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-blue-600">Newsletter</span>
          </h2>
          <p className="text-zinc-400 mt-4 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
            Discover ECHO, the official publication of IEEE DTU, featuring technical breakthroughs, student achievements, and deep dives into technology.
          </p>
        </motion.div>

        {/* Carousel Showcase Deck */}
        <motion.div
          initial={{ opacity: 0, scale: 0.93, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-70px" }}
          transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
          className="relative bg-zinc-950/70 border border-zinc-800/80 rounded-3xl p-6 sm:p-10 lg:p-12 backdrop-blur-xl shadow-2xl"
        >
          {/* Subtle top sheen */}
          <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent" />

          <Swiper
            modules={[Navigation]}
            navigation={{ nextEl: ".echoes-next-btn", prevEl: ".echoes-prev-btn" }}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 28 },
            }}
            className="pb-4"
          >
            {echoes.map((item, index) => (
              <SwiperSlide key={index}>
                <div
                  onClick={() => setSelectedPdf(item.link)}
                  className="cursor-pointer group relative bg-zinc-900/80 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_10px_30px_-10px_rgba(37,99,235,0.3)] hover:-translate-y-1.5"
                >
                  {/* Cover Image */}
                  <div className="relative h-72 sm:h-80 w-full overflow-hidden bg-zinc-950">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-300" />
                    
                    {/* Read badge overlay */}
                    <div className="absolute top-4 right-4 p-2 rounded-xl bg-black/60 backdrop-blur-md border border-white/10 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="w-4 h-4 text-blue-400" />
                    </div>
                  </div>

                  {/* Card Bottom Info */}
                  <div className="p-5 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-xs text-zinc-400 mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>

                    <span className="text-xs font-semibold text-blue-400 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Read <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Buttons */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              aria-label="Previous publication"
              className="echoes-prev-btn p-3 rounded-full bg-zinc-900/90 border border-zinc-700/80 text-zinc-300 hover:text-white hover:bg-zinc-800 hover:border-blue-500/50 hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-300 cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              aria-label="Next publication"
              className="echoes-next-btn p-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.4)] hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-300 cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </motion.div>
      </div>

      {/* PDF Modal */}
      {selectedPdf && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-50 p-4">
          <div className="bg-zinc-950 border border-zinc-800 w-full max-w-5xl h-[85vh] rounded-2xl shadow-2xl relative overflow-hidden flex flex-col">
            {/* Header bar */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800 bg-zinc-900/60">
              <div className="flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-blue-400" />
                <span className="text-sm font-semibold text-white">ECHO Newsletter Viewer</span>
              </div>
              <button
                onClick={() => setSelectedPdf(null)}
                className="p-1.5 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* PDF Viewer */}
            <div className="flex-1 w-full h-full bg-zinc-900">
              <iframe
                src={selectedPdf}
                title="ECHO Newsletter PDF Viewer"
                className="w-full h-full border-none"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default Echoes;