import { NodePluginArgs } from 'gatsby';

exports.createSchemaCustomization = ({ actions }: NodePluginArgs) => {
  const { createTypes } = actions;
  const typeDefs = `
    scalar Number
  `;
  createTypes(typeDefs);
};
