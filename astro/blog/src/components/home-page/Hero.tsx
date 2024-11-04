import React, { useState } from 'react';
import { TopGradient } from '../TopGradient';
import { Search } from '../Search';
import { ContentManager } from '../ContentManager';
import { type BlogLite } from '../../utils/blog';
import { toReadableDate } from '../../utils/date';
import { BCMSImage } from '@thebcms/components-react';
import type { ClientConfig } from '@thebcms/client';

interface Props {
    title: string;
    subtitle: string;
    blogs: BlogLite[];
    bcmsConfig: ClientConfig;
}

const HomeHero: React.FC<Props> = ({ title, subtitle, blogs, bcmsConfig }) => {
    const [searchValue, setSearchValue] = useState('');
    const handleSearchEnter = () =>
        (window.location.href = `/blog?s=${searchValue}`);

    return (
        <section className="relative pt-10 pb-8 md:py-[72px] lg:pb-[100px] xl:pb-[128px]">
            <div className="container">
                <div className="flex flex-col-reverse items-center text-center gap-2.5 mb-8 md:gap-4 md:mb-10 lg:gap-5 lg:mb-12">
                    <h1 className="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none">
                        {title}
                    </h1>
                    <h2 className="text-sm leading-none tracking-[-0.41px] text-appGray-600 md:text-base md:leading-none lg:text-xl lg:leading-none">
                        {subtitle}
                    </h2>
                </div>
                <Search
                    value={searchValue}
                    onChange={(value) => setSearchValue(value)}
                    className="mb-8 md:mb-16 lg:mb-24"
                    onEnter={handleSearchEnter}
                />
                <div className="grid grid-cols-2 gap-4 auto-rows-fr md:gap-8 lg:gap-12">
                    {blogs.map((blog, index) => (
                        <a
                            key={index}
                            href={`/blog/${blog.slug}`}
                            className={`group relative rounded-lg overflow-hidden ${
                                index > 0 && index % 2 === 0
                                    ? 'col-span-2'
                                    : 'aspect-square lg:aspect-[1.17]'
                            }`}
                        >
                            <div className="relative z-10 flex flex-col p-4 h-full md:p-7 lg:p-10">
                                <h3 className="text-sm leading-none font-medium tracking-[-0.41px] text-white group-hover:underline md:text-xl md:leading-none lg:text-[32px] lg:leading-none">
                                    {blog.title}
                                </h3>
                                <div className="flex items-end justify-between mt-auto">
                                    <ContentManager
                                        items={blog.description.nodes}
                                        className="text-xs leading-[1.2] tracking-[-0.41px] text-white line-clamp-3 max-w-[150px] md:text-base md:leading-[1.2] md:max-w-[568px] lg:text-xl lg:leading-none"
                                    />
                                    {index > 0 && index % 2 === 0 && (
                                        <div className="text-xs font-medium leading-none tracking-[-0.41px] text-appGray-200 md:text-base md:leading-none lg:text-xl lg:leading-none">
                                            {toReadableDate(blog.date)}
                                        </div>
                                    )}
                                </div>
                            </div>
                            <div className="absolute top-0 left-0 size-full">
                                <BCMSImage
                                    media={blog.cover}
                                    clientConfig={bcmsConfig}
                                    className="size-full object-cover"
                                />
                            </div>
                            <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
                        </a>
                    ))}
                </div>
            </div>
            <TopGradient className="max-md:hidden" />
        </section>
    );
};

export default HomeHero;
