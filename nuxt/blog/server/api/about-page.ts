import { ClientConfig } from '@thebcms/client';
import { EntryContentParsedItem } from '@thebcms/types';
import { bcms } from '~/bcms-client';
import { AboutPageEntry, AboutPageEntryMetaItem } from '~/bcms/types/ts';

export type AboutPageResponse = {
    meta: AboutPageEntryMetaItem;
    content: EntryContentParsedItem[];
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const aboutPage = (await bcms.entry.getBySlug(
        'about',
        'about-page',
    )) as AboutPageEntry;

    const res: AboutPageResponse = {
        meta: aboutPage.meta.en as AboutPageEntryMetaItem,
        content: aboutPage.content.en as EntryContentParsedItem[],
        bcms: bcms.getConfig(),
    };

    return res;
});
