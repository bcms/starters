import { Client } from '@thebcms/client';
import * as env from '$env/static/public';

export const bcmsPublic = new Client(
	env.PUBLIC_BCMS_ORG_ID || '',
	env.PUBLIC_BCMS_INSTANCE_ID || '',
	{
		id: env.PUBLIC_BCMS_API_KEY_ID || '',
		secret: env.PUBLIC_BCMS_API_KEY_SECRET || '',
	},
	{
		injectSvg: true,
	},
);
