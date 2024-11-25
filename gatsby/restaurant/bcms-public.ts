import { Client } from '@thebcms/client';

export const bcmsPublic = new Client(
    process.env.GATSBY_BCMS_ORG_ID,
    process.env.GATSBY_BCMS_INSTANCE_ID,
    {
        id: process.env.GATSBY_BCMS_API_KEY_ID,
        secret: process.env.GATSBY_BCMS_API_KEY_SECRET,
    },
    {
        injectSvg: true,
    },
);
