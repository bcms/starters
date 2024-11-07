import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import {
    BlogEntry,
    HomePageEntry,
    HomePageEntryMetaItem,
} from '~/bcms/types/ts';
import { BlogLite, blogToLite } from '~/utils/blog';

export type HomePageResponse = {
    meta: HomePageEntryMetaItem;
    blogs: BlogLite[];
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const homePage = (await bcms.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;
    const blogs = (await bcms.entry.getAll('blog')) as BlogEntry[];

    const res: HomePageResponse = {
        meta: homePage.meta.en as HomePageEntryMetaItem,
        blogs: blogs.map((blogEntry) => {
            return blogToLite(blogEntry);
        }),
        bcms: bcms.getConfig(),
    };

    return res;
});
