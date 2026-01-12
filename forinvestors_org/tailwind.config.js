/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: { // Maintaining 'gold' key for compatibility but mapping to Royal Blue/Platinum
          50: '#f0f9ff', // light blue
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9', // Royal Blue accent
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        midnight: { // Maintaining 'midnight' key but mapping to Slate (Cooler dark)
          950: '#0f172a', // Slate-950
          900: '#1e293b', // Slate-800
          800: '#334155', // Slate-700
        }
      },
      fontFamily: {
        serif: ['"Inter"', 'sans-serif'], // Swapping Serif for Sans (Modern)
        sans: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(to bottom right, #0f172a, #1e293b)',
        'gold-gradient': 'linear-gradient(to right, #0ea5e9, #38bdf8)', // Blue gradient
      }
    },
  },
  plugins: [],
}
