import { BlogLight } from '~~/types';
import {ArrowIcon} from '@/assets/icons/arrow';
import NextLink from 'next/link';
import {BlogsCard} from '~/components/blogs/Card';

interface HomePageBlogsListI {
    blogs: BlogLight[];
}

export function HomePageBlogsList ({ blogs }:HomePageBlogsListI): JSX.Element {
    return (
        <section className="pb-8 md:pb-20 lg:pb-[104px]">
            <div className="container">
                <div className="flex items-center justify-between mb-6 md:mb-8 lg:mb-10">
                    <h2 className="leading-none font-medium tracking-[-0.41px] md:text-lg md:leading-none lg:text-[32px] lg:leading-none">
                        Recent post
                    </h2>
                    <NextLink href="/blog" className="flex items-center px-[15px] py-2.5 bg-appAccent rounded-[32px]">
                        <>
                             <span className="text-sm leading-none tracking-[-0.41px] mr-1.5 md:text-base md:leading-none md:mr-2 lg:text-xl lg:leading-none">
              See all posts
            </span>
                            <ArrowIcon className="w-[14px] h-[14px] md:w-4 md:h-4 lg:w-5 lg:h-5" />
                        </>
                    </NextLink>
                </div>
                <div className="grid grid-cols-1 auto-rows-fr gap-6 p-4 border border-appGray-300 rounded-2xl md:grid-cols-2 lg:grid-cols-3 xl:gap-10 xl:p-8">
                    {blogs.map((blog, index) => (
                        <BlogsCard key={index} blog={blog} />
                    ))}
                </div>
            </div>
        </section>
    );
}
