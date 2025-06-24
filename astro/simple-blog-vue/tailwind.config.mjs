/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
        extend: {
            colors: {
                appGray: {
                    100: '#F5F5F5',
                    200: '#D9D9D9',
                    300: '#4D4D4D',
                },
            },
            fontFamily: {
                inter: ['Inter', 'sans-serif'],
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
    plugins: [require('@tailwindcss/typography')],
};
