import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import { ContactPageEntry, ContactPageEntryMetaItem } from '~/bcms/types/ts';

export type ContactPageResponse = {
    meta: ContactPageEntryMetaItem;
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const contactPageEntry = (await bcms.entry.getBySlug(
        'contact',
        'contact-page',
    )) as ContactPageEntry;

    const contactPageMeta = contactPageEntry.meta
        .en as ContactPageEntryMetaItem;

    const res: ContactPageResponse = {
        meta: contactPageMeta,
        bcms: bcms.getConfig(),
    };

    return res;
});
