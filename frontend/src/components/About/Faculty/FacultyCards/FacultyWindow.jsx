"use client";

import React from 'react';
import { motion } from 'framer-motion';
import FacultyCard from './FacultyCard';

const facultyData = [
  {
    name: "Prof. Rahul Kataria",
    designation: "Professor, CSE Department DTU",
    details: "IEEE DTU CS Chapter Faculty Advisor",
    chapterBadge: "CS Chapter",
    badgeColor: "text-blue-400 border-blue-500/30 bg-blue-500/10",
    imageUrl: "/aboutPage/Faculty/Prof-Rahul.jpg",
  },
  {
    name: "Prof. Rachna Garg",
    designation: "Chair, IEEE Delhi Section",
    details: "IEEE DTU PES-IAS Chapter Faculty Advisor",
    chapterBadge: "PES-IAS Chapter",
    badgeColor: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
    imageUrl: "/aboutPage/Faculty/Prof-Rachna.png",
  },
  {
    name: "Dr. Sonal Singh",
    designation: "Asst Professor, ECE Department",
    details: "IEEE DTU WIE Chapter Faculty Advisor",
    chapterBadge: "WIE Chapter",
    badgeColor: "text-purple-400 border-purple-500/30 bg-purple-500/10",
    imageUrl: "/aboutPage/Faculty/Dr-Sonal.jpg",
  },
  {
    name: "Dr. Deva Nand",
    designation: "Associate Professor, ECE Department",
    details: "IEEE DTU CASS Chapter Faculty Advisor",
    chapterBadge: "CASS Chapter",
    badgeColor: "text-teal-400 border-teal-500/30 bg-teal-500/10",
    imageUrl: "/aboutPage/Faculty/dr-devanand.jpg",
  },
];

function FacultyWindow() {
  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 place-items-center">
          {facultyData.map((val, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.88, y: 40 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.7,
                delay: idx * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="w-full max-w-[300px]"
            >
              <FacultyCard {...val} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FacultyWindow;