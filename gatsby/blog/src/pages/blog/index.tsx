import React, { FC, useEffect, useMemo, useState } from 'react';
import { BlogsPageData, PageData } from '../../../types';
import { PageWrapper, Search, TopGradient } from '../../components';
import { BlogsCard } from '../../components/blogs/card';
import { graphql } from 'gatsby';
import { BlogEntryMeta } from '../../../bcms/types';

const BlogsPage: FC<{
  data: PageData<BlogsPageData> & {
    blogs: {
      nodes: Array<{
        bcms: {
          meta: {
            en: BlogEntryMeta;
          };
        };
      }>;
    };
  };
}> = ({ data }) => {
  const [searchVal, setSearchVal] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const sParam = searchParams.get('s');

    if (sParam) {
      setSearchVal(sParam);
    }
  }, [location.search]);

  const categories = useMemo(() => {
    return (
      data.blogs.nodes.reduce((acc, e) => {
        if (
          e.bcms.meta.en.category.selected &&
          !acc.includes(e.bcms.meta.en.category.selected)
        ) {
          acc.push(e.bcms.meta.en.category.selected);
        }
        return acc;
      }, [] as string[]) || []
    );
  }, [data.blogs]);

  const filteredBlogs = useMemo(() => {
    return (
      data.blogs.nodes.filter((blog) => {
        let show = true;
        if (searchVal) {
          show =
            show &&
            blog.bcms.meta.en.title
              .toLowerCase()
              .includes(searchVal.toLowerCase());
        }
        if (selectedCategory) {
          show =
            show && blog.bcms.meta.en.category.selected === selectedCategory;
        }
        return show;
      }) || []
    );
  }, [data.blogs, searchVal, selectedCategory]);

  const inputFocusHandler = (): void => {
    return;
  };

  return (
    <PageWrapper {...data}>
      <div className="relative pt-10 pb-8 md:py-[72px] lg:pb-[100px] xl:pb-[128px]">
        <div className="container">
          <div>
            <div className="flex flex-col-reverse items-center text-center mb-8 md:gap-4 md:mb-10 lg:mb-12">
              <h1 className="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none">
                {data.page.bcms.meta.en.title}
              </h1>
              <h2 className="text-sm leading-none tracking-[-0.41px] text-appGray-600 mb-2.5 md:text-base md:leading-none lg:text-xl lg:leading-none lg:mb-5">
                {data.page.bcms.meta.en.subtitle}
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
        {filteredBlogs.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 md:mb-20 lg:grid-cols-3 xl:gap-10 lg:mb-[128px]">
            {filteredBlogs.map((blog) => (
              <BlogsCard
                key={blog.bcms.meta.en.slug}
                blog={blog.bcms.meta.en}
              />
            ))}
          </div>
        ) : (
          <div className="leading-none tracking-[-0.41px] text-center mb-8 md:mb-20 lg:text-lg lg:mb-[128px]">
            There are no blogs for the applied filter in "{searchVal}"
          </div>
        )}
        <div>
          <h2 className="leading-none font-medium tracking-[-0.41px] mb-7 md:text-2xl md:leading-none md:mb-10 lg:text-[32px] lg:leading-none lg:mb-12">
            All posts
          </h2>
          <div className="grid grid-cols-1 auto-rows-fr gap-6 p-4 border border-appGray-300 rounded-2xl md:grid-cols-2 lg:grid-cols-3 xl:gap-10 xl:p-8">
            {data.blogs.nodes.map((blog, index) => (
              <BlogsCard key={index} blog={blog.bcms.meta.en} />
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export const query = graphql`
  {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }
    page: bcmsBlogsPage {
      ...BlogsPage
    }
    blogs: allBcmsBlog {
      nodes {
        bcms {
          meta {
            en {
              cover {
                _id
                alt_text
                caption
                height
                name
                src
                svg
                width
              }
              date
              slug
              title
              category {
                selected
                items
              }
              description {
                name
                type
                value
              }
              seo {
                title
                description
              }
            }
          }
        }
      }
    }
  }
`;

export default BlogsPage;
