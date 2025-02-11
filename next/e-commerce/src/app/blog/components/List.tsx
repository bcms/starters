'use client';

import { BlogEntryMetaItem } from '@bcms-types/types/ts';
import { ClientConfig } from '@thebcms/client';
import React, { FC } from 'react';
import Card from './Card';

interface Props {
    blogs: BlogEntryMetaItem[];
    bcms: ClientConfig;
}

const List: FC<Props> = ({ blogs, bcms }) => {
    const [loadedBlogs, setLoadedBlogs] = React.useState(9);

    const loadMore = () => {
        setLoadedBlogs(loadedBlogs + 9);
    };

    return (
        <div>
            <div className="grid grid-cols-1 gap-8 mb-12 sm:grid-cols-2 lg:grid-cols-3">
                {blogs.map((blog, index) => {
                    return (
                        <Card
                            key={index}
                            card={blog}
                            style={{
                                display: index < loadedBlogs ? '' : 'none',
                            }}
                            bcms={bcms}
                        />
                    );
                })}
            </div>
            {loadedBlogs < blogs.length && (
                <button
                    className="flex max-w-max text-2xl leading-none tracking-[-0.5px] px-14 pt-3.5 pb-[18px] bg-white border border-appGray-400 mx-auto transition-colors duration-300 hover:bg-appText hover:text-white"
                    onClick={loadMore}
                >
                    Load more
                </button>
            )}
        </div>
    );
};

export default List;
