import { AboutPageEntry, AboutPageEntryMetaItem } from '~/bcms/type/ts';

export type AboutUsPageResponse = {
    meta: AboutPageEntryMetaItem;
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const aboutPageEntry = (await bcms.entry.getBySlug(
        'about-us',
        'about-page',
    )) as AboutPageEntry;

    const aboutPageMeta = aboutPageEntry.meta.en as AboutPageEntryMetaItem;

    const res: AboutUsPageResponse = {
        meta: aboutPageMeta,
    };

    return res;
});
