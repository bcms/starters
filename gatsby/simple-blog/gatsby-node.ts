import { config } from 'dotenv';
config();
import { CreatePagesArgs } from 'gatsby';
import path from 'node:path';
import { BlogEntry, BlogEntryMetaItem } from './bcms/types/ts';
import { EntryContentParsedItem } from '@thebcms/types';
import { Client } from '@thebcms/client';

const bcms = new Client(
    process.env.BCMS_ORG_ID || '',
    process.env.BCMS_INSTANCE_ID || '',
    {
        id: process.env.BCMS_API_KEY_ID || '',
        secret: process.env.BCMS_API_KEY_SECRET || '',
    },
    {
        injectSvg: true,
    },
);

export const createPages = async ({
    actions: { createPage },
}: CreatePagesArgs) => {
    const blogsTemplate = path.resolve('./src/templates/blogs.tsx');
    const blogTemplate = path.resolve('./src/templates/blog.tsx');
    const blogEntries = (await bcms.entry.getAll('blog')) as BlogEntry[];
    const blogs: Array<{
        meta: BlogEntryMetaItem;
        content: EntryContentParsedItem[];
    }> = [];
    for (let i = 0; i < blogEntries.length; i++) {
        const blogEntry = blogEntries[i];
        const meta = blogEntry.meta.en as BlogEntryMetaItem;
        createPage({
            path: `/blog/${meta.slug}`,
            component: blogTemplate,
            context: {
                data: {
                    meta,
                    content: blogEntry.content.en as EntryContentParsedItem[],
                },
            },
        });
        blogs.push({
            meta,
            content: blogEntry.content.en as EntryContentParsedItem[],
        });
    }
    createPage({
        path: '/',
        component: blogsTemplate,
        context: {
            items: blogs.map((blog) => {
                return {
                    title: blog.meta.title,
                    slug: blog.meta.slug,
                };
            }),
        },
    });
};
