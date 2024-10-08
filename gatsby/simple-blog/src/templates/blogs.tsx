import React from 'react';
import { Link } from 'gatsby';

export interface BlogTemplateProps {
    pageContext: {
        items: Array<{
            title: string;
            slug: string;
        }>;
    };
}

const BlogsPage: React.FC<BlogTemplateProps> = (props) => {
    const items = props.pageContext.items;

    return (
        <div>
            <h1>Blogs</h1>
            <ul>
                {items.map((item, itemIdx) => {
                    return (
                        <li key={itemIdx}>
                            <Link to={`/blog/${item.slug}`}>{item.title}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default BlogsPage;
