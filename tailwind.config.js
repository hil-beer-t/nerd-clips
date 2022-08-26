/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      opacity: ['disabled'],
      backgroundColor: ['disabled'],
      fontFamily: {
        'sans': ['roboto', 'sans-serif', 'monospace']
      }
    },
  },
  plugins: [
    require("@tailwindcss/aspect-ratio")
  ],
}
