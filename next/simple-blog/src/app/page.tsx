import React from 'react';
import { bcms } from './bcms-client';
import { BlogEntry, BlogEntryMetaItem } from '../../bcms/types/ts';
import { Metadata } from 'next';
import BlogCard from '@/components/blog/Card';
import Tag from '@/components/Tag';

const pageTitle = 'Blogs - Simple Blog';
export const metadata: Metadata = {
    title: pageTitle,
    openGraph: {
        title: pageTitle,
    },
    twitter: {
        title: pageTitle,
    },
};

const HomePage: React.FC = async () => {
    const blogs = (await bcms.entry.getAll('blog')) as BlogEntry[];

    const items = blogs.map((blog) => {
        return blog.meta.en as BlogEntryMetaItem;
    });
    return (
        <div className="py-24 md:py-32">
            <div className="container">
                <div className="flex flex-col gap-6 items-center text-center mb-20 md:mb-[120px]">
                    <Tag size="lg">Hi, I’m Mark 👋</Tag>
                    <h1 className="text-4xl font-bold leading-none md:text-5xl">
                        This is my blog
                    </h1>
                </div>
                <div>
                    <div className="grid grid-cols-1 gap-12 max-w-[1040px] mx-auto">
                        {items.map((item, index) => {
                            return <BlogCard key={index} blog={item} />;
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
