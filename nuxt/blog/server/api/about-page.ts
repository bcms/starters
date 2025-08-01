import { EntryContentParsedItem } from '@thebcms/types';
import { AboutPageEntry, AboutPageEntryMetaItem } from '~/bcms/type/ts';

export type AboutPageResponse = {
    meta: AboutPageEntryMetaItem;
    content: EntryContentParsedItem[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const aboutPage = (await bcms.entry.getBySlug(
        'about',
        'about-page',
    )) as AboutPageEntry;

    const res: AboutPageResponse = {
        meta: aboutPage.meta.en as AboutPageEntryMetaItem,
        content: aboutPage.content.en as EntryContentParsedItem[],
    };

    return res;
});
