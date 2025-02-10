import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import { BlogEntry, BlogEntryMetaItem } from '~/bcms/types/ts';

export type BlogsPageResponse = {
    blogs: BlogEntryMetaItem[];
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const blogs = (await bcms.entry.getAll('blog')) as BlogEntry[];

    const res: BlogsPageResponse = {
        blogs: blogs
            .map((e) => e.meta.en as BlogEntryMetaItem)
            .sort((a, b) => b.date.timestamp - a.date.timestamp),
        bcms: bcms.getConfig(),
    };

    return res;
});
