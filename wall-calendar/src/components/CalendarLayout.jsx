import { AnimatePresence, motion } from 'framer-motion';
import { useCalendar } from '../hooks/useCalendar';
import { useDateRange } from '../hooks/useDateRange';
import { useNotes } from '../hooks/useNotes';
import HeroSection from './HeroSection';
import CalendarGrid from './CalendarGrid';
import NotesPanel from './NotesPanel';

export default function CalendarLayout() {
  const { currentMonth, direction, goNext, goPrev, theme } = useCalendar();
  const {
    startDate,
    endDate,
    hoverDate,
    handleDayClick,
    handleDayHover,
  } = useDateRange();
  const { getNote, saveNote, deleteNote, getMonthNotes, notesMap } = useNotes();

  const tearOffVariants = {
    enter: (direction) => ({
      opacity: 0,
      y: direction === 'right' ? 0 : 400,
      rotateX: direction === 'right' ? 0 : -45,
      scale: direction === 'right' ? 0.95 : 1,
      zIndex: direction === 'right' ? 0 : 10,
    }),
    center: {
      opacity: 1,
      y: 0,
      rotateX: 0,
      scale: 1,
      zIndex: 5,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1], // expoOut
      }
    },
    exit: (direction) => ({
      opacity: 0,
      y: direction === 'right' ? 600 : 0,
      rotateX: direction === 'right' ? -60 : 0,
      scale: direction === 'right' ? 1 : 0.95,
      zIndex: direction === 'right' ? 10 : 0,
      transition: {
        duration: 0.6,
        ease: [0.32, 0, 0.67, 0], // expoIn
      }
    })
  };

  // "selected date" = last clicked date for the notes panel context
  const selectedDate = endDate ?? startDate ?? null;

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 md:p-8">
      {/* Ambient background glow */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 0%, ${theme.accent}18 0%, transparent 70%)`,
        }}
      />

      {/* Wall calendar card */}
      <div
        className="relative w-full max-w-4xl rounded-2xl overflow-hidden shadow-2xl border border-white/8"
        style={{
          background: 'linear-gradient(160deg, #1a1d27 0%, #0f1117 100%)',
          boxShadow: `0 30px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05), 0 0 60px ${theme.accent}15`,
          perspective: '1200px'
        }}
      >
        <AnimatePresence mode="popLayout" custom={direction} initial={false}>
          <motion.div
            key={currentMonth.toISOString()}
            custom={direction}
            variants={tearOffVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="w-full h-full flex flex-col"
            style={{ 
              transformOrigin: 'top center',
              backfaceVisibility: 'hidden'
            }}
          >
            {/* Hero image / month banner */}
            <HeroSection
              theme={theme}
              currentMonth={currentMonth}
              onPrev={goPrev}
              onNext={goNext}
            />

            {/* Body: calendar grid + notes panel */}
            <div className="flex flex-col lg:flex-row min-h-[420px] bg-[#0f1117]">
              {/* Calendar grid (main area) */}
              <div className="flex-1 min-w-0 border-b lg:border-b-0 lg:border-r border-white/8">
                <CalendarGrid
                  currentMonth={currentMonth}
                  direction={direction}
                  startDate={startDate}
                  endDate={endDate}
                  hoverDate={hoverDate}
                  theme={theme}
                  onDayClick={handleDayClick}
                  onDayHover={handleDayHover}
                  getNote={getNote}
                />
              </div>

              {/* Notes panel (sidebar on desktop, bottom on mobile) */}
              <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 p-4 lg:p-5">
                <NotesPanel
                  startDate={startDate}
                  endDate={endDate}
                  currentMonth={currentMonth}
                  getNote={getNote}
                  saveNote={saveNote}
                  deleteNote={deleteNote}
                  getMonthNotes={getMonthNotes}
                  theme={theme}
                />
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-white/8 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[10px] text-slate-600">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-rose-400 inline-block" /> Holiday
            </span>
            <span className="flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: theme.accent }}
              /> Selected
            </span>
            <span className="flex items-center gap-1">
              <span
                className="w-2 h-2 rounded-full inline-block opacity-30"
                style={{ backgroundColor: theme.accent }}
              /> Range
            </span>
          </div>
          <p className="text-[10px] text-slate-700">Wall Calendar · {new Date().getFullYear()}</p>
        </div>
      </div>
    </div>
  );
}
