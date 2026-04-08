import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { format } from 'date-fns';
import { StickyNote, Trash2, Save, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

export default function NotesPanel({
  startDate,
  endDate,
  currentMonth,
  getNote,
  saveNote,
  deleteNote,
  getMonthNotes,
  theme,
}) {
  const selectedDate = endDate ?? startDate ?? null;
  const [draft, setDraft] = useState('');
  const [saved, setSaved] = useState(false);
  const [showMonthNotes, setShowMonthNotes] = useState(false);
  const textareaRef = useRef(null);

  // Sync draft with selected date's stored note
  useEffect(() => {
    setDraft(getNote(selectedDate) ?? '');
    setSaved(false);
  }, [selectedDate, getNote]);

  const handleSave = () => {
    if (!startDate && !endDate && !selectedDate) return;
    if (draft.trim()) {
      saveNote(startDate, endDate, draft.trim());
    } else {
      deleteNote(startDate, endDate);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleDelete = () => {
    if (!startDate && !endDate && !selectedDate) return;
    deleteNote(startDate, endDate);
    setDraft('');
  };

  const monthNotes = getMonthNotes(currentMonth);

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <div
          className="p-2 rounded-lg"
          style={{ backgroundColor: `${theme.accent}22` }}
        >
          <StickyNote size={16} style={{ color: theme.accent }} />
        </div>
        <div>
          <h2 className="text-sm font-semibold text-white">Notes</h2>
          <p className="text-xs text-slate-500">
            {startDate && endDate 
              ? `${format(startDate, 'MMM d')} – ${format(endDate, 'MMM d, yyyy')}` 
              : selectedDate 
              ? format(selectedDate, 'MMM d, yyyy') 
              : 'Select a date or range'}
          </p>
        </div>
      </div>

      {/* Note editor */}
      <AnimatePresence mode="wait">
        {selectedDate ? (
          <motion.div
            key={format(selectedDate, 'yyyy-MM-dd')}
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -12 }}
            transition={{ duration: 0.2 }}
            className="flex flex-col gap-2 flex-shrink-0"
          >
            <textarea
              ref={textareaRef}
              value={draft}
              onChange={(e) => { setDraft(e.target.value); setSaved(false); }}
              onKeyDown={(e) => {
                if ((e.ctrlKey || e.metaKey) && e.key === 's') {
                  e.preventDefault();
                  handleSave();
                }
              }}
              placeholder={`Add a note for ${format(selectedDate, 'MMM d')}…`}
              rows={4}
              className="w-full resize-none rounded-xl bg-white/5 border border-white/10 px-3 py-2.5
                         text-sm text-slate-200 placeholder-slate-600 focus:outline-none
                         focus:border-opacity-60 focus:ring-1 transition-all duration-200"
              style={{ '--tw-ring-color': theme.accent, borderColor: draft ? `${theme.accent}44` : undefined }}
            />
            <div className="flex gap-2">
              <button
                onClick={handleSave}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl text-xs font-semibold
                           transition-all duration-200 hover:brightness-110 active:scale-95"
                style={{ backgroundColor: theme.accent, color: '#111' }}
              >
                <Save size={13} />
                {saved ? 'Saved!' : 'Save'}
              </button>
              {getNote(selectedDate) && (
                <button
                  onClick={handleDelete}
                  className="p-2 rounded-xl bg-white/5 hover:bg-rose-500/20 border border-white/10
                             text-slate-500 hover:text-rose-400 transition-all duration-200"
                >
                  <Trash2 size={13} />
                </button>
              )}
            </div>
            <p className="text-[10px] text-slate-600 text-center">Ctrl+S to save</p>
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center py-6 text-center"
          >
            <AlertCircle size={20} className="text-slate-600 mb-2" />
            <p className="text-xs text-slate-600">Click a date to add a note</p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Separator */}
      <div className="my-4 border-t border-white/10" />

      {/* Month notes list (collapsible) */}
      <div className="flex-1 overflow-hidden flex flex-col min-h-0">
        <button
          onClick={() => setShowMonthNotes((v) => !v)}
          className="flex items-center justify-between w-full text-xs font-semibold text-slate-400
                     hover:text-white transition-colors duration-150 mb-2 group"
        >
          <span>
            This month's notes
            {monthNotes.length > 0 && (
              <span
                className="ml-1.5 px-1.5 py-0.5 rounded-full text-[10px] font-bold"
                style={{ backgroundColor: `${theme.accent}33`, color: theme.accent }}
              >
                {monthNotes.length}
              </span>
            )}
          </span>
          {showMonthNotes ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
        </button>

        <AnimatePresence>
          {showMonthNotes && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-auto min-h-0 flex-1 space-y-2 pr-1"
            >
              {monthNotes.length === 0 ? (
                <p className="text-xs text-slate-600 text-center py-3">No notes this month</p>
              ) : (
                monthNotes.map(({ dateKey, text }) => (
                  <div
                    key={dateKey}
                    className="rounded-xl bg-white/5 border border-white/8 px-3 py-2.5"
                  >
                    <p
                      className="text-[10px] font-semibold uppercase tracking-wider mb-1"
                      style={{ color: theme.accent }}
                    >
                      {format(new Date(dateKey + 'T00:00:00'), 'EEE, MMM d')}
                    </p>
                    <p className="text-xs text-slate-300 leading-relaxed line-clamp-3">{text}</p>
                  </div>
                ))
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
