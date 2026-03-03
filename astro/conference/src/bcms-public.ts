import { Client } from '@thebcms/client';

export const bcmsPublic = new Client({
    apiKey: import.meta.env.PUBLIC_BCMS_API_KEY,
    injectSvg: true,
});
