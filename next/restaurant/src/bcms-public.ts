import { Client } from '@thebcms/client';

export const bcmsPublic = new Client(
    process.env.NEXT_PUBLIC_BCMS_ORG_ID || '',
    process.env.NEXT_PUBLIC_BCMS_INSTANCE_ID || '',
    {
        id: process.env.NEXT_PUBLIC_BCMS_API_KEY_ID || '',
        secret: process.env.NEXT_PUBLIC_BCMS_API_KEY_SECRET || '',
    },
    {
        injectSvg: true,
    },
);
