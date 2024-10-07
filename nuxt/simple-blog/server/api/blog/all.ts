import { bcms } from '~/bcms-client';
import type { BlogEntry, BlogEntryMetaItem } from '~/bcms/types/ts';

export type BlogsResponse = {
    items: Array<{
        title: string;
        slug: string;
    }>;
};

export default defineEventHandler(async (event) => {
    const blogs = (await bcms.entry.getAll('blog')) as BlogEntry[];
    const res: BlogsResponse = {
        items: blogs.map((blogEntry) => {
            const meta = blogEntry.meta.en as BlogEntryMetaItem;
            return {
                title: meta.title,
                slug: meta.slug,
            };
        }),
    };
    return res;
});
