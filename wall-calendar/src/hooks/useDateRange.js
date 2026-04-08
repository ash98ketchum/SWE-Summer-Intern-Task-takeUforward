import { useState, useCallback } from 'react';
import { isBefore } from 'date-fns';

/**
 * 3-click date range state machine:
 *  idle      → click → selecting (startDate set)
 *  selecting → click → selected  (endDate set, normalised so start ≤ end)
 *  selected  → click → idle      (reset)
 */
export function useDateRange() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [hoverDate, setHoverDate] = useState(null);
  const [phase, setPhase] = useState('idle'); // 'idle' | 'selecting' | 'selected'

  const handleDayClick = useCallback((day) => {
    if (!day) return;

    if (phase === 'idle') {
      setStartDate(day);
      setEndDate(null);
      setPhase('selecting');
    } else if (phase === 'selecting') {
      // Normalise order
      if (isBefore(day, startDate)) {
        setEndDate(startDate);
        setStartDate(day);
      } else {
        setEndDate(day);
      }
      setHoverDate(null);
      setPhase('selected');
    } else {
      // Reset
      setStartDate(null);
      setEndDate(null);
      setHoverDate(null);
      setPhase('idle');
    }
  }, [phase, startDate]);

  const handleDayHover = useCallback((day) => {
    if (phase === 'selecting') {
      setHoverDate(day);
    }
  }, [phase]);

  const reset = useCallback(() => {
    setStartDate(null);
    setEndDate(null);
    setHoverDate(null);
    setPhase('idle');
  }, []);

  return { startDate, endDate, hoverDate, phase, handleDayClick, handleDayHover, reset };
}
