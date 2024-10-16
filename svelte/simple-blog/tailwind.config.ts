import type { Config } from 'tailwindcss';

const config: Config = {
    content: [
        './src/**/*.{js,ts,jsx,tsx,mdx,html,svelte}',
    ],
    theme: {
        extend: {
            colors: {
                appGray: {
                    100: '#F5F5F5',
                    200: '#D9D9D9',
                    300: '#4D4D4D',
                },
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
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    plugins: [require('@tailwindcss/typography')],
};
export default config;
