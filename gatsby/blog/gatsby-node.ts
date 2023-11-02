import { BlogEntryMeta } from './bcms/types';

const path = require('path');

exports.createPages = async ({ graphql, actions, reporter }: any) => {
  const { createPage } = actions;

  // HEADER
  const headerQuery = await graphql(`
    {
      bcmsHeader {
        bcms {
          meta {
            en {
              title
              slug
              nav {
                value
                type
                name
              }
              logo {
                alt_text
                _id
                caption
                height
                name
                src
                width
              }
            }
          }
        }
      }
    }
  `);

  if (headerQuery.errors) {
    reporter.panicOnBuild(
      `There was an error loading your BCMS header`,
      headerQuery.errors,
    );
    return;
  }
  // END OF HEADER

  // FOOTER
  const footerQuery = await graphql(`
    {
      bcmsFooter {
        bcms {
          meta {
            en {
              title
              social {
                url
                icon {
                  alt_text
                  _id
                  caption
                  height
                  name
                  src
                  width
                }
              }
              slug
              description {
                value
                type
                name
              }
            }
          }
        }
      }
    }
  `);

  if (footerQuery.errors) {
    reporter.panicOnBuild(
      `There was an error loading your BCMS footer`,
      footerQuery.errors,
    );
    return;
  }
  // END OF FOOTER

  // SINGLE BLOG PAGES
  const blogTemplate = path.resolve('./src/templates/blog.tsx');

  const blogPageQuery = await graphql(`
    {
      allBcmsBlog {
        nodes {
          bcms {
            content {
              en {
                type
                name
                value
              }
            }
            meta {
              en {
                cover {
                  _id
                  alt_text
                  caption
                  height
                  name
                  src
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
  `);

  if (blogPageQuery.errors) {
    reporter.panicOnBuild(
      `There was an error loading your BCMS blogs`,
      blogPageQuery.errors,
    );
    return;
  }

  const blogs = blogPageQuery.data.allBcmsBlog.nodes as Array<{
    bcms: {
      meta: {
        en: BlogEntryMeta;
      };
    };
  }>;

  if (blogs.length > 0) {
    blogs.forEach((blog) => {
      createPage({
        path: `/blog/${blog.bcms.meta.en.slug}`,
        component: blogTemplate,
        context: {
          header: headerQuery.data.bcmsHeader,
          page: blog,
          footer: footerQuery.data.bcmsFooter,
          otherBlogs: blogs
            .filter((e) => {
              return e.bcms.meta.en.slug !== blog.bcms.meta.en.slug;
            })
            .slice(0, 3)
            .sort((a, b) => b.bcms.meta.en.date - a.bcms.meta.en.date)
            .map((e) => {
              return e.bcms;
            }),
        },
      });
    });
  }
  // END OF SINGLE BLOG PAGES
};
