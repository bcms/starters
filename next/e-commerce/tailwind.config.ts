import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
        './src/components/**/*.{js,ts,jsx,tsx,mdx}',
        './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            colors: {
                appBody: '#ffffff',
                appText: '#121212',
                appGray: {
                    100: '#F5F5F5',
                    200: '#EDEDED',
                    300: '#DEDEDE',
                    400: '#B3B3B3',
                    500: '#878787',
                    600: '#69675E',
                    700: '#5E5E5E',
                    800: '#4A4A4A',
                    900: '#33322E',
                },
                appAccent: {
                    darkGreen: '#1A5E41',
                    lightGreen: '#BBEA01',
                    orange: '#EAA401',
                },
                appError: '#CE3434',
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
                Helvetica: ['Helvetica', 'sans-serif'],
            },
        },
    },
    plugins: [],
};
export default config;
