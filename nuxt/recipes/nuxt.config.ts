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
      titleTemplate: '%s - Flavour Fushion',
      link: [
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
    [
      'nuxt-plugin-bcms',
      createBcmsNuxtConfig({
        cms: {
          origin: process.env.BCMS_API_ORIGIN || 'http://localhost:8080',
          key: {
            id: process.env.BCMS_API_KEY || '641322c4b5a472c14b545975',
            secret:
              process.env.BCMS_API_SECRET ||
              'c03699d4d73b111d4e71898cc601b139e1c68f08f69194a803ab9609a3c88aac',
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
          params: {
            overrides: {
              cleanupIDs: { prefix: svgPrefix },
            },
          },
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
