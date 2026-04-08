import {
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  getDay,
  format,
  isSameDay,
  isWithinInterval,
  isBefore,
  isAfter,
  addDays,
  subDays,
} from 'date-fns';
import { FIXED_HOLIDAYS, FLOATING_HOLIDAYS } from '../constants/monthThemes';

/**
 * Build a grid of Date objects for a given month.
 * Cells before/after the month are populated with the adjacent month dates.
 */
export function buildCalendarGrid(monthDate) {
  const start = startOfMonth(monthDate);
  const end = endOfMonth(monthDate);
  const days = eachDayOfInterval({ start, end });

  // getDay returns 0 (Sun) … 6 (Sat)
  const numLeading = getDay(start);
  const leadingPad = numLeading > 0 
    ? eachDayOfInterval({ start: subDays(start, numLeading), end: subDays(start, 1) }) 
    : [];

  const allDays = [...leadingPad, ...days];

  // Pad to complete rows of 7
  const remainder = allDays.length % 7;
  const trailingPadDays = remainder === 0 ? 0 : 7 - remainder;
  const trailingPad = trailingPadDays > 0 
    ? eachDayOfInterval({ start: addDays(end, 1), end: addDays(end, trailingPadDays) }) 
    : [];
    
  const grid = [...allDays, ...trailingPad];

  // Chunk into weeks
  const weeks = [];
  for (let i = 0; i < grid.length; i += 7) {
    weeks.push(grid.slice(i, i + 7));
  }

  // Ensure grid is 6 rows tall to prevent layout shifts
  while (weeks.length < 6) {
    const lastWeek = weeks[weeks.length - 1];
    const lastDay = lastWeek[lastWeek.length - 1];
    const extraPad = eachDayOfInterval({ start: addDays(lastDay, 1), end: addDays(lastDay, 7) });
    weeks.push(extraPad);
  }

  return weeks;
}

/**
 * Get holiday label for a date, if any.
 */
export function getHolidayLabel(date) {
  const mmdd = format(date, 'MM-dd');
  const yyyy_mm_dd = format(date, 'yyyy-MM-dd');
  return FIXED_HOLIDAYS[mmdd] || FLOATING_HOLIDAYS[yyyy_mm_dd] || null;
}

/**
 * Determine range membership for a day cell.
 * Returns one of: 'start' | 'end' | 'in-range' | 'preview' | null
 */
export function getRangeState(day, startDate, endDate, hoverDate) {
  if (!day) return null;
  if (startDate && isSameDay(day, startDate)) return 'start';
  if (endDate && isSameDay(day, endDate)) return 'end';

  if (startDate && endDate) {
    const lo = isBefore(startDate, endDate) ? startDate : endDate;
    const hi = isBefore(startDate, endDate) ? endDate : startDate;
    if (isWithinInterval(day, { start: lo, end: hi })) return 'in-range';
  }

  // Hover preview (only when one date is selected, no endDate yet)
  if (startDate && !endDate && hoverDate) {
    const lo = isBefore(startDate, hoverDate) ? startDate : hoverDate;
    const hi = isBefore(startDate, hoverDate) ? hoverDate : startDate;
    if (isAfter(day, lo) && isBefore(day, hi)) return 'preview';
  }

  return null;
}
