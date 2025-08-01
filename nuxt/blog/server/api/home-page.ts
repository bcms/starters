import {
    BlogEntry,
    HomePageEntry,
    HomePageEntryMetaItem,
} from '~/bcms/type/ts';
import { BlogLite, blogToLite } from '~/utils/blog';

export type HomePageResponse = {
    meta: HomePageEntryMetaItem;
    blogs: BlogLite[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
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
    };

    return res;
});
