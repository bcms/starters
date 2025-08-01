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
    css: ['~/assets/styles/main.scss'],
    modules: ['@nuxtjs/tailwindcss', 'nuxt-svgo', '@thebcms/nuxt'],
});
