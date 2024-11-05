/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
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
