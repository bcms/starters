exports.createSchemaCustomization = ({ actions }: any) => {
  const { createTypes } = actions;

  const typeDefs = `
      scalar Number
    `;
  createTypes(typeDefs);
};
