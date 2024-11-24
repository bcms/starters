/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        `./src/pages/**/*.{js,jsx,ts,tsx}`,
        `./src/templates/**/*.{js,jsx,ts,tsx}`,
        `./src/components/**/*.{js,jsx,ts,tsx}`,
    ],
    theme: {
        extend: {
            colors: {
                appAccent: {
                    100: '#9FA8A3',
                    DEFAULT: '#0A2213',
                },
                appGray: {
                    100: '#F9F7F5',
                    200: '#E6E9E7',
                    300: '#D6D6D6',
                    400: '#757182',
                    500: '#686473',
                    600: '#4A4752',
                    700: '#37353D',
                    800: '#121212',
                },
                appWarning: '#FC5E5E',
            },
            fontFamily: {
                Inter: ['Inter', 'sans-serif']
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '1rem',
                    lg: '2rem',
                },
                screens: {
                    sm: '640px',
                    md: '768px',
                    lg: '1024px',
                    xl: '1280px',
                    '2xl': '1360px',
                },
            },
        },
    },
    plugins: [],
};
