import { ContactPageEntry, ContactPageEntryMetaItem } from '~/bcms/type/ts';

export type ContactPageResponse = {
    meta: ContactPageEntryMetaItem;
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const contactPageEntry = (await bcms.entry.getBySlug(
        'lets-talk',
        'contact-page',
    )) as ContactPageEntry;
    const contactPageMeta = contactPageEntry.meta
        .en as ContactPageEntryMetaItem;

    const res: ContactPageResponse = {
        meta: contactPageMeta,
    };

    return res;
});
