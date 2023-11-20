import { NodePluginArgs } from 'gatsby';
import { BlogEntry } from './bcms/types';
import { getBcmsMost } from 'gatsby-source-bcms';

import path from 'path';

exports.createPages = async ({ actions }: NodePluginArgs) => {
  const { createPage } = actions;

  // SINGLE BLOG PAGES
  const blogTemplate = path.resolve('./src/templates/blog.tsx');

  const bcms = getBcmsMost();
  const blogs = (await bcms.content.entry.find(
    'blog',
    async () => true,
  )) as BlogEntry[];

  if (blogs.length > 0) {
    blogs.forEach((blog) => {
      createPage({
        path: `/blog/${blog.meta.en?.slug}`,
        component: blogTemplate,
        context: {
          id: blog._id,
        },
      });
    });
  }
  // END OF SINGLE BLOG PAGES
};
