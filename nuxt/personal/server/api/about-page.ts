import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import { AboutPageEntry, AboutPageEntryMetaItem } from '~/bcms/types/ts';

export type AboutPageResponse = {
    meta: AboutPageEntryMetaItem;
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const aboutPageEntry = (await bcms.entry.getBySlug(
        'about',
        'about-page',
    )) as AboutPageEntry;

    const aboutPageMeta = aboutPageEntry.meta.en as AboutPageEntryMetaItem;

    const res: AboutPageResponse = {
        meta: aboutPageMeta,
        bcms: bcms.getConfig(),
    };

    return res;
});
