/** @type {import("prettier").Config} */
const config = {
    plugins: ['prettier-plugin-astro'],
    singleQuote: true,
    trailingComma: 'all',
    tabWidth: 4,
    overrides: [
        {
            files: '*.astro',
            options: {
                parser: 'astro',
            },
        },
    ],
};
export default config;

