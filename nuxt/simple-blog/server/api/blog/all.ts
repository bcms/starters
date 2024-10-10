import { bcms } from '~/bcms-client';
import type { BlogEntry, BlogEntryMetaItem } from '~/bcms/types/ts';

export type BlogsResponse = {
    items: BlogEntryMetaItem[];
};

export default defineEventHandler(async () => {
    const blogs = (await bcms.entry.getAll('blog')) as BlogEntry[];

    const res: BlogsResponse = {
        items: blogs.map((blogEntry) => {
            return blogEntry.meta.en as BlogEntryMetaItem;
        }),
    };

    return res;
});
