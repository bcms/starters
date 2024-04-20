/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,jsx,ts,tsx}',
    './src/templates/**/*.{js,jsx,ts,tsx}',
    './src/components/**/*.{js,jsx,ts,tsx}',
    './src/layout/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        appAccent: '#D9FAA1',
        appBody: '#ffffff',
        appText: '#181A2C',
        appGray: {
          100: '#E6E6E6',
          200: '#E0E0E0',
          300: '#D1D1D1',
          400: '#989898',
          500: '#696A6C',
          600: '#5B5B5E',
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
          lg: '102pxx',
          xl: '128pxx',
          '2xl': '1440px',
        },
      },
      fontFamily: {
        Inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: ['gatsby-plugin-postcss'],
};
