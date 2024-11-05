import { Client } from '@thebcms/client';

export const bcms = new Client(
    import.meta.env.BCMS_ORG_ID || '',
    import.meta.env.BCMS_INSTANCE_ID || '',
    {
        id: import.meta.env.BCMS_API_KEY_ID || '',
        secret: import.meta.env.BCMS_API_KEY_SECRET || '',
    },
    {
        injectSvg: true,
    },
);
