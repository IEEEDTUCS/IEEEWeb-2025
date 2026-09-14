'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, Calendar, Sparkles, Filter, Eye, ArrowRight, Layers } from 'lucide-react';
import EventComponent from './EventComponent';
import eventsData from './EventsData';
import SmoothScroll from '../Common/SmoothScroll';

const CATEGORIES = ["All", "Hackathons", "Competitions", "Workshops", "Flagship"];

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
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedEvent, setSelectedEvent] = useState(null);

  // Close modal on ESC key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setSelectedEvent(null);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return eventsData.filter((event) => {
      const matchesCategory =
        selectedCategory === "All" || event.category === selectedCategory;
      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        !query ||
        event.title.toLowerCase().includes(query) ||
        (event.typography && event.typography.toLowerCase().includes(query)) ||
        (event.tag && event.tag.toLowerCase().includes(query)) ||
        (event.category && event.category.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Counts per category
  const categoryCounts = useMemo(() => {
    const counts = { All: eventsData.length };
    CATEGORIES.slice(1).forEach((cat) => {
      counts[cat] = eventsData.filter((e) => e.category === cat).length;
    });
    return counts;
  }, []);

  return (
    <SmoothScroll>
      <div className="relative min-h-screen bg-[#000000] text-white selection:bg-blue-600 selection:text-white pt-24 pb-28 overflow-hidden">
        {/* Global Ambient Blue Lighting Orbs (Matching Landing Page) */}
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
            {/* Pill Badge with Electric Blue Indicator */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/30 text-blue-400 text-xs font-semibold tracking-widest uppercase mb-5 shadow-[0_0_20px_rgba(37,99,235,0.2)] backdrop-blur-md">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500" />
              </span>
              Fun & Technical Activities
            </div>

            {/* Main Heading - Pure Electric Blue Gradient */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight font-heading drop-shadow-2xl">
              OUR <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-blue-600">EVENTS</span>
            </h1>

            {/* Sub-Heading */}
            <p className="mt-4 text-base sm:text-lg text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
              From India&apos;s largest student hackathons to global programming challenges and hands-on workshops — discover landmark initiatives organized by IEEE DTU.
            </p>
          </motion.header>

          {/* Interactive Filters & Search Toolbar */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col md:flex-row items-center justify-between gap-5 mb-10 p-2.5 rounded-2xl bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-xl shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
          >
            {/* Category Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
              {CATEGORIES.map((cat) => {
                const isActive = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold tracking-wide whitespace-nowrap transition-all duration-300 ${
                      isActive
                        ? "text-white bg-gradient-to-r from-blue-600 to-blue-700 shadow-[0_0_20px_rgba(37,99,235,0.4)] border border-blue-400/40"
                        : "text-zinc-400 hover:text-white hover:bg-zinc-900/60 border border-transparent"
                    }`}
                  >
                    {cat}
                    <span
                      className={`ml-1.5 text-[11px] px-1.5 py-0.5 rounded-full ${
                        isActive
                          ? "bg-white/20 text-white"
                          : "bg-zinc-800/80 text-zinc-400"
                      }`}
                    >
                      {categoryCounts[cat] || 0}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Search Input Bar */}
            <div className="relative w-full md:w-72 flex-shrink-0">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search events, topics..."
                className="w-full pl-10 pr-9 py-2 rounded-xl bg-zinc-900/80 border border-zinc-800/80 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/60 focus:ring-1 focus:ring-blue-500/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>

          {/* Results Info Counter */}
          <div className="flex items-center justify-between px-2 mb-6 text-xs text-zinc-500">
            <span>
              Showing <strong className="text-zinc-300">{filteredEvents.length}</strong> of{" "}
              {eventsData.length} events
            </span>
            {selectedCategory !== "All" && (
              <span className="text-blue-400">
                Filtered by: <strong>{selectedCategory}</strong>
              </span>
            )}
          </div>

          {/* Main Events Grid */}
          <main>
            {filteredEvents.length === 0 ? (
              <div className="py-24 text-center rounded-3xl bg-zinc-950/50 border border-zinc-800/60 backdrop-blur-md">
                <Filter className="w-12 h-12 mx-auto text-zinc-600 mb-4" />
                <h3 className="text-xl font-bold text-zinc-300">No events found</h3>
                <p className="text-sm text-zinc-500 mt-2 max-w-sm mx-auto">
                  No events match &quot;{searchQuery}&quot;. Try adjusting your search query or selecting a different category.
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                  }}
                  className="mt-6 px-5 py-2 rounded-xl text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 transition-colors"
                >
                  Clear all filters
                </button>
              </div>
            ) : (
              <motion.div
                key={`${selectedCategory}-${searchQuery}`}
                initial="hidden"
                animate="visible"
                variants={containerVariants}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
              >
                {filteredEvents.map((event, index) => (
                  <motion.div
                    key={event.title || index}
                    variants={itemVariants}
                    className="flex justify-center"
                  >
                    <EventComponent {...event} onSelect={setSelectedEvent} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </main>
        </div>

        {/* High-Resolution Event Poster Lightbox Modal */}
        <AnimatePresence>
          {selectedEvent && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedEvent(null)}
                className="fixed inset-0 bg-black/85 backdrop-blur-xl"
              />

              {/* Modal Box */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                className="relative z-10 w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-zinc-950 border border-zinc-800 shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_35px_rgba(37,99,235,0.25)] overflow-hidden"
              >
                {/* Modal Header */}
                <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800/80 bg-zinc-950/90">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-blue-600/20 text-blue-400 border border-blue-500/30 uppercase tracking-wide">
                      {selectedEvent.category}
                    </span>
                    {selectedEvent.tag && (
                      <span className="text-xs text-zinc-400">
                        • {selectedEvent.tag}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="p-1.5 text-zinc-400 hover:text-white rounded-lg hover:bg-zinc-900 transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Poster Display Area */}
                <div className="relative flex-1 min-h-[300px] max-h-[60vh] bg-black/80 flex items-center justify-center p-4 overflow-hidden">
                  <img
                    src={selectedEvent.image}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-3xl opacity-30 pointer-events-none scale-125"
                  />
                  <img
                    src={selectedEvent.image}
                    alt={selectedEvent.title}
                    className="relative z-10 max-h-[55vh] max-w-full object-contain rounded-xl drop-shadow-2xl"
                  />
                </div>

                {/* Modal Details Footer */}
                <div className="p-6 bg-zinc-950 border-t border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <h3 className="text-2xl font-extrabold text-white font-heading">
                      {selectedEvent.title}
                    </h3>
                    <p className="text-sm text-zinc-400 mt-1">
                      {selectedEvent.typography}
                    </p>
                  </div>

                  <button
                    onClick={() => setSelectedEvent(null)}
                    className="px-5 py-2.5 rounded-xl text-xs font-bold text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 shadow-[0_0_20px_rgba(37,99,235,0.3)] border border-blue-500/30 transition-all flex items-center gap-2 flex-shrink-0"
                  >
                    Close Poster
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </SmoothScroll>
  );
}
