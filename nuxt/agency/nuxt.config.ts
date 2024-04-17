import { createBcmsNuxtConfig } from 'nuxt-plugin-bcms/config';
import bcmsRoutes from './bcms.routes';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  vite: {
    optimizeDeps: {
      include: ['axios', '@becomes/cms-client'],
    },
  },
  runtimeConfig: {
    public: {
      bcmsApiOrigin: '',
      bcmsApiKeyId: '',
      bcmsApiKeySecret: '',
      bcmsEnableClientCache: '',
      bcmsClientDebug: '',
      bcmsEntryStatuses: '',
      bcmsMostServerPort: '',
      bcmsMostServerDomain: '',
    },
  },
  app: {
    head: {
      htmlAttrs: {
        lang: 'en',
      },
      titleTemplate: '%s - BrandCrafters',
      meta: [
        { property: 'og:type', content: 'website' },
        { property: 'twitter:card', content: 'summary_large_image' },
      ],
    },
  },
  css: [
    '~/assets/css/fonts.css',
    '~/assets/css/main.css',
    '~/assets/css/reset.css',
    '~/assets/css/transition.css',
  ],
  modules: [
    [
      'nuxt-plugin-bcms',
      createBcmsNuxtConfig({
        cms: {
          origin: process.env.BCMS_API_ORIGIN || '',
          key: {
            id: process.env.BCMS_API_KEY || '',
            secret: process.env.BCMS_API_SECRET || '',
          },
        },
        websiteDomain: 'http://localhost:3000',
        media: {
          download: true,
          images: {
            process: true,
          },
        },
        server: {
          routes: bcmsRoutes,
        },
      }),
    ],
    '@nuxtjs/tailwindcss',
    'nuxt-svgo',
    'nuxt-swiper',
  ],
});
