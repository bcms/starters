import { EventsPageEntry, EventsPageEntryMetaItem } from '~/bcms/type/ts';

export type EventsPageResponse = {
    meta: EventsPageEntryMetaItem;
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const eventsPageEntry = (await bcms.entry.getBySlug(
        'events',
        'events-page',
    )) as EventsPageEntry;

    const eventsPageMeta = eventsPageEntry.meta.en as EventsPageEntryMetaItem;

    const res: EventsPageResponse = {
        meta: eventsPageMeta,
    };

    return res;
});
