import { useState } from 'react';
import { BlogEntryMeta, HomeHeroGroup } from '~~/bcms/types';
import { BCMSImage } from '~~/bcms-components';
import Link from 'next/link';
import {TopGradient} from "~/components/TopGradient";
import {Search} from "~/components/Search";
import {ContentManager} from "~/components/ContentManager";
import {dateUtil} from '~/utils/date'
import {useRouter} from "next/router";
interface HomeHeroProps {
    data: HomeHeroGroup;
}

export function HomepageHero ({ data }: HomeHeroProps): JSX.Element {
    const [searchValue, setSearchValue] = useState('');
    const router = useRouter()
    const handleSearchEnter = () => router.push(`/blog?s=${searchValue}`);

    const lightBlogs: any[] = data.featured_blogs.map((e) => {
        const meta = e.meta.en as BlogEntryMeta;

        return {
            title: meta.title,
            slug: meta.slug,
            description: meta.description,
            cover: meta.cover,
            date: meta.date,
        };
    });

    return (
        <section className="relative pt-10 pb-8 md:py-[72px] lg:pb-[100px] xl:pb-[128px]">
            <div className="container">
                <div className="flex flex-col-reverse items-center text-center gap-2.5 mb-8 md:gap-4 md:mb-10 lg:gap-5 lg:mb-12">
                    <h1 className="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none">
                        {data.title}
                    </h1>
                    <h2 className="text-sm leading-none tracking-[-0.41px] text-appGray-600 md:text-base md:leading-none lg:text-xl lg:leading-none">
                        {data.subtitle}
                    </h2>
                </div>
                <Search
                    value={searchValue}
                    onChange={(value) => setSearchValue(value)}
                    className="mb-8 md:mb-16 lg:mb-24"
                    onEnter={handleSearchEnter}
                />
                <div className="grid grid-cols-2 gap-4 auto-rows-fr md:gap-8 lg:gap-12">
                    {lightBlogs.map((blog, index) => (
                        <Link key={index} href={`/blog/${blog.slug}`}>
                            <a className={`group relative rounded-lg overflow-hidden ${index > 0 && index % 2 === 0 ? 'col-span-2' : 'aspect-square lg:aspect-[1.17]'}`}>
                                <div className="relative z-10 flex flex-col p-4 h-full md:p-7 lg:p-10">
                                    <h3
                                        className="text-sm leading-none font-medium tracking-[-0.41px] text-white group-hover:underline md:text-xl md:leading-none lg:text-[32px] lg:leading-none"
                                    >
                                        {blog.title}
                                    </h3>
                                    <div className="flex items-end justify-between mt-auto">
                                        <ContentManager
                                            item={blog.description}
                                            className="text-xs leading-[1.2] tracking-[-0.41px] text-white line-clamp-3 max-w-[150px] md:text-base md:leading-[1.2] md:max-w-[568px] lg:text-xl lg:leading-none"
                                        />
                                        {index > 0 && index % 2 === 0 && (
                                            <div className="text-xs font-medium leading-none tracking-[-0.41px] text-appGray-200 md:text-base md:leading-none lg:text-xl lg:leading-none">
                                                {dateUtil.format(blog.date)}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <BCMSImage media={blog.cover} className="absolute top-0 left-0 w-full h-full cover" />
                                <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
                            </a>
                        </Link>
                    ))}
                </div>
            </div>
            <TopGradient className="max-md:hidden" />
        </section>
    );
}

