import React from 'react';
import { Link } from 'gatsby';
import { toReadableDate } from '../utils/date';
import { BCMSImage } from '@thebcms/components-react';
import ContentManager from '../components/ContentManager';
import PageWrapper from '../components/PageWrapper';
import { BlogPageContent } from '../types';
import { BlogsCard } from '../components/blog/Card';
import { TopGradient } from '../components/TopGradient';
import ArrowIcon from '../assets/icons/arrow.inline.svg';

export interface BlogTemplateProps {
    pageContext: BlogPageContent;
}

const BlogTemplate: React.FC<BlogTemplateProps> = ({
    pageContext: { meta, content, blogs, bcms },
}) => {
    return (
        <PageWrapper title={`${meta.title} - Insightfull Ink`}>
            <div className="relative pt-10 pb-8 md:py-[72px] lg:pb-[104px]">
                <div className="container">
                    <div className="md:mb-20 lg:mb-[128px]">
                        <div className="flex flex-col items-center mb-8 md:mb-14 lg:mb-20">
                            <div className="text-sm leading-none tracking-[-0.41px] text-appGray-600 mb-2.5 md:text-base md:leading-none lg:text-xl lg:leading-none lg:mb-5">
                                {toReadableDate(meta.date.timestamp)}
                            </div>
                            <h1 className="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none">
                                {meta.title}
                            </h1>
                        </div>
                        <BCMSImage
                            media={meta.cover_image}
                            clientConfig={bcms}
                            className="aspect-[2.07] rounded-lg overflow-hidden w-full object-cover mb-6 md:mb-8 lg:aspect-[2.43] lg:rounded-2xl lg:mb-12"
                        />
                        <ContentManager items={content} className="prose" />
                    </div>
                    <div className="max-md:hidden">
                        <div className="flex items-center justify-between mb-8 lg:mb-12">
                            <h2 className="text-lg leading-none font-medium tracking-[-0.41px] lg:text-[32px] lg:leading-none">
                                Other posts
                            </h2>
                            <Link
                                to="/blog"
                                className="flex items-center px-[15px] py-2.5 bg-appAccent rounded-[32px]"
                            >
                                <span className="leading-none tracking-[-0.41px] mr-2 lg:text-xl lg:leading-none">
                                    See all posts
                                </span>
                                <ArrowIcon className="w-[14px] h-[14px] md:w-4 md:h-4 lg:w-5 lg:h-5" />
                            </Link>
                        </div>
                        <div className="grid grid-cols-2 auto-rows-fr gap-6 p-4 border border-appGray-300 rounded-2xl lg:grid-cols-3 xl:gap-10 xl:p-8">
                            {blogs.map((blog, index) => (
                                <BlogsCard
                                    key={index}
                                    blog={blog}
                                    bcms={bcms}
                                />
                            ))}
                        </div>
                    </div>
                </div>
                <TopGradient />
            </div>
        </PageWrapper>
    );
};

export default BlogTemplate;
