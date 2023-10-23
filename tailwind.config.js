/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {

    extend: {
      colors: {
        secondary: '#111724',
        primary: '#3e34c2',
        background: '#fafaff'

      },
    },
  },
  plugins: [],
}