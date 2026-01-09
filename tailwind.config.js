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
          50: '#fbf7e3',
          100: '#f5ebb8',
          200: '#edd983',
          300: '#e3c252',
          400: '#d9a82a',
          500: '#b8860b', // main gold
          600: '#966606',
          700: '#754a05',
          800: '#613b0a',
          900: '#52310e',
        },
        midnight: {
          950: '#0a0a0e', // darker than slate-950
          900: '#111118',
          800: '#1a1a24',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      backgroundImage: {
        'luxury-gradient': 'linear-gradient(to bottom right, #111118, #0a0a0e)',
        'gold-gradient': 'linear-gradient(to right, #b8860b, #d9a82a)',
      }
    },
  },
  plugins: [],
}
