import { GetStaticPaths, GetStaticProps, GetStaticPropsContext } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { BlogEntry, BlogEntryMeta } from '@/bcms/types';
import { BlogPageData, PageProps } from '@/types';
import { getHeaderAndFooter } from '@/utils/page-data';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { BCMSEntryContentParsedItem } from '@becomes/cms-client/types';
import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { BCMSImage } from 'next-plugin-bcms/components';
import ContentManager from '@/components/ContentManager';
import Link from 'next/link';
import BlogCard from '@/components/BlogCard';

const BlogPage: React.FC<PageProps<BlogPageData>> = ({
  header,
  page,
  footer,
}) => {
  const formattedDate = (date: number) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };
  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <div className="container pb-14 md:pb-20 lg:pb-[136px]">
        <div className="relative flex items-end p-4 min-h-[300px] max-w-full aspect-[2.47] mb-10 lg:p-12">
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 leading-none tracking-[-2%] text-appGray-300 mb-2.5 md:text-lg">
              <div>{formattedDate(page.meta.date)}</div>
              <div className="w-1 h-1 rounded-full bg-current mt-1" />
              <div>By {page.meta.author.meta.en?.title}</div>
            </div>
            <h1 className="text-2xl leading-none tracking-[-2%] text-white mb-3 lg:text-[40px]">
              {page.meta.title}
            </h1>
          </div>
          <BCMSImage
            media={page.meta.cover}
            options={{
              sizes: {
                exec: [
                  {
                    width: 640,
                  },
                  {
                    width: 1280,
                  },
                  {
                    width: 1600,
                  },
                ],
              },
            }}
            className="absolute inset-0 cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        <div className="grid grid-cols-1 gap-10 items-start lg:grid-cols-[1fr,400px] lg:gap-16 xl:grid-cols-[1fr,600px]">
          <ContentManager item={page.content} className="blog--content" />
          <div className="border border-appGray-300 p-4 lg:p-8">
            <div className="flex flex-col items-center gap-5 justify-between text-xl leading-none tracking-[-2%] mb-6 lg:text-[24px] lg:flex-row">
              <div>Others you may like</div>
              <Link href="/blog">
                <a className="underline">See all</a>
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {page.otherBlogs.map((blog, index) => (
                <BlogCard key={index} card={blog} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default BlogPage;

interface ParamsI extends NextParsedUrlQuery {
  slug: string;
}
export const getStaticPaths: GetStaticPaths<ParamsI> = async () => {
  const client = getBcmsClient();
  const blogs = (await client.entry.getAll({
    template: 'blog',
  })) as BlogEntry[];
  const paths = blogs.map((blog) => {
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
  try {
    const { header, footer } = await getHeaderAndFooter(client);

    const blogPage = (await client.entry.get({
      // Template name or ID
      template: 'blog',
      // Entry slug or ID
      entry: ctx?.params?.slug as string,
    })) as BlogEntry;
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
            .filter((e) => e.meta.en?.slug !== blogPage.meta.en?.slug)
            .map((e) => e.meta.en as BlogEntryMeta)
            .sort((a, b) => b.date - a.date)
            .slice(0, 3),
        },
      },
    };
  } catch (error) {
    return { notFound: true };
  }
};
