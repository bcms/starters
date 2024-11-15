import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import { EventsPageEntry, EventsPageEntryMetaItem } from '~/bcms/types/ts';

export type EventsPageResponse = {
    meta: EventsPageEntryMetaItem;
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const eventsPageEntry = (await bcms.entry.getBySlug(
        'events',
        'events-page',
    )) as EventsPageEntry;

    const eventsPageMeta = eventsPageEntry.meta.en as EventsPageEntryMetaItem;

    const res: EventsPageResponse = {
        meta: eventsPageMeta,
        bcms: bcms.getConfig(),
    };

    return res;
});
