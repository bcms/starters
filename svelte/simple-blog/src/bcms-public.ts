import { Client } from '@thebcms/client';
import * as env from '$env/static/public';

export const bcmsPublic = new Client(
	{
        apiKey: env.PUBLIC_BCMS_API_KEY,
		injectSvg: true,
	},
);
