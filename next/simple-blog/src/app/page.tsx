import React from 'react';
import { bcms } from '../../bcms-client';
import { BlogEntry, BlogEntryMetaItem } from '../../bcms/types/ts';
import Link from 'next/link';

const HomePage: React.FC = async () => {
    const blogs = (await bcms.entry.getAll('blog')) as BlogEntry[];
    const items = blogs.map((blog) => {
        const meta = blog.meta.en as BlogEntryMetaItem;
        return {
            title: meta.title,
            slug: meta.slug,
        };
    });
    return (
        <div>
            <h1>Blogs</h1>
            <ul>
                {items.map((item, itemIdx) => {
                    return (
                        <li
                            key={itemIdx}
                            className={`text-blue-500 hover:text-blue-300`}
                        >
                            <Link href={`/blog/${item.slug}`}>
                                {item.title}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
};

export default HomePage;
