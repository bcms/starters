import { GetStaticProps } from 'next';
import { BlogsPageData, PageProps } from '@/types';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';
import { BlogEntry, BlogEntryMeta } from '@/bcms/types';
import React, { useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import BlogCard from '@/components/BlogCard';

const BlogIndexPage: React.FC<PageProps<BlogsPageData>> = ({
  header,
  page,
  footer,
}) => {
  const [loadedBlogs, setLoadedBlogs] = useState<number>(9);

  const loadMore = () => {
    setLoadedBlogs(loadedBlogs + 9);
  };

  return (
    <PageWrapper
      defaultTitle="Blogs"
      page={page}
      header={header}
      footer={footer}
    >
      <div className="container pb-14 md:pb-20 lg:pb-[136px]">
        <div className="grid grid-cols-1 gap-8 mb-12 sm:grid-cols-2 lg:grid-cols-3">
          {page.blogs.map((blog, index) => (
            <BlogCard
              key={index}
              card={blog}
              className={index < loadedBlogs ? '' : 'none'}
            />
          ))}
        </div>
        {loadedBlogs < page.blogs.length && (
          <button
            className="flex max-w-max text-2xl leading-none tracking-[-0.5px] px-14 pt-3.5 pb-[18px] bg-white border border-appGray-400 mx-auto transition-colors duration-300 hover:bg-appText hover:text-white"
            onClick={loadMore}
          >
            Load more
          </button>
        )}
      </div>
    </PageWrapper>
  );
};

export default BlogIndexPage;

export const getStaticProps: GetStaticProps<
  PageProps<BlogsPageData>
> = async () => {
  const client = getBcmsClient();

  try {
    const { header, footer } = await getHeaderAndFooter(client);
    const blogs = (await client.entry.getAll({
      // Template name or ID
      template: 'blog',
    })) as BlogEntry[];
    return {
      props: {
        header,
        footer,
        page: {
          blogs: blogs
            .map((e) => e.meta.en as BlogEntryMeta)
            .sort((a, b) => b.date - a.date),
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
