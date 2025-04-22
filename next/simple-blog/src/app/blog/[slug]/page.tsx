import React from 'react';
import Link from 'next/link';
import { BlogEntry, BlogEntryMetaItem } from '@bcms-types/types/ts';
import { EntryContentParsedItem } from '@thebcms/types';
import { bcms } from '@/app/bcms-client';
import { notFound } from 'next/navigation';
import Tag from '@/components/Tag';
import { toReadableDate } from '@/utils/date';
import { BCMSImage } from '@thebcms/components-react';
import ContentManager from '@/components/ContentManager';
import { Metadata } from 'next';
import BlogCard from '@/components/blog/Card';

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateStaticParams() {
    const blogs = (await bcms.entry.getAll('blog')) as BlogEntry[];

    return blogs.map((blog) => {
        const meta = blog.meta.en as BlogEntryMetaItem;
        return {
            slug: meta.slug,
        };
    });
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const blog = (await bcms.entry.getBySlug(params.slug, 'blog')) as BlogEntry;

    if (!blog) {
        return notFound();
    }

    const blogEntryMeta = blog.meta.en as BlogEntryMetaItem;
    const pageTitle = `${blogEntryMeta?.title} - Simple Blog`;

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
    const blogs = (await bcms.entry.getAll('blog')) as BlogEntry[];

    const blog = blogs.find((e) => e.meta.en?.slug === params.slug);

    if (!blog) {
        return notFound();
    }
    const data = {
        meta: blog.meta.en as BlogEntryMetaItem,
        content: blog.content.en as EntryContentParsedItem[],
    };

    const otherBlogs = blogs
        .filter((e) => e.meta.en?.slug !== params.slug)
        .slice(0, 2);

    return (
        <div className="py-24 md:py-32">
            <div className="container">
                <Link
                    href="/"
                    className="border border-appGray-200 bg-appGray-100 flex w-fit leading-none px-3 py-2 text-xl font-medium rounded-lg transition-colors duration-300 hover:bg-appGray-200 focus-visible:bg-appGray-200 mb-14 md:mb-20 md:px-5 md:py-4 md:text-2xl"
                >
                    Back to home
                </Link>
                <div>
                    <header className="mb-10 md:mb-16">
                        <div className="flex flex-col gap-5 mb-8 md:flex-row md:items-center md:justify-between">
                            <h1 className="text-3xl font-semibold leading-none md:text-[40px]">
                                {data.meta.title}
                            </h1>
                            <div className="flex items-center flex-wrap gap-2">
                                {data.meta.category.map((category, index) => {
                                    return (
                                        <Tag key={index} className="capitalize">
                                            {category.toLowerCase()}
                                        </Tag>
                                    );
                                })}
                                <svg
                                    width="5"
                                    height="5"
                                    viewBox="0 0 5 5"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <circle
                                        cx="2.5"
                                        cy="2.5"
                                        r="2.5"
                                        fill="#D9D9D9"
                                    />
                                </svg>
                                <div className="leading-none">
                                    {toReadableDate(data.meta.date)}
                                </div>
                            </div>
                        </div>
                        <BCMSImage
                            clientConfig={bcms.getConfig()}
                            media={data.meta.cover_image}
                            className="w-full aspect-[2.21] object-cover rounded-2xl md:rounded-3xl"
                        />
                    </header>
                    <ContentManager
                        items={data.content}
                        className="prose max-w-full lg:prose-lg"
                    />
                </div>
                {otherBlogs.length > 0 && (
                    <div className="max-w-[1040px] mt-20">
                        <h3 className="text-xl font-semibold leading-none tracking-[-0.24px] mb-8 md:mb-12 md:text-2xl">
                            See my other blogs
                        </h3>
                        <div className="grid grid-cols-1 gap-12">
                            {otherBlogs.map((blog, index) => {
                                return (
                                    <BlogCard
                                        key={index}
                                        blog={blog.meta.en as BlogEntryMetaItem}
                                    />
                                );
                            })}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
