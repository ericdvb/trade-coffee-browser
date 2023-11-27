/** @type {import('tailwindcss').Config} */
import colors from 'tailwindcss/colors'

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "!./app/api/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {},
      colors: {
        'maroon': 'rgb(123, 0, 22)',
      }
    },
  },
  plugins: [],
}

