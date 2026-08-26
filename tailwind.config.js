/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f1fbf3',
          100: '#def5e3',
          200: '#bde8c7',
          300: '#91d59f',
          400: '#5fbe76',
          500: '#2f9e55',
          600: '#218344',
          700: '#196b38',
          800: '#15552f',
          900: '#103f25',
          950: '#092719',
        },
        warm: {
          50: '#ffffff',
          100: '#f5faf6',
          200: '#e2eee4',
          300: '#cbded0',
          400: '#a3bba8',
          500: '#6c8973',
          600: '#55715d',
          700: '#405a47',
          800: '#304638',
          900: '#22352a',
          950: '#14261b',
        },
        charcoal: {
          50: '#f6fbf7',
          100: '#e4f0e6',
          200: '#c9ddcc',
          300: '#a8c1ad',
          400: '#7f9b85',
          500: '#5e7c65',
          600: '#496550',
          700: '#36533d',
          800: '#274332',
          900: '#173824',
          950: '#0d2819',
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Inter"', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
