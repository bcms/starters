import { Client } from '@thebcms/client';

export const bcmsPublic = new Client(
    import.meta.env.PUBLIC_BCMS_ORG_ID || '',
    import.meta.env.PUBLIC_BCMS_INSTANCE_ID || '',
    {
        id: import.meta.env.PUBLIC_BCMS_API_KEY_ID || '',
        secret: import.meta.env.PUBLIC_BCMS_API_KEY_SECRET || '',
    },
    {
        injectSvg: true,
    },
);
