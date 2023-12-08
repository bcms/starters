import { NodePluginArgs } from 'gatsby';
import { BlogEntry, ProductEntry } from '@/bcms/types';
import { getBcmsMost } from 'gatsby-source-bcms';
import path from 'path';

exports.createSchemaCustomization = ({ actions }: NodePluginArgs) => {
  const { createTypes } = actions;
  const typeDefs = `
    scalar Number
  `;
  createTypes(typeDefs);
};

exports.createPages = async ({ actions }: NodePluginArgs) => {
  const { createPage } = actions;

  // SINGLE PRODUCT PAGE
  const productTemplate = path.resolve('./src/templates/product.tsx');

  const bcms = getBcmsMost();
  const products = (await bcms.content.entry.find(
    'product',
    async () => true,
  )) as ProductEntry[];

  if (products.length > 0) {
    products.forEach((product) => {
      createPage({
        path: `/shop/${product.meta.en?.slug}`,
        component: productTemplate,
        context: {
          id: product._id,
        },
      });
    });
  }
  // END OF SINGLE PRODUCT PAGES

  // SINGLE BLOG PAGE
  const blogTemplate = path.resolve('./src/templates/blog.tsx');

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
  // END OF BLOG PRODUCT PAGES
};
