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
          origin: process.env.BCMS_API_ORIGIN || 'http://localhost:8080',
          key: {
            id: process.env.BCMS_API_KEY || '65f1725abe4bcfba284afdbe',
            secret:
              process.env.BCMS_API_SECRET ||
              'ab0557bdd1bd36f47f1aa4cc78ae27020ba74b61511248670576d4394d12260d',
          },
        },
        websiteDomain: 'http://localhost:3000',
        postProcessImages: true,
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
