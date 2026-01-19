/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#F9F7F2',
          100: '#F0EAD6',
          200: '#E2D3A8',
          300: '#D4BC7A',
          400: '#C6A54D',
          500: '#B88E1F', // Deep Bronze/Gold
          600: '#937219',
          700: '#6E5513',
          800: '#49390C',
          900: '#251C06',
        },
        midnight: {
          950: '#020410', // Deepest Navy
          900: '#0A1128', // Night Blue
          800: '#132244', // Lighter Navy
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'], // Elegant Serif for EnterOffMarket
        sans: ['"Montserrat"', 'sans-serif'], // Modern Sans
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(to bottom right, #020410, #0A1128)',
        'gold-gradient': 'linear-gradient(to right, #B88E1F, #D4BC7A)', // Real Gold gradient
      }
    },
  },
  plugins: [],
}
