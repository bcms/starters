import React from 'react';
import Link from 'next/link';
import { BlogEntryMetaItem } from '@bcms-types/types/ts';
import { BCMSImage } from '@thebcms/components-react';
import { bcms } from '@/app/bcms-client';
import ContentManager from '../ContentManager';
import { toReadableDate } from '@/utils/date';
import Tag from '../Tag';

interface BlogCardProps {
    blog: BlogEntryMetaItem;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog }) => {
    return (
        <article>
            <Link
                href={`/blog/${blog.slug}`}
                className="group w-full grid grid-cols-1 gap-6 border border-solid border-appGray-200 rounded-2xl overflow-hidden md:gap-12 md:grid-cols-[45%,55%]"
            >
                <div className="aspect-[1.25] self-stretch overflow-hidden">
                    <BCMSImage
                        clientConfig={bcms.getConfig()}
                        media={blog.cover_image}
                        className="size-full object-cover transition-transform duration-500 object-center group-hover:scale-105 group-focus-visible:scale-105"
                    />
                </div>
                <div className="flex flex-col self-center max-md:px-4 max-md:pb-4">
                    <h3 className="text-2xl font-semibold leading-none mb-4">
                        {blog.title}
                    </h3>
                    <div className="flex items-center flex-wrap gap-2 mb-8">
                        {blog.category.map((category, index) => {
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
                            <circle cx="2.5" cy="2.5" r="2.5" fill="#D9D9D9" />
                        </svg>
                        <div className="leading-none">
                            {toReadableDate(blog.date)}
                        </div>
                    </div>
                    <ContentManager
                        items={blog.description.nodes}
                        className="text-appGray-300 font-medium leading-[1.38] tracking-[-0.36px] md:text-lg"
                    />
                </div>
            </Link>
        </article>
    );
};

export default BlogCard;
