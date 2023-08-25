import { BlogPageData, PageProps } from '@/types';
import { PageWrapper } from '@/components/PageWrapper';
import { BCMSImage } from 'next-plugin-bcms/components';
import { ContentManager } from '@/components/ContentManager';
import NextLink from 'next/link';
import ArrowIcon from '@/assets/icons/arrow.svg';
import { BlogsCard } from '@/components/blogs/Card';
import { TopGradient } from '@/components/TopGradient';
import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { dateUtil } from '@/utils/date';
import { useHeadTags } from '@/composables/og-head';
import React, { FC, useEffect } from 'react';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import NextImage from 'next/image';
import { Widgets } from '@/components/widgets/Widgets';
import { getBcmsClient } from 'next-plugin-bcms';
import { BlogEntry, BlogEntryMeta } from '@/bcms/types';
import { getHeaderAndFooter } from '@/utils/page-data';
import { BCMSEntryContentParsedItem } from '@becomes/cms-client/types';
import { blogToLite } from '@/utils/blog';

const SingleBlogPage: FC<PageProps<BlogPageData>> = (props) => {
  const { setOgHead } = useHeadTags();

  useEffect(() => {
    setOgHead({
      title: props.page.meta.title,
    });
  }, [props.page]);

  return (
    <PageWrapper {...props}>
      <div className="relative pt-10 pb-8 md:py-[72px] lg:pb-[104px]">
        <div className="container">
          <div className="md:mb-20 lg:mb-[128px]">
            <div className="flex flex-col items-center mb-8 md:mb-14 lg:mb-20">
              <div className="text-sm leading-none tracking-[-0.41px] text-appGray-600 mb-2.5 md:text-base md:leading-none lg:text-xl lg:leading-none lg:mb-5">
                {dateUtil.format(props.page.meta.date)}
              </div>
              <h1 className="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none">
                {props.page.meta.title}
              </h1>
            </div>
            <BCMSImage
              media={props.page.meta.cover}
              className="aspect-[2.07] rounded-lg overflow-hidden w-full cover mb-6 md:mb-8 lg:aspect-[2.43]
                        lg:rounded-2xl lg:mb-12"
            />
            <ContentManager
              items={props.page.content}
              widgetComponents={Widgets}
              className="prose"
            />
          </div>
          <div className="max-md:hidden">
            <div className="flex items-center justify-between mb-8 lg:mb-12">
              <h2 className="text-lg leading-none font-medium tracking-[-0.41px] lg:text-[32px] lg:leading-none">
                Other posts
              </h2>
              <NextLink
                passHref={true}
                href="/blog"
                className="flex items-center px-[15px] py-2.5 bg-appAccent rounded-[32px]"
              >
                <a>
                  <span className="leading-none tracking-[-0.41px] mr-2 lg:text-xl lg:leading-none">
                    See all posts
                  </span>
                  <NextImage
                    src={ArrowIcon}
                    className="w-[14px] h-[14px] md:w-4 md:h-4 lg:w-5 lg:h-5"
                  />
                </a>
              </NextLink>
            </div>
            <div className="grid grid-cols-2 auto-rows-fr gap-6 p-4 border border-appGray-300 rounded-2xl lg:grid-cols-3 xl:gap-10 xl:p-8">
              {props.page.otherBlogs.map((blog, index) => (
                <BlogsCard key={index} blog={blog} />
              ))}
            </div>
          </div>
        </div>
        <TopGradient />
      </div>
    </PageWrapper>
  );
};

interface ParamsI extends NextParsedUrlQuery {
  slug: string;
}
export const getStaticPaths: GetStaticPaths<ParamsI> = async () => {
  const client = getBcmsClient();
  const blogPosts = (await client.entry.getAll({
    template: 'blog',
  })) as BlogEntry[];
  const paths = blogPosts.map((blog) => {
    const meta = blog.meta.en as BlogEntryMeta;
    return {
      params: {
        slug: meta.slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<PageProps<BlogPageData>> = async (
  ctx: GetStaticPropsContext,
) => {
  const client = getBcmsClient();
  const { header, footer } = await getHeaderAndFooter(client);
  // Get Blog Page entry
  const blogPage = (await client.entry.get({
    // Template name or ID
    template: 'blog',
    // Entry slug or ID
    entry: (ctx.params?.slug as string) || '__none',
  })) as BlogEntry;
  if (!blogPage) {
    return {
      notFound: true,
    };
  }
  // Get all Blog entries
  const blogs = (await client.entry.getAll({
    // Template name or ID
    template: 'blog',
  })) as BlogEntry[];
  return {
    props: {
      header,
      footer,
      page: {
        meta: blogPage.meta.en as BlogEntryMeta,
        content: blogPage.content.en as BCMSEntryContentParsedItem[],
        otherBlogs: blogs
          .slice(0, 3)
          .map((blog) => blogToLite(blog))
          .sort((a, b) => b.date - a.date),
      },
    },
  };
};

export default SingleBlogPage;
