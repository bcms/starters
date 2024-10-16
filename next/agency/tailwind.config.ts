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
                appAccent: {
                    300: '#5073EF',
                    DEFAULT: '#324EE0',
                },
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
                Inter: ['var(--font-inter)', 'sans-serif'],
                Helvetica: ['Helvetica', 'sans-serif'],
                HelveticaNeue: ['Helvetica Neue', 'sans-serif'],
                PlayfairDisplay: ['var(--font-playfair-display)', 'serif'],
            },
        },
    },
    plugins: [],
};
export default config;
