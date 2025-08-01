import {
    BlogEntry,
    BlogsPageEntry,
    BlogsPageEntryMetaItem,
} from '~/bcms/type/ts';
import { BlogLite, blogToLite } from '~/utils/blog';

export type BlogsPageResponse = {
    meta: BlogsPageEntryMetaItem;
    blogs: BlogLite[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const blogsPage = (await bcms.entry.getBySlug(
        'blogs',
        'blogs-page',
    )) as BlogsPageEntry;
    const blogs = (await bcms.entry.getAll('blog')) as BlogEntry[];

    const res: BlogsPageResponse = {
        meta: blogsPage.meta.en as BlogsPageEntryMetaItem,
        blogs: blogs.map((blogEntry) => {
            return blogToLite(blogEntry);
        }),
    };

    return res;
});
