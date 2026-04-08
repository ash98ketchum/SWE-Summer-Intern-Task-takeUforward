import React from 'react';
import { motion } from 'framer-motion';
import { format, isToday, isSameMonth } from 'date-fns';
import { getHolidayLabel, getRangeState } from '../utils/calendarUtils';

const DAY_LABELS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function DayCell({ day, currentMonth, startDate, endDate, hoverDate, theme, onClick, onHover, hasNote }) {
  if (!day) {
    return <div className="aspect-square" />;
  }

  const rangeState = getRangeState(day, startDate, endDate, hoverDate);
  const holiday = getHolidayLabel(day);
  const today = isToday(day);
  const dayNum = format(day, 'd');

  const isStart = rangeState === 'start';
  const isEnd = rangeState === 'end';
  const isInRange = rangeState === 'in-range';
  const isPreview = rangeState === 'preview';
  const isEdge = isStart || isEnd;
  const inCurrentMonth = isSameMonth(day, currentMonth);

  return (
    <motion.button
      onClick={() => onClick(day)}
      onMouseEnter={() => onHover(day)}
      onMouseLeave={() => onHover(null)}
      className={`
        relative aspect-square flex flex-col items-center justify-center rounded-xl
        text-sm font-medium select-none transition-colors duration-150
        focus:outline-none focus-visible:ring-2
        ${isEdge
          ? 'text-white shadow-lg scale-105 z-10'
          : isInRange
          ? 'text-white/90'
          : isPreview
          ? 'text-white/80'
          : hasNote
          ? 'text-white/90'
          : today
          ? 'text-white'
          : inCurrentMonth
          ? 'text-slate-200 hover:text-white'
          : 'text-slate-600 hover:text-slate-400'}
        ${!isEdge && !isInRange && !isPreview && !today && !hasNote ? 'hover:bg-white/10' : ''}
      `}
      style={{
        backgroundColor: isEdge
          ? theme.accent
          : isInRange
          ? `${theme.accent}33`
          : isPreview
          ? `${theme.accent}1a`
          : hasNote
          ? `${theme.accent}22`
          : today
          ? 'rgba(255,255,255,0.15)'
          : undefined,
        boxShadow: isEdge ? `0 0 18px ${theme.accent}99` : undefined,
      }}
      whileHover={{ scale: isEdge ? 1.05 : 1.08 }}
      whileTap={{ scale: 0.93 }}
      aria-label={format(day, 'MMMM d, yyyy')}
      title={holiday || undefined}
    >
      <span className="text-sm leading-none">{dayNum}</span>

      {/* Today dot */}
      {today && !isEdge && (
        <span
          className="absolute bottom-1.5 w-1 h-1 rounded-full"
          style={{ backgroundColor: theme.accent }}
        />
      )}

      {/* Note indicator line */}
      {hasNote && !isEdge && (
        <span
          className={`absolute bottom-1.5 w-3 h-0.5 rounded-full ${today ? 'mb-2' : ''}`}
          style={{ backgroundColor: theme.accent, opacity: 0.6 }}
        />
      )}

      {/* Holiday dot */}
      {holiday && !isEdge && (
        <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-rose-400 shadow-sm" />
      )}

      {/* Edge label */}
      {isEdge && (
        <span className="text-[9px] font-bold uppercase tracking-wider opacity-80 leading-none mt-0.5">
          {isStart ? 'start' : 'end'}
        </span>
      )}
    </motion.button>
  );
}
