import {
    BlogEntry,
    BlogEntryMetaItem,
    BlogEntryMetaItemCategory,
} from '@bcms-types/types/ts';
import { PropMediaDataParsed, PropRichTextDataParsed } from '@thebcms/types';

export interface BlogLite {
    title: string;
    slug: string;
    cover: PropMediaDataParsed;
    description: PropRichTextDataParsed;
    date: number;
    category: BlogEntryMetaItemCategory;
}

export const blogToLite = (blog: BlogEntry): BlogLite => {
    const meta = blog.meta.en as BlogEntryMetaItem;
    return {
        title: meta.title,
        slug: meta.slug,
        cover: meta.cover_image,
        description: meta.description,
        date: meta.date.timestamp,
        category: meta.category,
    };
};
