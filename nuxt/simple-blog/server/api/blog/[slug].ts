import type { BlogEntry, BlogEntryMetaItem } from '~/bcms/type/ts';
import { EntryContentParsedItem } from '@thebcms/types';

export type BlogResponse = {
    item: {
        meta: BlogEntryMetaItem;
        content: EntryContentParsedItem[];
    };
    otherBlogs: BlogEntry[];
};

export default defineEventHandler(async (event) => {
    const bcms = useBcmsPrivate();
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
    };
    return res;
});
