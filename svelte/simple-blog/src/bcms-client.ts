import { Client } from '@thebcms/client';
import {
	BCMS_API_KEY_ID,
	BCMS_API_KEY_SECRET,
	BCMS_INSTANCE_ID,
	BCMS_ORG_ID,
} from '$env/static/private';

export const bcms = new Client(
	BCMS_ORG_ID || '',
	BCMS_INSTANCE_ID || '',
	{
		id: BCMS_API_KEY_ID || '',
		secret: BCMS_API_KEY_SECRET || '',
	},
	{
		injectSvg: true,
	},
);
