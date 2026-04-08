import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { format } from 'date-fns';
import DayCell from './DayCell';
import { buildCalendarGrid } from '../utils/calendarUtils';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const slideVariants = {
  enterRight: { opacity: 0, x: 80 },
  enterLeft:  { opacity: 0, x: -80 },
  center:     { opacity: 1, x: 0 },
  exitRight:  { opacity: 0, x: -80 },
  exitLeft:   { opacity: 0, x: 80 },
};

export default function CalendarGrid({
  currentMonth,
  direction,
  startDate,
  endDate,
  hoverDate,
  theme,
  onDayClick,
  onDayHover,
  getNote,
}) {
  const weeks = buildCalendarGrid(currentMonth);

  return (
    <div className="flex-1 px-4 pb-4 pt-3 overflow-hidden">
      {/* Weekday headers */}
      <div className="grid grid-cols-7 mb-2">
        {WEEKDAYS.map((d, i) => (
          <div
            key={d}
            className={`text-center text-xs font-semibold uppercase tracking-wider py-1 ${
              i === 0 || i === 6 ? 'text-slate-500' : 'text-slate-400'
            }`}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Month grid with slide transition */}
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={format(currentMonth, 'yyyy-MM')}
          variants={slideVariants}
          initial={direction === 'right' ? 'enterRight' : 'enterLeft'}
          animate="center"
          exit={direction === 'right' ? 'exitRight' : 'exitLeft'}
          transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
        >
          {weeks.map((week, wi) => (
            <div key={wi} className="grid grid-cols-7 gap-0.5 mb-0.5">
              {week.map((day, di) => (
                <DayCell
                  key={day ? format(day, 'yyyy-MM-dd') : `empty-${wi}-${di}`}
                  day={day}
                  currentMonth={currentMonth}
                  startDate={startDate}
                  endDate={endDate}
                  hoverDate={hoverDate}
                  theme={theme}
                  onClick={onDayClick}
                  onHover={onDayHover}
                  hasNote={!!(day && getNote(day))}
                />
              ))}
            </div>
          ))}
        </motion.div>
      </AnimatePresence>

      {/* Range summary badge */}
      <AnimatePresence>
        {startDate && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.2 }}
            className="mt-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 flex-wrap"
          >
            <span
              className="w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: theme.accent }}
            />
            <span className="text-xs text-slate-300">
              {endDate
                ? `${format(startDate, 'MMM d')} – ${format(endDate, 'MMM d, yyyy')}`
                : `From ${format(startDate, 'MMM d, yyyy')} — pick end date`}
            </span>
            {endDate && (
              <span className="text-xs text-slate-500 ml-auto">
                Click any date to reset
              </span>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
