import React from 'react';
import { Metadata } from 'next';
import {
    BlogEntry,
    HomePageEntry,
    HomePageEntryMetaItem,
} from '@bcms-types/types/ts';
import { notFound } from 'next/navigation';
import HomeHero from '@/components/home-page/Hero';
import { blogToLite } from '@/utils/blog';
import ArrowIcon from '@/assets/icons/arrow.svg';
import Link from 'next/link';
import { bcmsPrivate } from '@/app/bcms-private';
import { bcmsPublic } from '@/app/bcms-public';
import { BlogCard } from '@/components/blogs/Card';

const pageTitle = 'A Fashionable Journey Around the World - Insightfull Ink';
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
    const homePageEntry = (await bcmsPrivate.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;

    if (!homePageEntry) {
        return notFound();
    }
    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;
    const blogs = (await bcmsPrivate.entry.getAll('blog')) as BlogEntry[];

    const liteBlogs = blogs.map((blog) => {
        return blogToLite(blog);
    });

    const featuredLiteBlogs = liteBlogs.filter((blog) => {
        return homePageMeta.featured_blogs.find(
            (e) => e.meta.en?.slug === blog.slug,
        );
    });

    return (
        <div>
            <HomeHero
                title={homePageMeta.hero_title}
                subtitle={homePageMeta.hero_subtitle}
                blogs={featuredLiteBlogs}
                bcmsConfig={bcmsPublic.getConfig()}
            />
            <section className="pb-8 md:pb-20 lg:pb-[104px]">
                <div className="container">
                    <div className="flex items-center justify-between mb-6 md:mb-8 lg:mb-10">
                        <h2 className="leading-none font-medium tracking-[-0.41px] md:text-lg md:leading-none lg:text-[32px] lg:leading-none">
                            Recent post
                        </h2>
                        <Link
                            href="/blog"
                            className="flex items-center px-[15px] py-2.5 bg-appAccent rounded-[32px]"
                        >
                            <span className="text-sm leading-none tracking-[-0.41px] mr-1.5 md:text-base md:leading-none md:mr-2 lg:text-xl lg:leading-none">
                                See all posts
                            </span>
                            <ArrowIcon className="w-[14px] h-[14px] md:w-4 md:h-4 lg:w-5 lg:h-5" />
                        </Link>
                    </div>
                    <div className="grid grid-cols-1 auto-rows-fr gap-6 p-4 border border-appGray-300 rounded-2xl md:grid-cols-2 lg:grid-cols-3 xl:gap-10 xl:p-8">
                        {liteBlogs.map((blog, index) => (
                            <BlogCard
                                key={index}
                                bcmsConfig={bcmsPublic.getConfig()}
                                blog={blog}
                            />
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
