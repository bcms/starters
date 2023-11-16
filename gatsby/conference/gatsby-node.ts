exports.createSchemaCustomization = ({ actions }: any) => {
  const { createTypes } = actions;

  const typeDefs = `
    scalar number
    scalar Number 
  `;
  createTypes(typeDefs);
};
