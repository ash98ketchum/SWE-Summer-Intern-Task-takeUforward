import React from 'react';
import { format } from 'date-fns';
import DayCell from './DayCell';
import { buildCalendarGrid } from '../utils/calendarUtils';

const WEEKDAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];


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
      <div key={format(currentMonth, 'yyyy-MM')}>
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
      </div>

      {/* Range summary badge */}
      {startDate && (
        <div className="mt-3 px-3 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 flex-wrap">
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
        </div>
      )}
    </div>
  );
}
