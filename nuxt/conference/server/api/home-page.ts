import {
    HomePageEntry,
    HomePageEntryMetaItem,
    LegalEntry,
} from '~/bcms/type/ts';

export type HomePageResponse = {
    meta: HomePageEntryMetaItem;
    legalEntries: LegalEntry[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const homePage = (await bcms.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;
    const legalEntries = (await bcms.entry.getAll('legal')) as LegalEntry[];

    const res: HomePageResponse = {
        meta: homePage.meta.en as HomePageEntryMetaItem,
        legalEntries,
    };

    return res;
});
