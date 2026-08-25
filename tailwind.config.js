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
          50: '#fdf8f0',
          100: '#f9edda',
          200: '#f2d7b4',
          300: '#e9bb85',
          400: '#df9a54',
          500: '#d78032',
          600: '#c86a28',
          700: '#a65223',
          800: '#854322',
          900: '#6c381e',
          950: '#3a1b0e',
        },
        warm: {
          50: '#faf9f7',
          100: '#f3f1ec',
          200: '#e6e1d6',
          300: '#d5ccb9',
          400: '#c1b49c',
          500: '#b1a185',
          600: '#a49074',
          700: '#897660',
          800: '#706151',
          900: '#5c5044',
          950: '#302a22',
        },
        charcoal: {
          50: '#f6f6f6',
          100: '#e7e7e7',
          200: '#d1d1d1',
          300: '#b0b0b0',
          400: '#888888',
          500: '#6d6d6d',
          600: '#5d5d5d',
          700: '#4f4f4f',
          800: '#3d3d3d',
          900: '#2a2a2a',
          950: '#1a1a1a',
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
