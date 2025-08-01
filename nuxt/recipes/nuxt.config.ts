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
                    href: 'https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap',
                    rel: 'stylesheet',
                },
            ],
        },
    },
    css: ['~/assets/styles/main.scss'],
    bcms: {
        orgId: process.env.BCMS_ORG_ID,
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
    modules: ['@nuxtjs/tailwindcss', 'nuxt-svgo', '@thebcms/nuxt'],
});
