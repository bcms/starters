import { BlogEntry, BlogEntryMetaItem } from '~/bcms/type/ts';

export type BlogsPageResponse = {
    blogs: BlogEntryMetaItem[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const blogs = (await bcms.entry.getAll('blog')) as BlogEntry[];

    const res: BlogsPageResponse = {
        blogs: blogs
            .map((e) => e.meta.en as BlogEntryMetaItem)
            .sort((a, b) => b.date.timestamp - a.date.timestamp),
    };

    return res;
});
