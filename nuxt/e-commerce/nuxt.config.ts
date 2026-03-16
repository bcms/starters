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
    bcms: {
        privateClientOptions: {
            options: {
                apiKey: process.env.BCMS_API_KEY!,
                injectSvg: true,
            },
        },
        publicClientOptions: {
            options: {
                apiKey: process.env.NUXT_PUBLIC_BCMS_API_KEY!,
                injectSvg: true,
            },
        },
    },
    css: ['~/assets/styles/main.scss'],
    modules: ['@nuxtjs/tailwindcss', 'nuxt-svgo', '@thebcms/nuxt'],
});
