import { useState, useCallback, useEffect } from 'react';
import { format, eachDayOfInterval, isBefore } from 'date-fns';

const STORAGE_KEY_PREFIX = 'wall_calendar_notes_';

/**
 * Per-date notes backed by localStorage.
 * Notes are stored as: { [dateKey]: { text, savedAt } }
 * where dateKey = 'YYYY-MM-DD'
 */
export function useNotes() {
  const [notesMap, setNotesMap] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY_PREFIX + 'map');
      return raw ? JSON.parse(raw) : {};
    } catch {
      return {};
    }
  });

  // Persist on every change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_PREFIX + 'map', JSON.stringify(notesMap));
    } catch {
      // quota exceeded – silently ignore
    }
  }, [notesMap]);

  const getNote = useCallback((date) => {
    if (!date) return '';
    const key = format(date, 'yyyy-MM-dd');
    return notesMap[key]?.text ?? '';
  }, [notesMap]);

  const saveNote = useCallback((startDate, endDate, text) => {
    if (!startDate && !endDate) return;
    
    const start = startDate || endDate;
    const end = endDate || startDate;
    
    // Support multi-day events
    const days = eachDayOfInterval({ 
      start: isBefore(start, end) ? start : end, 
      end: isBefore(start, end) ? end : start 
    });

    setNotesMap((prev) => {
      const next = { ...prev };
      const savedAt = new Date().toISOString();
      days.forEach(day => {
        const key = format(day, 'yyyy-MM-dd');
        next[key] = { text, savedAt };
      });
      return next;
    });
  }, []);

  const deleteNote = useCallback((startDate, endDate) => {
    if (!startDate && !endDate) return;
    
    const start = startDate || endDate;
    const end = endDate || startDate;

    const days = eachDayOfInterval({ 
      start: isBefore(start, end) ? start : end, 
      end: isBefore(start, end) ? end : start 
    });

    setNotesMap((prev) => {
      const next = { ...prev };
      days.forEach(day => {
        const key = format(day, 'yyyy-MM-dd');
        delete next[key];
      });
      return next;
    });
  }, []);

  /**
   * Get all notes for a given month (YYYY-MM).
   * Returns an array of { dateKey, text, savedAt }
   */
  const getMonthNotes = useCallback((monthDate) => {
    const prefix = format(monthDate, 'yyyy-MM');
    return Object.entries(notesMap)
      .filter(([k]) => k.startsWith(prefix))
      .map(([k, v]) => ({ dateKey: k, ...v }))
      .sort((a, b) => a.dateKey.localeCompare(b.dateKey));
  }, [notesMap]);

  return { getNote, saveNote, deleteNote, getMonthNotes, notesMap };
}
