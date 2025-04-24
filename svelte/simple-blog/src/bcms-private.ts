import { Client } from '@thebcms/client';
import * as env from '$env/static/private';

export const bcmsPrivate = new Client(
	env.BCMS_ORG_ID || '',
	env.BCMS_INSTANCE_ID || '',
	{
		id: env.BCMS_API_KEY_ID || '',
		secret: env.BCMS_API_KEY_SECRET || '',
	},
	{
		injectSvg: true,
	},
);
