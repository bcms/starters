import { EntryContentParsedItem } from '@thebcms/types';
import { BlogEntry, BlogEntryMetaItem } from '~/bcms/type/ts';
import { BlogLite, blogToLite } from '~/utils/blog';

export type BlogResponse = {
    meta: BlogEntryMetaItem;
    content: EntryContentParsedItem[];
    otherBlogs: BlogLite[];
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
            .filter((e) => e.meta.en?.slug !== slug)
            .map((e) => blogToLite(e)),
    };

    return res;
});
