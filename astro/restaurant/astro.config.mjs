// @ts-check
import { defineConfig, fontProviders } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
    integrations: [tailwind(), react()],
    fonts: [
        {
            name: 'Gloock',
            cssVariable: '--font-gloock',
            provider: fontProviders.google(),
        },
    ],
    security: {
        csp: true,
    },
});
