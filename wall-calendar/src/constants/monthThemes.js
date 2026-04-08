// Carefully curated month themes: hero images (Unsplash) + accent colors
export const MONTH_THEMES = [
  {
    month: 0, // January
    name: 'January',
    imageUrl: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?w=1200&q=80',
    accent: '#60a5fa',       // blue-400
    accentDark: '#1d4ed8',
    gradient: 'from-blue-900 via-blue-800 to-slate-900',
    tagline: 'New beginnings await',
  },
  {
    month: 1, // February
    name: 'February',
    imageUrl: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?w=1200&q=80',
    accent: '#f472b6',       // pink-400
    accentDark: '#be185d',
    gradient: 'from-rose-900 via-pink-800 to-slate-900',
    tagline: 'Love is in the air',
  },
  {
    month: 2, // March
    name: 'March',
    imageUrl: 'https://images.unsplash.com/photo-1490750967868-88df5691cc05?w=1200&q=80',
    accent: '#34d399',       // emerald-400
    accentDark: '#065f46',
    gradient: 'from-emerald-900 via-green-800 to-slate-900',
    tagline: 'Spring is awakening',
  },
  {
    month: 3, // April
    name: 'April',
    imageUrl: 'https://images.unsplash.com/photo-1462275646964-a0e3386b89fa?w=1200&q=80',
    accent: '#a78bfa',       // violet-400
    accentDark: '#5b21b6',
    gradient: 'from-violet-900 via-purple-800 to-slate-900',
    tagline: 'April showers bring May flowers',
  },
  {
    month: 4, // May
    name: 'May',
    imageUrl: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1200&q=80',
    accent: '#4ade80',       // green-400
    accentDark: '#166534',
    gradient: 'from-green-900 via-emerald-800 to-slate-900',
    tagline: 'Nature in full bloom',
  },
  {
    month: 5, // June
    name: 'June',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&q=80',
    accent: '#fbbf24',       // amber-400
    accentDark: '#92400e',
    gradient: 'from-amber-900 via-yellow-800 to-slate-900',
    tagline: 'Sun-kissed days',
  },
  {
    month: 6, // July
    name: 'July',
    imageUrl: 'https://images.unsplash.com/photo-1471922694854-ff1b63b20054?w=1200&q=80',
    accent: '#fb923c',       // orange-400
    accentDark: '#9a3412',
    gradient: 'from-orange-900 via-amber-800 to-slate-900',
    tagline: 'Peak of summer',
  },
  {
    month: 7, // August
    name: 'August',
    imageUrl: 'https://images.unsplash.com/photo-1504701954957-2010ec3bcec1?w=1200&q=80',
    accent: '#f97316',       // orange-500
    accentDark: '#7c2d12',
    gradient: 'from-red-900 via-orange-800 to-slate-900',
    tagline: 'Endless summer days',
  },
  {
    month: 8, // September
    name: 'September',
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=1200&q=80',
    accent: '#fb7185',       // rose-400
    accentDark: '#9f1239',
    gradient: 'from-rose-900 via-red-800 to-slate-900',
    tagline: "Autumn's first breath",
  },
  {
    month: 9, // October
    name: 'October',
    imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=1200&q=80',
    accent: '#f97316',       // orange-500
    accentDark: '#431407',
    gradient: 'from-orange-950 via-orange-900 to-slate-900',
    tagline: 'Colors of the season',
  },
  {
    month: 10, // November
    name: 'November',
    imageUrl: 'https://images.unsplash.com/photo-1501854140801-50d01698950b?w=1200&q=80',
    accent: '#a78bfa',       // violet-400
    accentDark: '#4c1d95',
    gradient: 'from-slate-900 via-violet-900 to-slate-900',
    tagline: 'Grateful for everything',
  },
  {
    month: 11, // December
    name: 'December',
    imageUrl: 'https://images.unsplash.com/photo-1545048702-79362596cdc9?w=1200&q=80',
    accent: '#38bdf8',       // sky-400
    accentDark: '#0c4a6e',
    gradient: 'from-sky-900 via-blue-900 to-slate-900',
    tagline: 'Winter magic',
  },
];

// US Federal Holidays (fixed-date; rule-based ones computed at runtime)
export const FIXED_HOLIDAYS = {
  '01-01': "New Year's Day",
  '06-19': 'Juneteenth',
  '07-04': 'Independence Day',
  '11-11': 'Veterans Day',
  '12-25': 'Christmas Day',
};

// Floating holidays need computation; we ship a simple lookup for 2025-2030
export const FLOATING_HOLIDAYS = {
  '2026-01-19': 'MLK Day',
  '2026-02-16': "Presidents' Day",
  '2026-05-25': 'Memorial Day',
  '2026-09-07': 'Labor Day',
  '2026-10-12': 'Columbus Day',
  '2026-11-26': 'Thanksgiving',
  '2025-01-20': 'MLK Day',
  '2025-02-17': "Presidents' Day",
  '2025-05-26': 'Memorial Day',
  '2025-09-01': 'Labor Day',
  '2025-10-13': 'Columbus Day',
  '2025-11-27': 'Thanksgiving',
  '2027-01-18': 'MLK Day',
  '2027-02-15': "Presidents' Day",
  '2027-05-31': 'Memorial Day',
  '2027-09-06': 'Labor Day',
  '2027-10-11': 'Columbus Day',
  '2027-11-25': 'Thanksgiving',
};
