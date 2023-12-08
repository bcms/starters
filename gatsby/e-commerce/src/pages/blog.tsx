import { BlogsPageData, PageData } from '@/types';
import { BlogEntry } from '@/bcms/types';
import React, { useMemo, useState } from 'react';
import { PageWrapper } from '@/src/components/PageWrapper';
import BlogCard from '@/src/components/BlogCard';
import { graphql } from 'gatsby';

interface BlogIndexPageProps {
  data: PageData<BlogsPageData> & {
    blogs: {
      nodes: Array<{
        bcms: BlogEntry;
      }>;
    };
  };
}
const BlogIndexPage: React.FC<BlogIndexPageProps> = (props) => {
  const [loadedBlogs, setLoadedBlogs] = useState<number>(9);

  const loadMore = () => {
    setLoadedBlogs(loadedBlogs + 9);
  };

  const blogs = useMemo(() => {
    return props.data.blogs.nodes
      .map((blog) => blog.bcms.meta.en)
      .sort((a, b) => (b?.date as any) - (a?.date as any));
  }, [props.data.blogs]);
  return (
    <PageWrapper
      defaultTitle="Blogs"
      page={props?.data?.page}
      header={props.data.header}
      footer={props.data.footer}
    >
      <div className="container pb-14 md:pb-20 lg:pb-[136px]">
        <div className="grid grid-cols-1 gap-8 mb-12 sm:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog, index) => (
            <BlogCard
              key={index}
              card={blog as any}
              className={index < loadedBlogs ? '' : 'hidden'}
            />
          ))}
        </div>
        {loadedBlogs < props.data.blogs.nodes.length && (
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

export const query = graphql`
  {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }
    blogs: allBcmsBlog {
      nodes {
        bcms {
          meta {
            en {
              title
              slug
              seo {
                description
                title
              }
              date
              cover {
                _id
                caption
                alt_text
                height
                name
                src
                svg
                width
              }
              author {
                blogAuthor {
                  meta {
                    en {
                      title
                      slug
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
