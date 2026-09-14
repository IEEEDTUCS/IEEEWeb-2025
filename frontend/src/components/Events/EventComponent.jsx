'use client';

import React from 'react';
import { ChevronRight, Calendar, Sparkles } from 'lucide-react';

export default function EventComponent({
  title,
  subheader,
  category = "Event",
  tag,
  image,
  typography,
  onSelect
}) {
  return (
    <div
      onClick={() => onSelect && onSelect({ title, subheader, category, tag, image, typography })}
      className="group relative flex flex-col h-[460px] w-full rounded-2xl bg-zinc-950/70 border border-zinc-800/80 hover:border-blue-500/50 transition-all duration-300 backdrop-blur-md overflow-hidden hover:shadow-[0_15px_45px_rgba(0,0,0,0.85),0_0_25px_rgba(37,99,235,0.25)] cursor-pointer active:scale-[0.99]"
    >
      {/* Top Poster Image Container - Guaranteed Uniform Aspect & Visibility */}
      <div className="relative h-[250px] w-full overflow-hidden bg-zinc-950/90 flex items-center justify-center p-3 border-b border-zinc-800/50">
        {/* Ambient Blurred Aura Behind Poster */}
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover blur-2xl opacity-35 scale-110 pointer-events-none transition-opacity duration-500 group-hover:opacity-50"
        />

        {/* Crisp Contained Foreground Poster - 100% visible, never awkwardly cropped */}
        <img
          src={image}
          alt={title}
          loading="lazy"
          className="relative z-10 max-h-full max-w-full object-contain drop-shadow-xl rounded-lg transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Category Badge */}
        <span className="absolute top-3 left-3 z-20 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold tracking-wider uppercase bg-black/70 backdrop-blur-md border border-blue-500/30 text-blue-400 shadow-md">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
          {category}
        </span>

        {/* Tag Badge */}
        {tag && (
          <span className="absolute top-3 right-3 z-20 px-2.5 py-1 rounded-full text-[11px] font-medium bg-zinc-900/80 backdrop-blur-md border border-white/10 text-zinc-300 shadow-md">
            {tag}
          </span>
        )}
      </div>

      {/* Card Body - Standardized Fixed Height */}
      <div className="flex-1 flex flex-col justify-between p-5 bg-gradient-to-b from-zinc-950/40 via-zinc-950/70 to-zinc-950/90">
        <div>
          {/* Title */}
          <h3 className="text-xl font-extrabold text-white group-hover:text-blue-400 transition-colors line-clamp-1 font-heading">
            {title}
          </h3>

          {/* Description */}
          <p className="text-zinc-400 text-sm line-clamp-2 mt-2 leading-relaxed min-h-[2.5rem]">
            {typography}
          </p>
        </div>

        {/* Action Row */}
        <div className="pt-3 border-t border-zinc-800/60 flex items-center justify-between mt-auto">
          <span className="text-xs font-semibold text-blue-400 group-hover:text-blue-300 flex items-center gap-1.5 transition-colors">
            View Poster & Details
            <ChevronRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
          </span>

          <span className="text-[11px] text-zinc-500 font-mono tracking-tight uppercase">
            IEEE DTU
          </span>
        </div>
      </div>
    </div>
  );
}
