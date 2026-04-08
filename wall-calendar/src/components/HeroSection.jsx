import React, { useState } from 'react';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight, Calendar, Pin } from 'lucide-react';

export default function HeroSection({ theme, currentMonth, onPrev, onNext }) {
  const [imgLoaded, setImgLoaded] = useState(false);

  return (
    <div className="relative w-full h-72 md:h-80 lg:h-96 overflow-hidden rounded-t-2xl flex-shrink-0">
      {/* Background image */}
      <img
        key={theme.imageUrl}
        src={theme.imageUrl}
        alt={theme.name}
        onLoad={() => setImgLoaded(true)}
        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
          imgLoaded ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Gradient overlay */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${theme.gradient} opacity-80`}
      />

      {/* Pin decoration */}
      <div className="absolute top-3 left-1/2 -translate-x-1/2 flex gap-16 z-20">
        {[0, 1].map((i) => (
          <div key={i} className="flex flex-col items-center">
            <div
              className="w-4 h-4 rounded-full border-2 border-white/60 shadow-lg"
              style={{ backgroundColor: theme.accent }}
            />
            <div className="w-0.5 h-5 bg-white/30" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-end p-6 md:p-8">
        <div
          key={currentMonth.toISOString()}
        >
          <p
            className="text-xs font-semibold uppercase tracking-[0.25em] mb-1"
            style={{ color: theme.accent }}
          >
            {theme.tagline}
          </p>
          <h1 className="font-display text-4xl md:text-5xl font-bold text-white drop-shadow-lg">
            {format(currentMonth, 'MMMM')}
          </h1>
          <p className="text-xl text-white/70 font-light mt-0.5">
            {format(currentMonth, 'yyyy')}
          </p>
        </div>

        {/* Navigation */}
        <div className="flex gap-2 mt-4">
          <button
            onClick={onPrev}
            aria-label="Previous month"
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={onNext}
            aria-label="Next month"
            className="p-2.5 rounded-xl bg-white/10 hover:bg-white/25 backdrop-blur-sm border border-white/20 text-white transition-all duration-200 hover:scale-105 active:scale-95"
          >
            <ChevronRight size={18} />
          </button>
          <div className="ml-auto flex items-center gap-2 px-3 py-2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20">
            <Calendar size={14} className="text-white/70" />
            <span className="text-white/70 text-xs font-medium">
              {format(currentMonth, 'MMM yyyy')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
