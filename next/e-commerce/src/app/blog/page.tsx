import React from 'react';
import { BlogEntry, BlogEntryMetaItem } from '@bcms-types/types/ts';
import { Metadata } from 'next';
import List from './components/List';
import { bcmsPrivate } from '@/app/bcms-private';
import { bcmsPublic } from '@/app/bcms-public';

const pageTitle = 'Blogs - Moda';
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
    const blogs = ((await bcmsPrivate.entry.getAll('blog')) as BlogEntry[])
        .map((e) => e.meta.en as BlogEntryMetaItem)
        .sort((a, b) => b.date.timestamp - a.date.timestamp);

    return (
        <div>
            <div className="container pb-14 md:pb-20 lg:pb-[136px]">
                <List blogs={blogs} bcms={bcmsPublic.getConfig()} />
            </div>
        </div>
    );
};

export default BlogsPage;
