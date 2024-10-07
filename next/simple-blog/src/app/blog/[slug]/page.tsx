import React from 'react';
import Link from 'next/link';
import { bcms } from '../../../../bcms-client';
import { BlogEntry, BlogEntryMetaItem } from '../../../../bcms/types/ts';
import { EntryContentParsedItem } from '@thebcms/types';

export async function generateStaticParams() {
    const blogs = (await bcms.entry.getAll('blog')) as BlogEntry[];
    return blogs.map((blog) => {
        const meta = blog.meta.en as BlogEntryMetaItem;
        return {
            slug: meta.slug,
        };
    });
}

const BlogPage: React.FC<{ params: { slug: string } }> = async ({ params }) => {
    const blogs = (await bcms.entry.getAll('blog')) as BlogEntry[];
    const blog = blogs.find((e) => e.meta.en?.slug === params.slug);
    if (!blog) {
        throw new Error(`Blog "${params.slug}" not found.`);
    }
    const data = {
        meta: blog.meta.en as BlogEntryMetaItem,
        content: blog.content.en as EntryContentParsedItem[],
    };

    return (
        <div>
            <Link className={`text-blue-500 hover:text-blue-300`} href={'/'}>
                Back to home
            </Link>
            <pre>{JSON.stringify(data, null, 4)}</pre>
        </div>
    );
};

export default BlogPage;
