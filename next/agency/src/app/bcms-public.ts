import { Client } from '@thebcms/client';

export const bcmsPublic = new Client({
    apiKey: process.env.NEXT_PUBLIC_BCMS_API_KEY,
    injectSvg: true,
});
