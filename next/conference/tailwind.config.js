/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,tsx,ts}",
    "./layouts/**/*.tsx",
    "./pages/**/*.tsx",
  ],
  theme: {
    extend: {
      colors: {
        appAccent: '#1940F3',
        appBody: '#F2F2F2',
        appText: '#000000',
        appGray: {
          100: '#EBEBEB',
          200: '#E3E3E3',
          300: '#D9D9D9',
          400: '#D1D1D1',
          500: '#727476',
          600: '#333333',
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1.5rem',
          lg: '2rem',
          xl: '3rem',
        },
        screens: {
          sm: '640px',
          md: '768px',
          lg: '1024px',
          xl: '1280px',
          '2xl': '1440px',
        },
      },
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
