import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import { AboutPageEntry, AboutPageEntryMetaItem } from '~/bcms/types/ts';

export type AboutUsPageResponse = {
    meta: AboutPageEntryMetaItem;
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const aboutPageEntry = (await bcms.entry.getBySlug(
        'about-us',
        'about-page',
    )) as AboutPageEntry;

    const aboutPageMeta = aboutPageEntry.meta.en as AboutPageEntryMetaItem;

    const res: AboutUsPageResponse = {
        meta: aboutPageMeta,
        bcms: bcms.getConfig(),
    };

    return res;
});
