import { bcms } from '~/bcms-client';
import type { BlogEntry, BlogEntryMetaItem } from '~/bcms/types/ts';
import { EntryContentParsedItem } from '@thebcms/types';
import { ClientConfig } from '@thebcms/client';

export type BlogResponse = {
    item: {
        meta: BlogEntryMetaItem;
        content: EntryContentParsedItem[];
    };
    otherBlogs: BlogEntry[];
    bcms: ClientConfig;
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
        otherBlogs: blogs.filter((e) => e.meta.en?.slug !== slug),
        bcms: bcms.getConfig(),
    };
    return res;
});
