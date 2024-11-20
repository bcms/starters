import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import {
    ServiceEntry,
    ServiceEntryMetaItem,
    ServicesPageEntry,
    ServicesPageEntryMetaItem,
} from '~/bcms/types/ts';

export type ServicesPageResponse = {
    meta: ServicesPageEntryMetaItem;
    services: ServiceEntryMetaItem[];
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const servicesPageEntry = (await bcms.entry.getBySlug(
        'services',
        'services-page',
    )) as ServicesPageEntry;
    const servicesEntries = (await bcms.entry.getAll(
        'service',
    )) as ServiceEntry[];

    const servicesPageMeta = servicesPageEntry.meta.en as ServiceEntryMetaItem;

    const res: ServicesPageResponse = {
        meta: servicesPageMeta,
        services: servicesEntries.map((e) => e.meta.en as ServiceEntryMetaItem),
        bcms: bcms.getConfig(),
    };

    return res;
});
