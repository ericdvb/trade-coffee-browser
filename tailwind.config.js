/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "!./app/api/**/*.{js,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {}
    },
    colors: {
      'maroon': 'rgb(123, 0, 22)',
    },
  },
  plugins: [],
}

