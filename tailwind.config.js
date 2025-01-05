/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors : {
        purple:{
          600 : '#5046E4',
          200 : '#E1E9FF',
          400 : '#ADABF5'
        }
      }
    },
  },
  plugins: [],
}