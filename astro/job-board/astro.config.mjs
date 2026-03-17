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
            name: 'Space Grotesk',
            cssVariable: '--font-space-grotesk',
            provider: fontProviders.google(),
        },
        {
            name: 'Playfair Display',
            cssVariable: '--font-playfair-display',
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
