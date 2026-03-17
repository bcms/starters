// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), react()],
    fonts: [
        {
            name: 'Inter',
            cssVariable: '--font-inter',
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
});
