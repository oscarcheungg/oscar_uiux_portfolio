import defaultTheme from 'tailwindcss/defaultTheme'

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        // Small labels and tags only.
        label: ['Instrument Sans', ...defaultTheme.fontFamily.sans],
        // Polaroid captions only — as if written on the print.
        hand: ['Caveat', 'cursive'],
      },
    },
  },
  plugins: [],
}

