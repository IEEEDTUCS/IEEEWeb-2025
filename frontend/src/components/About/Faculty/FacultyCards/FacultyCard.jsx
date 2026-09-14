"use client";

import React from 'react';

function FacultyCard({ name, designation, details, chapterBadge, badgeColor, imageUrl }) {
  return (
    <div className="flex flex-col items-center justify-between text-center h-[430px] w-full rounded-2xl bg-zinc-950/70 border border-zinc-800/90 p-6 shadow-xl backdrop-blur-xl transition-all duration-500 hover:border-blue-500/40 hover:shadow-[0_15px_35px_-10px_rgba(59,130,246,0.25)] hover:-translate-y-2 group relative overflow-hidden">
      {/* Top subtle sheen */}
      <div className="absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-blue-400/30 transition-all duration-500" />

      {/* Image Section */}
      <div className="relative overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 p-1.5 transition-all duration-500 group-hover:border-zinc-700 flex-shrink-0">
        <img
          src={imageUrl}
          alt={`Profile picture of ${name}`}
          className="h-44 w-36 sm:h-48 sm:w-40 object-cover rounded-xl transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-xl pointer-events-none" />
      </div>

      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-center space-y-2.5 pt-4 w-full">
        {chapterBadge && (
          <span className={`inline-block mx-auto px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${badgeColor}`}>
            {chapterBadge}
          </span>
        )}

        <h3 className="font-bold text-white text-base sm:text-lg tracking-tight group-hover:text-blue-300 transition-colors duration-300">
          {name}
        </h3>

        <p className="text-blue-400 font-medium text-xs tracking-wide">
          {designation}
        </p>

        <p className="text-xs leading-relaxed text-zinc-400 font-normal">
          {details}
        </p>
      </div>
    </div>
  );
}

export default FacultyCard;