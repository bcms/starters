import {
    ServiceEntry,
    ServicesPageEntry,
    ServicesPageEntryMetaItem,
} from '~/bcms/type/ts';

export type ServicesPageResponse = {
    meta: ServicesPageEntryMetaItem;
    services: ServiceEntry[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
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
    };

    return res;
});
