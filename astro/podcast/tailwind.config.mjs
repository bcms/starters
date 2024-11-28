/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                appAccent: '#FF4B23',
                appBody: '#080808',
                appText: '#F7F7F7',
                appGray: {
                    100: '#E6E6E6',
                    200: '#CCCCCC',
                    300: '#C4C4C4',
                    400: '#A1A1A1',
                    500: '#A3A3A3',
                    600: '#4D4D4D',
                    700: '#3D3D3D',
                    800: '#2E2E2E',
                },
            },
            fontFamily: {
                Inter: ['Inter', 'sans-serif']
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
