import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';

export type CartPageResponse = {
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const res: CartPageResponse = {
        bcms: bcms.getConfig(),
    };

    return res;
});
