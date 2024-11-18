import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import { HomePageEntry, HomePageEntryMetaItem } from '~/bcms/types/ts';

export type HomePageResponse = {
    meta: HomePageEntryMetaItem;
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const homePageEntry = (await bcms.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;

    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;

    const res: HomePageResponse = {
        meta: homePageMeta,
        bcms: bcms.getConfig(),
    };

    return res;
});
