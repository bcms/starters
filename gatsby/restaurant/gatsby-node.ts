exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;
  const typeDefs = `
    scalar Number
  `;
  createTypes(typeDefs);
};
