import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { BlogPageContent } from '../types/page/blog';
import ContentManager from '../components/ContentManager';
import { BCMSImage } from '@thebcms/components-react';
import { Link } from 'gatsby';
import Card from '../components/blog-page/Card';

export interface BlogTemplateProps {
    pageContext: BlogPageContent;
}

const BlogTemplate: React.FC<BlogTemplateProps> = ({
    pageContext: { meta, content, otherBlogs, bcms },
}) => {
    const formattedDate = (date: number) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <PageWrapper title={`${meta.seo?.title || meta.title} - Moda`}>
            <div className="container pb-14 md:pb-20 lg:pb-[136px]">
                <div className="relative flex items-end p-4 min-h-[300px] max-w-full aspect-[2.47] mb-10 lg:p-12">
                    <div className="relative z-10">
                        <div className="flex items-center gap-1.5 leading-none tracking-[-2%] text-appGray-300 mb-2.5 md:text-lg">
                            <div>{formattedDate(meta.date.timestamp)}</div>
                            <div className="w-1 h-1 rounded-full bg-current mt-1" />
                            <div>By {meta.author.meta.en?.title}</div>
                        </div>
                        <h1 className="text-2xl leading-none tracking-[-2%] text-white mb-3 lg:text-[40px]">
                            {meta.title}
                        </h1>
                    </div>
                    <div className="absolute top-0 left-0 size-full">
                        <BCMSImage
                            media={meta.media_image}
                            clientConfig={bcms}
                            className="size-full object-cover"
                        />
                    </div>
                    <div className="absolute inset-0 bg-black/50" />
                </div>
                <div className="grid grid-cols-1 gap-10 items-start lg:grid-cols-[1fr,400px] lg:gap-16 xl:grid-cols-[1fr,600px]">
                    <ContentManager items={content} className="blog--content" />
                    <div className="border border-appGray-300 p-4 lg:p-8">
                        <div className="flex flex-col items-center gap-5 justify-between text-xl leading-none tracking-[-2%] mb-6 lg:text-[24px] lg:flex-row">
                            <div>Others you may like</div>
                            <Link to="/blog" className="underline">
                                See all
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 gap-8">
                            {otherBlogs.map((e, index) => {
                                return (
                                    <Card key={index} card={e} bcms={bcms} />
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </PageWrapper>
    );
};

export default BlogTemplate;
