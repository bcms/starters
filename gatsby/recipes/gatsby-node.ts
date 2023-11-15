import { RecipeEntry } from '@/bcms/types';
import { getBcmsMost } from 'gatsby-source-bcms';

const path = require('path');

exports.createPages = async ({ actions }: any) => {
  const { createPage } = actions;

  // SINGLE RECIPE PAGE
  const recipeTemplate = path.resolve('./src/templates/recipe.tsx');

  const bcms = getBcmsMost();
  const recipes = (await bcms.content.entry.find(
    'recipe',
    async () => true,
  )) as RecipeEntry[];

  if (recipes.length > 0) {
    recipes.forEach((recipe) => {
      createPage({
        path: `/recipes/${recipe.meta.en?.slug}`,
        component: recipeTemplate,
        context: {
          id: recipe._id,
        },
      });
    });
  }
  // END OF SINGLE RECIPE PAGES
};
