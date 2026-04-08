import { useState, useCallback } from 'react';
import { addMonths, subMonths } from 'date-fns';
import { MONTH_THEMES } from '../constants/monthThemes';

export function useCalendar() {
  const [currentMonth, setCurrentMonth] = useState(() => {
    // Start at the beginning of the current month
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });
  const [direction, setDirection] = useState('right'); // animation hint

  const goNext = useCallback(() => {
    setDirection('right');
    setCurrentMonth((m) => addMonths(m, 1));
  }, []);

  const goPrev = useCallback(() => {
    setDirection('left');
    setCurrentMonth((m) => subMonths(m, 1));
  }, []);

  const theme = MONTH_THEMES[currentMonth.getMonth()];

  return { currentMonth, direction, goNext, goPrev, theme };
}
