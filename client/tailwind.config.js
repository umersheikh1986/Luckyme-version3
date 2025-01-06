/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        climate: ["Climate Crisis", "cursive"],
      },
      backgroundImage: {
        'dashboard-bg': "url('/assets/backgroundImage.png')",
      }
    },
  },
  plugins: [],
};
