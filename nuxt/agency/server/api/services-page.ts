import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import {
    ServiceEntry,
    ServicesPageEntry,
    ServicesPageEntryMetaItem,
} from '~/bcms/types/ts';

export type ServicesPageResponse = {
    meta: ServicesPageEntryMetaItem;
    services: ServiceEntry[];
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const servicesPageEntry = (await bcms.entry.getBySlug(
        'services',
        'services-page',
    )) as ServicesPageEntry;

    const servicesPageMeta = servicesPageEntry.meta
        .en as ServicesPageEntryMetaItem;

    const servicesEntries = (await bcms.entry.getAll(
        'service',
    )) as ServiceEntry[];

    const res: ServicesPageResponse = {
        meta: servicesPageMeta,
        services: servicesEntries,
        bcms: bcms.getConfig(),
    };

    return res;
});
