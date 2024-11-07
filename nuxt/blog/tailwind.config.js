/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './layouts/**/*.vue',
        './pages/**/*.vue',
        './components/**/*.vue',
        './error.vue',
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
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
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
        },
    },
    plugins: [],
};
