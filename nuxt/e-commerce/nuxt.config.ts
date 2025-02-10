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
        },
    },
    css: ['~/assets/styles/main.scss'],
    modules: ['@nuxtjs/tailwindcss', 'nuxt-svgo'],
});
