"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Cpu, Zap, HeartHandshake, Layers } from 'lucide-react';

const CHAPTERS_DATA = [
  {
    id: "cs",
    badge: "Computer Society",
    icon: <Cpu className="w-4 h-4 text-blue-400" />,
    title: "IEEE DTU CS CHAPTER",
    themeColor: "from-blue-500 to-cyan-500",
    glowColor: "rgba(59, 130, 246, 0.2)",
    borderColor: "group-hover:border-blue-500/50",
    logoBg: "bg-white/[0.05] border-blue-500/20",
    image: "/aboutPage/aboutChapterSection/CS_IEEE.png",
    imageAlt: "IEEE Computer Society Logo",
    description:
      "The IEEE Computer Society is the premier source for information, inspiration, and collaboration in Computer Science and Engineering. IEEE DTU CS has established a formidable presence in AI/ML, systems, cybersecurity, and software development, organizing world-renowned flagship events like Microhacks, IEEEXtreme, Vihaan, and Bulls N' Bears.",
    link: "/IEEEDTU/Chapters/CS",
    tags: ["Artificial Intelligence", "Competitive Coding", "Microhacks", "Vihaan Hackathon"],
  },
  {
    id: "pes",
    badge: "Power & Energy Society",
    icon: <Zap className="w-4 h-4 text-emerald-400" />,
    title: "IEEE DTU PES-IAS CHAPTER",
    themeColor: "from-emerald-500 to-teal-400",
    glowColor: "rgba(16, 185, 129, 0.2)",
    borderColor: "group-hover:border-emerald-500/50",
    logoBg: "bg-white/95 border-emerald-500/30",
    image: "/aboutPage/aboutChapterSection/PES_IEEE.png",
    imageAlt: "IEEE PES Logo",
    description:
      "The Power & Energy Society provides the world's largest forum for sharing technological advancements in electric power, clean renewable energy, smart grids, and electric mobility. IEEE DTU PES-IAS empowers future leaders with hands-on industrial visits, energy hackathons, research symposiums, and professional networking.",
    link: "/IEEEDTU/Chapters/PES-IAS",
    tags: ["Renewable Energy", "Smart Grids", "EV Tech", "Industrial Symposia"],
  },
  {
    id: "wie",
    badge: "Women in Engineering",
    icon: <HeartHandshake className="w-4 h-4 text-purple-400" />,
    title: "IEEE DTU WIE CHAPTER",
    themeColor: "from-purple-500 to-pink-500",
    glowColor: "rgba(168, 85, 247, 0.2)",
    borderColor: "group-hover:border-purple-500/50",
    logoBg: "bg-white/[0.05] border-purple-500/20",
    image: "/aboutPage/aboutChapterSection/WIE_IEEE.png",
    imageAlt: "IEEE WIE Logo",
    description:
      "Women in Engineering (WIE) is a vibrant global network devoted to promoting the advancement and retention of women in STEM disciplines. IEEE DTU WIE fosters an inclusive, supportive ecosystem through leadership summits, mentorship cohorts, tech bootcamps, and impactful social initiatives.",
    link: "/IEEEDTU/Chapters/WIE",
    tags: ["Diversity in STEM", "Leadership Summits", "Mentorship", "Skill Bootcamps"],
  },
  {
    id: "cass",
    badge: "Circuits & Systems",
    icon: <Layers className="w-4 h-4 text-teal-400" />,
    title: "IEEE DTU CASS CHAPTER",
    themeColor: "from-teal-400 to-cyan-400",
    glowColor: "rgba(20, 184, 166, 0.2)",
    borderColor: "group-hover:border-teal-500/50",
    logoBg: "bg-white/95 border-teal-500/30",
    image: "/aboutPage/aboutChapterSection/CASS_IEEE.png",
    imageAlt: "IEEE CASS Logo",
    description:
      "The IEEE Circuits and Systems Society focuses on advancing circuits, VLSI hardware architecture, signal processing, and embedded systems. IEEE DTU CASS provides students a direct pathway into silicon hardware engineering through FPGA workshops, circuit design competitions, and semiconductor research mentorship.",
    link: "/IEEEDTU/Chapters/CASS",
    tags: ["VLSI Design", "Embedded Systems", "FPGA & IoT", "Hardware Hackathons"],
  },
];

export default function Chapter() {
  return (
    <div className="w-full bg-black text-white py-16 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-[140px] pointer-events-none" />

      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="text-center max-w-3xl mx-auto mb-20 relative z-10"
      >
        <span className="text-xs uppercase tracking-[0.3em] font-semibold text-blue-400 mb-3 inline-block">
          Technical Domains
        </span>
        <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
          Our Specialized <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 via-blue-400 to-blue-600">Chapters</span>
        </h2>
        <p className="text-zinc-400 text-base sm:text-lg leading-relaxed">
          Four dedicated pillars driving cutting-edge research, hands-on development, and professional excellence at Delhi Technological University.
        </p>
      </motion.div>

      {/* Chapters Showcase */}
      <div className="max-w-7xl mx-auto space-y-16 lg:space-y-24 relative z-10">
        {CHAPTERS_DATA.map((chapter, idx) => {
          const isEven = idx % 2 === 0;

          return (
            <motion.div
              key={chapter.id}
              id={chapter.id}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl p-6 sm:p-10 lg:p-14 bg-zinc-950/70 border border-zinc-800/80 backdrop-blur-xl transition-all duration-500 hover:border-zinc-700"
              style={{
                boxShadow: `0 20px 60px -20px ${chapter.glowColor}`,
              }}
            >
              {/* Subtle inner top highlight */}
              <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent" />

              <div
                className={`flex flex-col ${
                  isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                } items-center gap-10 lg:gap-16`}
              >
                {/* Logo / Visual Showcase Pod */}
                <motion.div
                  whileHover={{ scale: 1.03 }}
                  transition={{ duration: 0.4 }}
                  className="w-full lg:w-1/2 flex justify-center items-center"
                >
                  <div
                    className={`relative w-full max-w-md h-64 sm:h-80 rounded-2xl flex items-center justify-center p-8 transition-all duration-500 ${chapter.logoBg} shadow-xl`}
                  >
                    <img
                      src={chapter.image}
                      alt={chapter.imageAlt}
                      className="max-h-full max-w-full object-contain filter drop-shadow-md transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </motion.div>

                {/* Content Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-center space-y-5 text-left">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider uppercase bg-zinc-900 border border-zinc-800 w-fit">
                    {chapter.icon}
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${chapter.themeColor}`}>
                      {chapter.badge}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white font-heading">
                    {chapter.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-300 text-sm sm:text-base leading-relaxed font-sans">
                    {chapter.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {chapter.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs rounded-lg bg-zinc-900/90 text-zinc-400 border border-zinc-800"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* CTA Button */}
                  <div className="pt-4">
                    <a
                      href={chapter.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-zinc-800 to-zinc-900 border border-zinc-700 hover:border-zinc-500 hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 group/btn no-underline"
                    >
                      <span>Explore Chapter</span>
                      <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}