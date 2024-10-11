import React from 'react';
import BlogCard from '../components/blog/Card';
import Tag from '../components/Tag';
import { BlogEntryMetaItem } from '../../bcms/types/ts';
import PageWrapper from '../components/PageWrapper';
import { ClientConfig } from '@thebcms/client';

export interface BlogTemplateProps {
    pageContext: {
        items: BlogEntryMetaItem[];
        bcmsConfig: ClientConfig;
    };
}

const BlogsPage: React.FC<BlogTemplateProps> = (props) => {
    const items = props.pageContext.items;

    return (
        <PageWrapper title={`Blogs - Simple Blog`}>
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
                                return (
                                    <BlogCard
                                        bcmsConfig={
                                            props.pageContext.bcmsConfig
                                        }
                                        key={index}
                                        blog={item}
                                    />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default BlogsPage;
