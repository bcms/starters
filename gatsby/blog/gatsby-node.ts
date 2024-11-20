import { config } from 'dotenv';
config();
import { CreatePagesArgs } from 'gatsby';
import path from 'node:path';
import {
    AboutPageEntry,
    AboutPageEntryMetaItem,
    BlogEntry,
    BlogEntryMetaItem,
    BlogsPageEntry,
    BlogsPageEntryMetaItem,
    ContactPageEntry,
    ContactPageEntryMetaItem,
    HomePageEntry,
    HomePageEntryMetaItem,
} from './bcms/types/ts';
import { Client } from '@thebcms/client';
import { blogToLite } from './src/utils/blog';
import {
    AboutPageContent,
    BlogPageContent,
    BlogsPageContent,
    ContactPageContent,
    HomePageContent,
} from './src/types';

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
    // HOME
    const homeTemplate = path.resolve('./src/templates/home.tsx');
    const homePageEntry = (await bcms.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;

    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;
    const blogs = (await bcms.entry.getAll('blog')) as BlogEntry[];

    const liteBlogs = blogs.map((blog) => {
        return blogToLite(blog);
    });

    const featuredLiteBlogs = liteBlogs.filter((blog) => {
        return homePageMeta.featured_blogs.find(
            (e) => e.meta.en?.slug === blog.slug,
        );
    });

    createPage({
        path: `/`,
        component: homeTemplate,
        context: {
            meta: homePageMeta,
            featuredBlogs: featuredLiteBlogs,
            blogs: liteBlogs,
            bcms: bcms.getConfig(),
        } as HomePageContent,
    });

    // BLOGS
    const blogsTemplate = path.resolve('./src/templates/blogs.tsx');
    const blogsPageEntry = (await bcms.entry.getBySlug(
        'blog',
        'blogs-page',
    )) as BlogsPageEntry;

    const blogsPageMeta = blogsPageEntry.meta.en as BlogsPageEntryMetaItem;

    createPage({
        path: `/blog`,
        component: blogsTemplate,
        context: {
            meta: blogsPageMeta,
            blogs: liteBlogs,
            bcms: bcms.getConfig(),
        } as BlogsPageContent,
    });

    // BLOG
    const blogTemplate = path.resolve('./src/templates/blog.tsx');
    blogs.forEach((blog) => {
        const meta = blog.meta.en as BlogEntryMetaItem;
        createPage({
            path: `/blog/${meta.slug}`,
            component: blogTemplate,
            context: {
                meta,
                content: blog.content.en,
                blogs: liteBlogs.filter((e) => e.slug !== meta.slug),
                bcms: bcms.getConfig(),
            } as BlogPageContent,
        });
    });

    // ABOUT
    const aboutTemplate = path.resolve('./src/templates/about.tsx');
    const aboutPageEntry = (await bcms.entry.getBySlug(
        'about',
        'about-page',
    )) as AboutPageEntry;

    const aboutPageMeta = aboutPageEntry.meta.en as AboutPageEntryMetaItem;

    createPage({
        path: `/about-me`,
        component: aboutTemplate,
        context: {
            meta: aboutPageMeta,
            content: aboutPageEntry.content.en,
            bcms: bcms.getConfig(),
        } as AboutPageContent,
    });

    // CONTACT
    const contactTemplate = path.resolve('./src/templates/contact.tsx');
    const contactPageEntry = (await bcms.entry.getBySlug(
        'contact',
        'contact-page',
    )) as ContactPageEntry;

    const contactPageMeta = contactPageEntry.meta
        .en as ContactPageEntryMetaItem;

    createPage({
        path: `/contact`,
        component: contactTemplate,
        context: {
            meta: contactPageMeta,
        } as ContactPageContent,
    });
};
