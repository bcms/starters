import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import { ContactPageEntry, ContactPageEntryMetaItem } from '~/bcms/types/ts';

export type ContactPageResponse = {
    meta: ContactPageEntryMetaItem;
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const contactPage = (await bcms.entry.getBySlug(
        'contact',
        'contact-page',
    )) as ContactPageEntry;

    const res: ContactPageResponse = {
        meta: contactPage.meta.en as ContactPageEntryMetaItem,
        bcms: bcms.getConfig(),
    };

    return res;
});
