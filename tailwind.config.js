/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
      },
      transitionProperty: {
        'left': 'left',
      },
      screens: {
        'sam': '540px',
      },
    },
  },
  plugins: [],
}

