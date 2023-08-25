import React, { FC, useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { BlogsCard } from '@/components/blogs/Card';
import { PageWrapper } from '@/components/PageWrapper';
import { TopGradient } from '@/components/TopGradient';
import { BlogsPageData, PageProps } from '@/types';
import { GetStaticProps } from 'next';
import { useHeadTags } from '@/composables/og-head';
import { Search } from '@/components/Search';
import { getHeaderAndFooter } from '@/utils/page-data';
import { getBcmsClient } from 'next-plugin-bcms';
import { BlogEntry, BlogsPageEntry, BlogsPageEntryMeta } from '@/bcms/types';
import { blogToLite } from '@/utils/blog';

const BlogsPage: FC<PageProps<BlogsPageData>> = (props) => {
  const [searchVal, setSearchVal] = useState('searchVal');
  const [selectedCategory, setSelectedCategory] = useState('');

  const route = useRouter();
  const { setOgHead } = useHeadTags();

  useEffect(() => {
    setOgHead({
      title: props.page.meta.title,
    });
  }, [props.page]);

  useEffect(() => {
    if (route.query.s) {
      setSearchVal(route.query.s as string);
    }
  }, [route.query.s]);

  const categories = useMemo(() => {
    return (
      props.page.blogs.reduce((acc, e) => {
        if (e.category.selected && !acc.includes(e.category.selected)) {
          acc.push(e.category.selected);
        }
        return acc;
      }, [] as string[]) || []
    );
  }, [props.page.blogs]);

  const filteredBlogs = useMemo(() => {
    return (
      props.page.blogs.filter((blog) => {
        let show = true;
        if (searchVal) {
          show =
            show && blog.title.toLowerCase().includes(searchVal.toLowerCase());
        }
        if (selectedCategory) {
          show = show && blog.category.selected === selectedCategory;
        }
        return show;
      }) || []
    );
  }, [props.page.blogs, searchVal, selectedCategory]);

  const inputFocusHandler = (): void => {
    return;
  };

  return (
    <PageWrapper {...props}>
      <div className="relative pt-10 pb-8 md:py-[72px] lg:pb-[100px] xl:pb-[128px]">
        <div className="container">
          <div>
            <div className="flex flex-col-reverse items-center text-center mb-8 md:gap-4 md:mb-10 lg:mb-12">
              <h1 className="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none">
                {props.page.meta.title}
              </h1>
              <h2 className="text-sm leading-none tracking-[-0.41px] text-appGray-600 mb-2.5 md:text-base md:leading-none lg:text-xl lg:leading-none lg:mb-5">
                {props.page.meta.subtitle}
              </h2>
            </div>
            <div className="max-w-[848px] mx-auto">
              <Search
                onChange={(value) => setSearchVal(value)}
                onEnter={inputFocusHandler}
                value={searchVal}
                className="mb-3 lg:mb-6"
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
          </div>
        </div>
        <TopGradient />
      </div>
      <div className="container mb-8 md:mb-20 lg:mb-[104px]">
        {filteredBlogs.length > 0 && selectedCategory ? (
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 md:mb-20 lg:grid-cols-3 xl:gap-10 lg:mb-[128px]">
            {filteredBlogs.map((blog) => (
              <BlogsCard key={blog.slug} blog={blog} />
            ))}
          </div>
        ) : (
          <div className="leading-none tracking-[-0.41px] text-center mb-8 md:mb-20 lg:text-lg lg:mb-[128px]">
            There are no blogs for the applied filter in "
            {selectedCategory.toLowerCase()}"
          </div>
        )}
        <div>
          <h2 className="leading-none font-medium tracking-[-0.41px] mb-7 md:text-2xl md:leading-none md:mb-10 lg:text-[32px] lg:leading-none lg:mb-12">
            All posts
          </h2>
          <div className="grid grid-cols-1 auto-rows-fr gap-6 p-4 border border-appGray-300 rounded-2xl md:grid-cols-2 lg:grid-cols-3 xl:gap-10 xl:p-8">
            {props.page.blogs.map((blog, index) => (
              <BlogsCard key={index} blog={blog} />
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<BlogsPageData>
> = async () => {
  const client = getBcmsClient();
  const { header, footer } = await getHeaderAndFooter(client);
  // Get Blogs Page entry
  const blogsPage = (await client.entry.get({
    // Template name or ID
    template: 'blogs_page',
    // Entry slug or ID
    entry: 'blogs',
  })) as BlogsPageEntry;
  if (!blogsPage) {
    throw new Error('Blogs page entry does not exist.');
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
        meta: blogsPage.meta.en as BlogsPageEntryMeta,
        blogs: blogs
          .map((blog) => blogToLite(blog))
          .sort((a, b) => b.date - a.date),
      },
    },
  };
};

export default BlogsPage;
