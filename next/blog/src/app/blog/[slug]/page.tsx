import React from 'react';
import Link from 'next/link';
import { BlogEntry, BlogEntryMetaItem } from '@bcms-types/types/ts';
import { EntryContentParsedItem } from '@thebcms/types';
import { bcmsPrivate } from '@/app/bcms-private';
import { notFound } from 'next/navigation';
import { toReadableDate } from '@/utils/date';
import { BCMSImage } from '@thebcms/components-react';
import { Metadata } from 'next';
import { ContentManager } from '@/components/ContentManager';
import ArrowIcon from '@/assets/icons/arrow.svg';
import { blogToLite } from '@/utils/blog';
import { TopGradient } from '@/components/TopGradient';
import { bcmsPublic } from '@/app/bcms-public';
import { BlogCard } from '@/components/blogs/Card';

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateStaticParams() {
    const blogs = (await bcmsPrivate.entry.getAll('blog')) as BlogEntry[];

    return blogs.map((blog) => {
        const meta = blog.meta.en as BlogEntryMetaItem;
        return {
            slug: meta.slug,
        };
    });
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const blog = (await bcmsPrivate.entry.getBySlug(
        params.slug,
        'blog',
    )) as BlogEntry;

    if (!blog) {
        return notFound();
    }

    const blogEntryMeta = blog.meta.en as BlogEntryMetaItem;
    const pageTitle = `${blogEntryMeta?.title} - Insightfull Ink`;

    return {
        title: pageTitle,
        openGraph: {
            title: pageTitle,
        },
        twitter: {
            title: pageTitle,
        },
    };
}

const BlogPage: React.FC<Props> = async (props) => {
    const params = await props.params;
    const blogEntries = (await bcmsPrivate.entry.getAll('blog')) as BlogEntry[];

    const blogEntry = blogEntries.find((e) => e.meta.en?.slug === params.slug);

    if (!blogEntry) {
        return notFound();
    }
    const data = {
        meta: blogEntry.meta.en as BlogEntryMetaItem,
        content: blogEntry.content.en as EntryContentParsedItem[],
    };

    const otherBlogs = blogEntries
        .filter((e) => e.meta.en?.slug !== params.slug)
        .map((e) => blogToLite(e));

    return (
        <div>
            <div className="relative pt-10 pb-8 md:py-[72px] lg:pb-[104px]">
                <div className="container">
                    <div className="md:mb-20 lg:mb-[128px]">
                        <div className="flex flex-col items-center mb-8 md:mb-14 lg:mb-20">
                            <div className="text-sm leading-none tracking-[-0.41px] text-appGray-600 mb-2.5 md:text-base md:leading-none lg:text-xl lg:leading-none lg:mb-5">
                                {toReadableDate(data.meta.date.timestamp)}
                            </div>
                            <h1 className="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none">
                                {data.meta.title}
                            </h1>
                        </div>
                        <BCMSImage
                            media={data.meta.cover_image}
                            clientConfig={bcmsPublic.getConfig()}
                            className="aspect-[2.07] rounded-lg overflow-hidden w-full object-cover mb-6 md:mb-8 lg:aspect-[2.43]
                        lg:rounded-2xl lg:mb-12"
                        />
                        <ContentManager
                            items={data.content}
                            className="prose"
                        />
                    </div>
                    <div className="max-md:hidden">
                        <div className="flex items-center justify-between mb-8 lg:mb-12">
                            <h2 className="text-lg leading-none font-medium tracking-[-0.41px] lg:text-[32px] lg:leading-none">
                                Other posts
                            </h2>
                            <Link
                                href="/blog"
                                className="flex items-center px-[15px] py-2.5 bg-appAccent rounded-[32px]"
                            >
                                <span className="leading-none tracking-[-0.41px] mr-2 lg:text-xl lg:leading-none">
                                    See all posts
                                </span>
                                <ArrowIcon className="w-[14px] h-[14px] md:w-4 md:h-4 lg:w-5 lg:h-5" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 auto-rows-fr gap-6 p-4 border border-appGray-300 rounded-2xl lg:grid-cols-3 xl:gap-10 xl:p-8">
                            {otherBlogs.map((blog, index) => (
                                <BlogCard
                                    key={index}
                                    blog={blog}
                                    bcmsConfig={bcmsPublic.getConfig()}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <TopGradient />
            </div>
        </div>
    );
};

export default BlogPage;
