import { EntryContentParsedItem } from '@thebcms/types';
import { BlogEntry, BlogEntryMetaItem } from '~/bcms/type/ts';

export type BlogResponse = {
    meta: BlogEntryMetaItem;
    content: EntryContentParsedItem[];
    otherBlogs: BlogEntryMetaItem[];
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
        meta: blog.meta.en as BlogEntryMetaItem,
        content: blog.content.en as EntryContentParsedItem[],
        otherBlogs: blogs
            .filter((e) => e.meta.en?.slug !== blog.meta.en?.slug)
            .map((e) => e.meta.en as BlogEntryMetaItem)
            .sort((a, b) => b.date.timestamp - a.date.timestamp)
            .slice(0, 3),
    };

    return res;
});
