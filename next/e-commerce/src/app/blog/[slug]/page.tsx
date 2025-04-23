import React from 'react';
import Link from 'next/link';
import { BlogEntry, BlogEntryMetaItem } from '@bcms-types/types/ts';
import { EntryContentParsedItem } from '@thebcms/types';
import { notFound } from 'next/navigation';
import { BCMSImage } from '@thebcms/components-react';
import { Metadata } from 'next';
import { ContentManager } from '@/components/ContentManager';
import Card from '../components/Card';
import './style.scss';
import { bcmsPrivate } from '@/app/bcms-private';
import { bcmsPublic } from '@/app/bcms-public';

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
    const blogs = (await bcmsPrivate.entry.getAll('blog')) as BlogEntry[];
    const blog = blogs.find((e) => e.meta.en?.slug === params.slug);

    if (!blog) {
        return notFound();
    }

    const blogEntryMeta = blog.meta.en as BlogEntryMetaItem;
    const pageTitle = `${blogEntryMeta?.seo?.title || blogEntryMeta.title} - Moda`;

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
    const blogs = (await bcmsPrivate.entry.getAll('blog')) as BlogEntry[];
    const blog = blogs.find((e) => e.meta.en?.slug === params.slug);

    if (!blog) {
        return notFound();
    }

    const data = {
        meta: blog.meta.en as BlogEntryMetaItem,
        content: blog.content.en as EntryContentParsedItem[],
    };

    const otherBlogs = blogs
        .filter((e) => e.meta.en?.slug !== blog.meta.en?.slug)
        .map((e) => e.meta.en as BlogEntryMetaItem)
        .sort((a, b) => b.date.timestamp - a.date.timestamp)
        .slice(0, 3);

    const formattedDate = (date: number) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <div>
            <div className="container pb-14 md:pb-20 lg:pb-[136px]">
                <div className="relative flex items-end p-4 min-h-[300px] max-w-full aspect-[2.47] mb-10 lg:p-12">
                    <div className="relative z-10">
                        <div className="flex items-center gap-1.5 leading-none tracking-[-2%] text-appGray-300 mb-2.5 md:text-lg">
                            <div>{formattedDate(data.meta.date.timestamp)}</div>
                            <div className="w-1 h-1 rounded-full bg-current mt-1" />
                            <div>By {data.meta.author.meta.en?.title}</div>
                        </div>
                        <h1 className="text-2xl leading-none tracking-[-2%] text-white mb-3 lg:text-[40px]">
                            {data.meta.title}
                        </h1>
                    </div>
                    <div className="absolute top-0 left-0 size-full">
                        <BCMSImage
                            media={data.meta.media_image}
                            clientConfig={bcmsPublic.getConfig()}
                            className="size-full object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="grid grid-cols-1 gap-10 items-start lg:grid-cols-[1fr,400px] lg:gap-16 xl:grid-cols-[1fr,600px]">
                    <ContentManager
                        items={data.content}
                        className="blog--content"
                    />
                    <div className="border border-appGray-300 p-4 lg:p-8">
                        <div className="flex flex-col items-center gap-5 justify-between text-xl leading-none tracking-[-2%] mb-6 lg:text-[24px] lg:flex-row">
                            <div>Others you may like</div>
                            <Link href="/blog" className="underline">
                                See all
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-8">
                            {otherBlogs.map((e, index) => {
                                return (
                                    <Card
                                        key={index}
                                        card={e}
                                        bcms={bcmsPublic.getConfig()}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPage;
