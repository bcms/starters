import { createBcmsNuxtConfig } from 'nuxt-plugin-bcms/config';
import _ from 'lodash';

const svgPrefix = {};
svgPrefix.toString = () => `${_.uniqueId()}_`;

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
      titleTemplate: '%s - Tastyyy',
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        {
          rel: 'preconnect',
          href: 'https://fonts.gstatic.com',
          crossorigin: 'anonymous',
        },
        {
          href: 'https://fonts.googleapis.com/css2?family=Gloock&display=swap',
          rel: 'stylesheet',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: '/apple-touch-icon.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '32x32',
          href: '/favicon-32x32.png',
        },
        {
          rel: 'icon',
          type: 'image/png',
          sizes: '16x16',
          href: '/favicon-16x16.png',
        },
        { rel: 'manifest', href: '/site.webmanifest' },
        { rel: 'mask-icon', href: '/safari-pinned-tab.svg', color: '#5bbad5' },
      ],
      meta: [
        { name: 'msapplication-TileColor', content: '#da532c' },
        { name: 'theme-color', content: '#ffffff' },
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
    'nuxt-svgo',
    'nuxt-swiper',
    [
      'nuxt-plugin-bcms',
      createBcmsNuxtConfig({
        cms: {
          origin: process.env.BCMS_API_ORIGIN || 'http://localhost:8080',
          key: {
            id: process.env.BCMS_API_KEY || '6423fe69c4d0f7aa085d5e86',
            secret:
              process.env.BCMS_API_SECRET ||
              'd0128c9f142a7f609c9f787d782feef791ba0bb5c823494f70199a16d88035ac',
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
      }),
    ],
  ],
  svgo: {
    svgoConfig: {
      plugins: [
        {
          name: 'preset-default',
          // params: {
          //   overrides: {
          //     cleanupIDs: { prefix: svgPrefix },
          //   },
          // },
        },
      ],
    },
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
