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
                    href: 'https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Space+Grotesk:wght@300..700&display=swap',
                    rel: 'stylesheet',
                },
            ],
        },
    },
    css: ['~/assets/styles/main.scss', 'swiper/css'],
    bcms: {
        instanceId: process.env.BCMS_INSTANCE_ID,
        privateClientOptions: {
            key: {
                id: process.env.BCMS_API_KEY_ID!,
                secret: process.env.BCMS_API_KEY_SECRET!,
            },
            options: {
                injectSvg: true,
            },
        },
        publicClientOptions: {
            key: {
                id: process.env.NUXT_PUBLIC_BCMS_API_KEY_ID!,
                secret: process.env.NUXT_PUBLIC_BCMS_API_KEY_SECRET!,
            },
            options: {
                injectSvg: true,
            },
        },
    },
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-svgo',
        'nuxt-swiper',
        '@thebcms/nuxt',
    ],
    plugins: ['~/plugins/click-outside'],
});
