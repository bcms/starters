import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { BlogsPageContent } from '../types';
import { TopGradient } from '../components/TopGradient';
import List from '../components/blog/List';

export interface BlogsTemplateProps {
    pageContext: BlogsPageContent;
}

const BlogsTemplate: React.FC<BlogsTemplateProps> = ({
    pageContext: { meta, blogs, bcms },
}) => {
    return (
        <PageWrapper
            title={`${meta.seo?.title || meta.title} - Insightfull Ink`}
        >
            <div className="relative pt-10 pb-8 md:pt-[72px] md:pb-10 lg:pb-12">
                <div className="container">
                    <div>
                        <div className="flex flex-col-reverse items-center text-center md:gap-4">
                            <h1 className="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none">
                                {meta.title}
                            </h1>
                            <h2 className="text-sm leading-none tracking-[-0.41px] text-appGray-600 mb-2.5 md:text-base md:leading-none lg:text-xl lg:leading-none lg:mb-5">
                                {meta.subtitle}
                            </h2>
                        </div>
                    </div>
                </div>
                <TopGradient />
            </div>
            <List blogs={blogs} bcms={bcms} />
        </PageWrapper>
    );
};

export default BlogsTemplate;
