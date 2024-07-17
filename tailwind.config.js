/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        newFont: '"Oswald", sans-serif',
        matn: '"Edu AU VIC WA NT Hand", cursive'

      }
    },
  },
  plugins: [],
}