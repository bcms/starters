// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwind from '@astrojs/tailwind';

import vue from '@astrojs/vue';

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), vue()],
  fonts: [
    {
      name: 'Inter',
      cssVariable: '--font-inter',
      provider: fontProviders.google(),
    },
  ],
  security: {
    csp: true,
  },
});