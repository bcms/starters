import { RecipeEntry, RecipeEntryMeta } from '~~/bcms/types';
import { RecipeLight } from '~~/types';

export const recipeToLight = (recipes: RecipeEntry[]): RecipeLight[] => {
  return recipes.map((e) => {
    const meta = e.meta.en as RecipeEntryMeta;

    return {
      title: meta.title,
      slug: meta.slug,
      cover: meta.cover_image,
      categories: meta.categories.map((i) => i.meta.en?.title || ''),
      description: meta.description,
      popular: meta.popular,
    };
  });
};
