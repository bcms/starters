import { Client } from '@thebcms/client';

// If not provided, BCMS uses BCMS_API_KEY environment variable for the apiKey parameter
export const bcmsPrivate = new Client({ injectSvg: true });
