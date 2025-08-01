import { AboutPageEntry, AboutPageEntryMetaItem } from '~/bcms/type/ts';

export type AboutPageResponse = {
    meta: AboutPageEntryMetaItem;
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const aboutPageEntry = (await bcms.entry.getBySlug(
        'about',
        'about-page',
    )) as AboutPageEntry;

    const aboutPageMeta = aboutPageEntry.meta.en as AboutPageEntryMetaItem;

    const res: AboutPageResponse = {
        meta: aboutPageMeta,
    };

    return res;
});
