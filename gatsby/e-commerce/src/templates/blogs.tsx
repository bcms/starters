import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { BlogsPageContent } from '../types';
import List from '../components/blog-page/List';

export interface BlogsTemplateProps {
    pageContext: BlogsPageContent;
}

const BlogsTemplate: React.FC<BlogsTemplateProps> = ({
    pageContext: { blogs, bcms },
}) => {
    return (
        <PageWrapper title={`Blogs - Moda`}>
            <div className="container pb-14 md:pb-20 lg:pb-[136px]">
                <List blogs={blogs} bcms={bcms} />
            </div>
        </PageWrapper>
    );
};

export default BlogsTemplate;
