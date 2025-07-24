import { ContactPageEntry, ContactPageEntryMetaItem } from '~/bcms/type/ts';

export type ContactPageResponse = {
    meta: ContactPageEntryMetaItem;
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const contactPage = (await bcms.entry.getBySlug(
        'contact',
        'contact-page',
    )) as ContactPageEntry;

    const res: ContactPageResponse = {
        meta: contactPage.meta.en as ContactPageEntryMetaItem,
    };

    return res;
});
