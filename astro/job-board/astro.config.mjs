// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import node from '@astrojs/node';

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), react()],
    adapter: node({
        mode: 'standalone',
    }),
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
    markdown: {
        syntaxHighlight: 'prism',
    },
});
