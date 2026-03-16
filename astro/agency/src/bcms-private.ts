import { Client } from '@thebcms/client';

export const bcmsPrivate = new Client({
    apiKey: import.meta.env.BCMS_API_KEY,
    injectSvg: true,
});
