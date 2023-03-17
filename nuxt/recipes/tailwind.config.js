/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        appAccent: "#0A2213",
        appGray: {
          100: "#F9F7F5",
          200: "#E6E9E7",
          300: "#D6D6D6",
          400: "#757182",
          500: "#686473",
          600: "#4A4752",
          700: "#37353D",
          800: "#121212",
        },
      },
      fontFamily: {
        Inter: ["Inter", "sans-serif"],
        PlayfairDisplay: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};
