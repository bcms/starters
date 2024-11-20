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
                appAccent: '#EF4141',
                appBody: '#fff',
                appText: '#171717',
                appGray: {
                    100: '#EBEBEB',
                    200: '#D4D4D4',
                    300: '#828282',
                    400: '#636363',
                    500: '#525252',
                    600: '#242424',
                },
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '1.5rem',
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
                Helvetica: ['Helvetica', 'sans-serif'],
                Inter: ['Inter', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
