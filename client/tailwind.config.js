/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark": "#332941",
        "dark-blue": "#3B3486",
        "purple": "#864AF9",
        "light-yellow": "#FFE9B1"
      },
      boxShadow: {
        "medium": "4px 0px 10px -4px rgba(0,0,0,0.1)"
      }
    },
  },
  plugins: [],
  darkMode: 'selector'
}

