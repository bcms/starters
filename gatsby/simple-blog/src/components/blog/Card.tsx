import React from 'react';
import { BCMSImage } from '@thebcms/components-react';
import ContentManager from '../ContentManager';
import Tag from '../Tag';
import { Link } from 'gatsby';
import { BlogEntryMetaItem } from '../../../bcms/types/ts';
import { toReadableDate } from '../../utils/date';
import { ClientConfig } from '@thebcms/client';

interface BlogCardProps {
    blog: BlogEntryMetaItem;
    bcmsConfig: ClientConfig;
}

const BlogCard: React.FC<BlogCardProps> = ({ blog, bcmsConfig }) => {
    return (
        <article>
            <Link
                to={`/blog/${blog.slug}`}
                className="group w-full grid grid-cols-1 border border-solid border-appGray-200 rounded-2xl overflow-hidden md:grid-cols-[45%,55%]"
            >
                <div className="aspect-[1.25] self-stretch overflow-hidden">
                    <BCMSImage
                        clientConfig={bcmsConfig}
                        media={blog.cover_image}
                        className="size-full object-cover transition-transform duration-500 object-center group-hover:scale-105 group-focus-visible:scale-105"
                    />
                </div>
                <div className="flex flex-col self-center pt-6 max-md:px-4 max-md:pb-4 md:px-12">
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
