import { Client } from '@thebcms/client';

export const bcmsPublic = new Client({
  apiKey: process.env.GATSBY_PUBLIC_BCMS_API_KEY,
  injectSvg: true,
});

