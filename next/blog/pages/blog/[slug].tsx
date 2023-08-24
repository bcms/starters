import {APIResponse, BlogPageData} from "~/types";
import {PageWrapper} from "~/components/PageWrapper";
import {BCMSImage} from "next-plugin-bcms/components";
import {ContentManager} from "~/components/ContentManager";
import NextLink from "next/link";
import ArrowIcon from "~/assets/icons/arrow.svg";
import {BlogsCard} from "~/components/blogs/Card";
import {TopGradient} from "~/components/TopGradient";
import {
    GetStaticPaths,
    GetStaticProps,
    GetStaticPropsContext
} from "next";
import {BlogsApi} from "~/api";
import {dateUtil} from "~/utils/date";
import {useHeadTags} from "~/composables/og-head";
import React, {useEffect} from "react";
import {NextParsedUrlQuery} from "next/dist/server/request-meta";
import NextImage from "next/image";
import {Widgets} from "~/components/widgets/Widgets";

const SingleBlogPage: React.FC<APIResponse<BlogPageData>> = ({header, footer, data}) => {
    const {setOgHead} = useHeadTags()
    useEffect(() => {
        setOgHead({
            title: data?.meta?.title,
        });
    }, [data]);
    if (!data) {
        return <></>
    }
    return (<PageWrapper header={header} footer={footer}>
            <div className="relative pt-10 pb-8 md:py-[72px] lg:pb-[104px]">
                <div className="container">
                    <div className="md:mb-20 lg:mb-[128px]">
                        <div className="flex flex-col items-center mb-8 md:mb-14 lg:mb-20">
                            <div
                                className="text-sm leading-none tracking-[-0.41px] text-appGray-600 mb-2.5 md:text-base md:leading-none lg:text-xl lg:leading-none lg:mb-5"
                            >
                                {dateUtil.format(data.meta.date)}
                            </div>
                            <h1
                                className="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none"
                            >
                                {data.meta.title}
                            </h1>
                        </div>
                        <BCMSImage
                            media={data.meta.cover}
                            className="aspect-[2.07] rounded-lg overflow-hidden w-full cover mb-6 md:mb-8 lg:aspect-[2.43]
                        lg:rounded-2xl lg:mb-12"
                        />
                        <ContentManager item={data.content} widgetComponents={Widgets as any} className="prose"/>
                    </div>
                    <div className="max-md:hidden">
                        <div className="flex items-center justify-between mb-8 lg:mb-12">
                            <h2
                                className="text-lg leading-none font-medium tracking-[-0.41px] lg:text-[32px] lg:leading-none"
                            >
                                Other posts
                            </h2>
                            <NextLink
                                passHref={true}
                                href="/blog"
                                className="flex items-center px-[15px] py-2.5 bg-appAccent rounded-[32px]"
                            >
                            <a>
                                    <span
                                        className="leading-none tracking-[-0.41px] mr-2 lg:text-xl lg:leading-none"
                                    >
                See all posts
              </span>
                                <NextImage
                                    src={ArrowIcon}
                                    className="w-[14px] h-[14px] md:w-4 md:h-4 lg:w-5 lg:h-5"
                                />
                            </a>
                            </NextLink>
                        </div>
                        <div
                            className="grid grid-cols-2 auto-rows-fr gap-6 p-4 border border-appGray-300 rounded-2xl lg:grid-cols-3 xl:gap-10 xl:p-8"
                        >

                            {data.otherBlogs.map((blog, index) => (<BlogsCard
                                    key={index}
                                    blog={blog}
                                />))}
                        </div>
                    </div>
                </div>
                <TopGradient/>
            </div>

        </PageWrapper>)
}

interface ParamsI extends NextParsedUrlQuery {
    slug: string
}
export const getStaticPaths: GetStaticPaths<ParamsI> = async () => {
    const blogApi = new BlogsApi()
    const blogPosts = await blogApi.getBlogs()

    const paths = blogPosts.data.blogs.map(({slug}) => ({params: {slug}}))
    return {
        paths,
        fallback: false
    };
}

export const getStaticProps: GetStaticProps<APIResponse<BlogPageData> | {data: null}> = async (context: GetStaticPropsContext) => {
    const slug = context?.params
    const blogsApi = new BlogsApi()
    const data = await blogsApi.getSingleBlog(slug as any)
    return {
        props: {
            ...data
        }
    }
}


export default SingleBlogPage
