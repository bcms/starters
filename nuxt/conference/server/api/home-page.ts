import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import {
    HomePageEntry,
    HomePageEntryMetaItem,
    LegalEntry,
} from '~/bcms/types/ts';

export type HomePageResponse = {
    meta: HomePageEntryMetaItem;
    legalEntries: LegalEntry[];
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const homePage = (await bcms.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;
    const legalEntries = (await bcms.entry.getAll('legal')) as LegalEntry[];

    const res: HomePageResponse = {
        meta: homePage.meta.en as HomePageEntryMetaItem,
        legalEntries,
        bcms: bcms.getConfig(),
    };

    return res;
});
