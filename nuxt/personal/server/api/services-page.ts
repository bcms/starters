import {
    ServiceEntry,
    ServiceEntryMetaItem,
    ServicesPageEntry,
    ServicesPageEntryMetaItem,
} from '~/bcms/type/ts';

export type ServicesPageResponse = {
    meta: ServicesPageEntryMetaItem;
    services: ServiceEntryMetaItem[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
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
    };

    return res;
});
