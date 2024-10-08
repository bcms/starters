import { BlogEntryMetaItem } from '../../bcms/types/ts';
import { EntryContentParsedItem } from '@thebcms/types';
import React from 'react';
import { Link } from 'gatsby';

export interface BlogTemplateProps {
    pageContext: {
        data: {
            meta: BlogEntryMetaItem;
            content: EntryContentParsedItem[];
        };
    };
}

const BlogTemplate: React.FC<BlogTemplateProps> = (props) => {
    const data = props.pageContext.data;

    return (
        <div>
            <Link to={`/`}>Back to home</Link>
            <pre>{JSON.stringify(data, null, 4)}</pre>
        </div>
    );
};

export default BlogTemplate;
