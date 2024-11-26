import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';

export type BCMSConfigResponse = {
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {

    const res: BCMSConfigResponse = {
        bcms: bcms.getConfig(),
    };

    return res;
});
