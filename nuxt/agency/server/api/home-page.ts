import { HomePageEntry, HomePageEntryMetaItem } from '~/bcms/type/ts';

export type HomePageResponse = {
    meta: HomePageEntryMetaItem;
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const homePageEntry = (await bcms.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;

    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;

    const res: HomePageResponse = {
        meta: homePageMeta,
    };

    return res;
});
