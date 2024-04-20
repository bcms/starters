import { NodePluginArgs } from 'gatsby';
import { PortfolioItemEntry } from './bcms/types';
import { getBcmsMost } from 'gatsby-source-bcms';
import path from 'path';

exports.createSchemaCustomization = ({ actions }: NodePluginArgs) => {
  const { createTypes } = actions;

  const typeDefs = `
    scalar Number 
  `;
  createTypes(typeDefs);
};

exports.createPages = async ({ actions }: any) => {
  const { createPage } = actions;

  // SINGLE portfolio PAGES
  const PortfolioTemplate = path.resolve('./src/templates/portfolio.tsx');

  const bcms = getBcmsMost();
  const portfolios = (await bcms.content.entry.find(
    'portfolio_item',
    async () => true,
  )) as PortfolioItemEntry[];
  if (portfolios.length > 0) {
    portfolios.forEach((portfolio) => {
      createPage({
        path: `/portfolio/${portfolio.meta.en?.slug}`,
        component: PortfolioTemplate,
        context: {
          id: portfolio._id,
        },
      });
    });
  }
  // END OF SINGLE portfolio PAGES
};
