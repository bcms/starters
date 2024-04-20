import { BlogPageData, PageData } from '@/types';
import React, { useMemo } from 'react';
import { PageWrapper } from '@/src/components/PageWrapper';
import { BCMSImage } from 'gatsby-source-bcms/components';
import { ContentManager } from '@/src/components/ContentManager';
import { BlogCard } from '@/src/components/BlogCard';
import { graphql, Link } from 'gatsby';
import { BlogAuthorEntryMeta, BlogEntry } from '@/bcms/types';
import { toLite } from '@/utils/toLite';

interface BlogPageProps {
  data: PageData<BlogPageData> & {
    blogs: {
      nodes: Array<{
        bcms: BlogEntry;
      }>;
    };
  };
}
const BlogPage: React.FC<BlogPageProps> = ({ data }) => {
  const otherBlogs = useMemo(() => {
    return data.blogs.nodes
      .filter((blog) => blog.bcms.meta.en?.slug !== data.page.bcms.meta.en.slug)
      .map((blog) => blog.bcms.meta.en)
      .sort((a, b) => (b?.date as any) - (a?.date as any))
      .slice(0, 3);
  }, [data.blogs]);

  const formattedDate = (date: number) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const author = toLite<
    BlogAuthorEntryMeta,
    { blogAuthor: { meta: { en: BlogAuthorEntryMeta } } }
  >(data.page.bcms.meta.en.author as any);
  return (
    <PageWrapper page={data?.page} header={data.header} footer={data.footer}>
      <div className="container pb-14 md:pb-20 lg:pb-[136px]">
        <div className="relative flex items-end p-4 min-h-[300px] max-w-full aspect-[2.47] mb-10 lg:p-12">
          <div className="relative z-10">
            <div className="flex items-center gap-1.5 leading-none tracking-[-2%] text-appGray-300 mb-2.5 md:text-lg">
              <div>{formattedDate(data.page.bcms.meta.en.date)}</div>
              <div className="w-1 h-1 rounded-full bg-current mt-1" />
              <div>By {author.title}</div>
            </div>
            <h1 className="text-2xl leading-none tracking-[-2%] text-white mb-3 lg:text-[40px]">
              {data.page.bcms.meta.en.title}
            </h1>
          </div>
          <BCMSImage
            media={data.page.bcms.meta.en.cover}
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
          <ContentManager
            items={data.page?.bcms?.content.en}
            className="blog--content"
          />
          <div className="border border-appGray-300 p-4 lg:p-8">
            <div className="flex flex-col items-center gap-5 justify-between text-xl leading-none tracking-[-2%] mb-6 lg:text-[24px] lg:flex-row">
              <div>Others you may like</div>
              <Link className="underline" to="/blog">
                See all
              </Link>
            </div>
            <div className="grid grid-cols-1 gap-8">
              {otherBlogs.map((blog, index) => (
                <BlogCard key={index} card={blog as any} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default BlogPage;

export const query = graphql`
  query ($id: String!) {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }
    page: bcmsBlog(bcms: { _id: { eq: $id } }) {
      bcms {
        content {
          en {
            name
            type
            value
          }
        }
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
