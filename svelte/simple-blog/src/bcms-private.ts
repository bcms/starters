import { env } from '$env/dynamic/private';
import { Client } from '@thebcms/client';

export const bcmsPrivate = new Client({
	apiKey: env.BCMS_API_KEY,
	injectSvg: true,
});
