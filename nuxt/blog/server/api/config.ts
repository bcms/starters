import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';

export type ConfigResponse = {
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const res: ConfigResponse = {
        bcms: bcms.getConfig(),
    };

    return res;
});
