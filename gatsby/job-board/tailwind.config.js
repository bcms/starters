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
                appAccent: '#2D472B',
                appText: '#191824',
                appLight: '#E8E6E1',
                appGray: {
                    100: '#DEDBD6',
                    200: '#CCCAC6',
                    300: '#BDBBB7',
                    400: '#999999',
                    500: '#7F7F8C',
                    600: '#6A6A75',
                },
            },
            container: {
                center: true,
                padding: {
                    DEFAULT: '1.5rem',
                    lg: '2rem',
                },
                screens: {
                    sm: '640px',
                    md: '768px',
                    lg: '1024px',
                    xl: '1280px',
                    '2xl': '1600px',
                },
            },
            fontFamily: {
                SpaceGrotesk: ['Space Grotesk', 'sans-serif'],
                PlayfairDisplay: ['Playfair Display', 'serif'],
            },
        },
    },
    plugins: [],
};
