import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import {
    BlogEntry,
    BlogsPageEntry,
    BlogsPageEntryMetaItem,
} from '~/bcms/types/ts';
import { BlogLite, blogToLite } from '~/utils/blog';

export type BlogsPageResponse = {
    meta: BlogsPageEntryMetaItem;
    blogs: BlogLite[];
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
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
        bcms: bcms.getConfig(),
    };

    return res;
});
