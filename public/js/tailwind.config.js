/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        'slate':{
          '150': 'rgb(238, 244, 249)',
          '250': 'rgb(216, 223, 233)',
          '350': 'rgb(191, 203, 217)',
          '450': 'rgb(128, 143, 164)',
          '550': 'rgb(80, 96, 119)',
          '650': 'rgb(61, 74, 91)',
          '750': 'rgb(41, 54, 71)',
          '850': 'rgb(20, 30, 45)',
        }
      },
    },
  },
  plugins: [],
}

