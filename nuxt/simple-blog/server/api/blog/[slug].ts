import { bcms } from '~/bcms-client';
import type { BlogEntry, BlogEntryMetaItem } from '~/bcms/types/ts';
import { EntryContentParsedItem } from '@thebcms/types';

export type BlogResponse = {
    item: {
        meta: BlogEntryMetaItem;
        content: EntryContentParsedItem[];
    };
};

export default defineEventHandler(async (event) => {
    const blogs = (await bcms.entry.getAll('blog')) as BlogEntry[];
    const slug = getRouterParam(event, 'slug');
    const blog = blogs.find((e) => e.meta.en?.slug === slug);
    if (!blog) {
        throw new Error(`Blog "${slug}" not found`);
    }
    const res: BlogResponse = {
        item: {
            meta: blog.meta.en as BlogEntryMetaItem,
            content: blog.content.en as EntryContentParsedItem[],
        },
    };
    return res;
});
