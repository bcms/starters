import React from 'react';
import { notFound } from 'next/navigation';
import {
    BlogEntry,
    BlogsPageEntry,
    BlogsPageEntryMetaItem,
} from '@bcms-types/types/ts';
import { TopGradient } from '@/components/TopGradient';
import List from './components/List';
import { blogToLite } from '@/utils/blog';
import { Metadata } from 'next';
import { bcmsPrivate } from '@/app/bcms-private';
import { bcmsPublic } from '@/app/bcms-public';

const pageTitle = 'Happy reading for my amazing journey - Insightfull Ink';
export const metadata: Metadata = {
    title: pageTitle,
    openGraph: {
        title: pageTitle,
    },
    twitter: {
        title: pageTitle,
    },
};

const BlogsPage: React.FC = async () => {
    const blogsPageEntry = (await bcmsPrivate.entry.getBySlug(
        'blog',
        'blogs-page',
    )) as BlogsPageEntry;

    if (!blogsPageEntry) {
        notFound();
    }

    const blogsPageMeta = blogsPageEntry.meta.en as BlogsPageEntryMetaItem;

    const blogs = (await bcmsPrivate.entry.getAll('blog')) as BlogEntry[];

    const blogsLite = blogs.map((blog) => blogToLite(blog));

    return (
        <div>
            <div className="relative pt-10 pb-8 md:pt-[72px] md:pb-10 lg:pb-12">
                <div className="container">
                    <div>
                        <div className="flex flex-col-reverse items-center text-center md:gap-4">
                            <h1 className="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none">
                                {blogsPageMeta.title}
                            </h1>
                            <h2 className="text-sm leading-none tracking-[-0.41px] text-appGray-600 mb-2.5 md:text-base md:leading-none lg:text-xl lg:leading-none lg:mb-5">
                                {blogsPageMeta.subtitle}
                            </h2>
                        </div>
                    </div>
                </div>
                <TopGradient />
            </div>
            <List blogs={blogsLite} bcmsConfig={bcmsPublic.getConfig()} />
        </div>
    );
};

export default BlogsPage;
