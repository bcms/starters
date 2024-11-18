// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2024-04-03',
    devtools: { enabled: true },
    components: true,
    app: {
        head: {
            htmlAttrs: {
                lang: 'en',
            },
            link: [
                { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                    crossorigin: 'anonymous',
                },
                {
                    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap',
                    rel: 'stylesheet',
                },
            ],
        },
    },
    css: ['~/assets/styles/main.scss', 'swiper/css'],
    modules: ['@nuxtjs/tailwindcss', 'nuxt-svgo', 'nuxt-swiper'],
});
