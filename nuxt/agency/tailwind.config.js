/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
    './app.vue',
    './error.vue',
  ],
  theme: {
    extend: {
      colors: {
        appAccent: '#324EE0',
        appAccent2: '#2FA470',
        appBody: '#ffffff',
        appText: {
          DEFAULT: '#0F1223',
          light: '#ffffff',
        },
        appGray: {
          100: '#5E5E5E',
          200: '#585961',
          300: '#46474F',
        },
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          lg: '2.5rem',
          xl: '5rem',
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
        Helvetica: ['Helvetica', 'sans-serif'],
        HelveticaNeue: ['Helvetica Neue', 'sans-serif'],
        PlayfairDisplay: ['Playfair Display', 'serif'],
      },
    },
  },
  plugins: [],
};
