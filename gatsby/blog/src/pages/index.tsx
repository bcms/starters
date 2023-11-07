import { graphql } from 'gatsby';
import React, { FC } from 'react';
import { HomePageBlogsList, HomePageHero, PageWrapper } from '../components';
import { BlogLite, HomePageData, PageData } from '../../types';
import { blogToLite } from '../utils/blog';
import { BlogEntry } from '../../bcms/types';

const HomePage: FC<{
  data: PageData<HomePageData> & {
    blogs: {
      nodes: Array<{
        bcms: BlogEntry;
      }>;
    };
  };
}> = ({ data }) => {
  const liteBlogs: BlogLite[] = data.blogs.nodes.map((blog) =>
    blogToLite(blog.bcms),
  );

  return (
    <main>
      <PageWrapper {...data} location="/">
        <HomePageHero data={data.page.bcms.meta.en.hero} />
        <HomePageBlogsList blogs={liteBlogs} />
      </PageWrapper>
    </main>
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
    page: bcmsHomePage {
      ...HomePage
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
              description {
                name
                type
                value
              }
            }
          }
        }
      }
    }
  }
`;

export default HomePage;
