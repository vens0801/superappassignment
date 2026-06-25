// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        panel: '#1E1E1E',
        primary: '#72C75F', // The green button color
        accent: '#5746EA', // The purple profile background
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], // Assuming Inter or similar modern sans-serif
      }
    },
  },
  plugins: [],
}