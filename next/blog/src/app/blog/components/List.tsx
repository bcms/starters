'use client';

import BlogCard from '@/components/blogs/Card';
import { Search } from '@/components/Search';
import { BlogLite } from '@/utils/blog';
import { ClientConfig } from '@thebcms/client';
import React, { FC, useMemo, useState } from 'react';

interface Props {
    blogs: BlogLite[];
    bcmsConfig: ClientConfig;
}

const List: FC<Props> = ({ blogs, bcmsConfig }) => {
    const [searchVal, setSearchVal] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const categories = useMemo(() => {
        return (
            blogs.reduce((acc, e) => {
                if (e.category && !acc.includes(e.category)) {
                    acc.push(e.category);
                }
                return acc;
            }, [] as string[]) || []
        );
    }, [blogs]);

    const filteredBlogs = useMemo(() => {
        return (
            blogs.filter((blog) => {
                let show = true;
                if (searchVal) {
                    show =
                        show &&
                        blog.title
                            .toLowerCase()
                            .includes(searchVal.toLowerCase());
                }
                if (selectedCategory) {
                    show = show && blog.category === selectedCategory;
                }
                return show;
            }) || []
        );
    }, [blogs, searchVal, selectedCategory]);

    return (
        <section className="container mb-8 md:mb-20 lg:mb-[104px]">
            <div className="max-w-[848px] mx-auto pb-8 md:pb-[72px] lg:pb-[100px] xl:pb-[128px]">
                <Search
                    value={searchVal}
                    className="mb-3 lg:mb-6"
                    onChange={(value) => {
                        setSearchVal(value);
                    }}
                />
                <div className="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-5 lg:gap-[18px]">
                    {categories.map((category, index) => (
                        <button
                            key={index}
                            className={`flex items-center justify-center w-full px-6 py-2.5 rounded-[32px] border transition-colors duration-300 text-xs leading-none tracking-[-0.41px] capitalize md:text-lg md:leading-none md:py-3 lg:text-2xl lg:leading-none lg:px-6 lg:py-[14px] ${
                                category === selectedCategory
                                    ? 'border-appText bg-appText text-white'
                                    : 'border-[#E0E0E0]'
                            }`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            {category.toLowerCase()}
                        </button>
                    ))}
                    <button
                        onClick={() => setSelectedCategory('')}
                        className={`col-span-2 flex items-center justify-center w-full px-6 py-2.5 rounded-[32px] border transition-colors duration-300 text-xs leading-none tracking-[-0.41px] md:col-span-1 md:col-start-1 md:row-start-1 md:text-lg md:leading-none md:py-3 lg:text-2xl lg:leading-none lg:px-6 lg:py-[14px] ${
                            selectedCategory === ''
                                ? 'border-appText bg-appText text-white'
                                : 'border-[#E0E0E0]'
                        }`}
                    >
                        All
                    </button>
                </div>
            </div>
            {filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 md:mb-20 lg:grid-cols-3 xl:gap-10 lg:mb-[128px]">
                    {filteredBlogs.map((blog) => (
                        <BlogCard
                            key={blog.slug}
                            blog={blog}
                            bcmsConfig={bcmsConfig}
                        />
                    ))}
                </div>
            ) : (
                <div className="leading-none tracking-[-0.41px] text-center mb-8 md:mb-20 lg:text-lg lg:mb-[128px]">
                    There are no blogs for the applied filter in &quot;
                    {searchVal}&quot;
                </div>
            )}
            <div>
                <h2 className="leading-none font-medium tracking-[-0.41px] mb-7 md:text-2xl md:leading-none md:mb-10 lg:text-[32px] lg:leading-none lg:mb-12">
                    All posts
                </h2>
                <div className="grid grid-cols-1 auto-rows-fr gap-6 p-4 border border-appGray-300 rounded-2xl md:grid-cols-2 lg:grid-cols-3 xl:gap-10 xl:p-8">
                    {blogs.map((blog, index) => (
                        <BlogCard
                            key={index}
                            blog={blog}
                            bcmsConfig={bcmsConfig}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default List;
