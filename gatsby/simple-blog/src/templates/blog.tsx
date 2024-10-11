import { BlogEntryMetaItem } from '../../bcms/types/ts';
import { EntryContentParsedItem } from '@thebcms/types';
import React from 'react';
import { Link } from 'gatsby';
import Tag from '../components/Tag';
import { toReadableDate } from '../utils/date';
import { BCMSImage } from '@thebcms/components-react';
import ContentManager from '../components/ContentManager';
import BlogCard from '../components/blog/Card';
import PageWrapper from '../components/PageWrapper';
import { ClientConfig } from '@thebcms/client';

export interface BlogTemplateProps {
    pageContext: {
        data: {
            meta: BlogEntryMetaItem;
            content: EntryContentParsedItem[];
            otherBlogs: BlogEntryMetaItem[];
            bcmsConfig: ClientConfig;
        };
    };
}

const BlogTemplate: React.FC<BlogTemplateProps> = (props) => {
    const data = props.pageContext.data;

    return (
        <PageWrapper title={`${data.meta.title} - Simple Blog`}>
            <div className="py-24 md:py-32">
                <div className="container">
                    <Link
                        to="/"
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
                                    {data.meta.category.map(
                                        (category, index) => {
                                            return (
                                                <Tag
                                                    key={index}
                                                    className="capitalize"
                                                >
                                                    {category.toLowerCase()}
                                                </Tag>
                                            );
                                        },
                                    )}
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
                                clientConfig={props.pageContext.data.bcmsConfig}
                                media={data.meta.cover_image}
                                className="w-full aspect-[2.21] object-cover rounded-2xl md:rounded-3xl"
                            />
                        </header>
                        <ContentManager
                            items={data.content}
                            className="prose max-w-full lg:prose-lg"
                        />
                    </div>
                    {data.otherBlogs.length > 0 && (
                        <div className="max-w-[1040px] mt-20">
                            <h3 className="text-xl font-semibold leading-none tracking-[-0.24px] mb-8 md:mb-12 md:text-2xl">
                                See my other blogs
                            </h3>
                            <div className="grid grid-cols-1 gap-12">
                                {data.otherBlogs
                                    .slice(0, 2)
                                    .map((blog, index) => {
                                        return (
                                            <BlogCard
                                                bcmsConfig={
                                                    props.pageContext.data
                                                        .bcmsConfig
                                                }
                                                key={index}
                                                blog={blog}
                                            />
                                        );
                                    })}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PageWrapper>
    );
};

export default BlogTemplate;
