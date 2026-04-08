# 🌸 Interactive Wall Calendar Component

A beautifully crafted, modern wall calendar component built entirely on the frontend with React, Vite, and TailwindCSS. The UI takes inspiration from a premium physical wall calendar, offering rich aesthetic themes, smooth spring animations, and a powerful date range-selection paradigm.

## ✨ Features

- **Fluid Date Range Selection**: A 3-click selection system (Start → End → Reset) that gracefully handles date boundary normalisation and offers a live, ghost-highlight preview while picking ranges.
- **Persistent Note System**: Write notes targeting single dates or entire date blocks! Your selected range physically spans visual blocks across the calendar, and the events persist globally via `localStorage`.
- **Dynamic Month Themes**: The entire aesthetic transforms as you browse. Each month receives its own customized styling, including a carefully curated Unsplash hero image backdrop, contextual taglines, and distinct accent glow colors mapping right down to the ambient drop-shadows.
- **Flawless Month Transitions**: Using `framer-motion`, month navigation glides with seamless enter/exit animations. The calendar grid also dynamically pads "ghost dates" from previous and upcoming months to keep the board a true 42-cell locked ratio, meaning no layout jitter!
- **Responsive by Design**: On desktop screens, it uses a stunning two-column, structured dashboard feel. On mobile touch-screens, it wraps smoothly to a fluid, vertical layout. 
- **Precooked US Federal Holidays**: Automatically flags and highlights fixed and drifting holidays (Thanksgiving, MLK Day, etc.) with delicate marker dots and native tooltips.

## 🚀 Quick Start

Ensure you have Node installed, then fire it up:

```bash
# Install the core stack
npm install

# Start the optimized Vite development server
npm run dev
```
Navigate to `http://localhost:5173`. 

## 🧠 Technologies Built With

- **Vite** — Blazing fast build tooling and HMR
- **React (Hooks)** — Functional abstraction for strict UI separation
- **TailwindCSS (v3.4)** — Heavy utility class composition with nested CSS variables for bespoke hover states and themes
- **Framer Motion** — Enterprise-grade layout animations & keyframes
- **date-fns** — Heavy lifting date maths and formatters without the sheer footprint of Moment.js
- **Lucide React** — For the crispest iconography

## 🏗️ Architecture

The app applies a strict pattern, splitting state logic out into custom hooks and keeping components completely focused on their presentation layers:

- **`useDateRange`**: Our strict, self-correcting 3-phase state machine that safely guarantees a correct `startDate` and `endDate` boundary.
- **`useNotes`**: Iterates across `date-fns` intervals and maps persistent events down to local browser memory efficiently.
- **`CalendarGrid / DayCell`**: Deeply granular logic governing the state of *any single day* (is it an edge of a selection, a preview, an existing event, or a trailing padding day?). 
- **`HeroSection`**: Drives the dynamically fading Unsplash integration.

---
*Created as part of the Frontend Engineering Challenge.*