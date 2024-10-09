import { RecipeLight } from '@/types';
import { RecipeEntry, RecipeEntryMetaItem } from '@bcms-types/types/ts';

export const recipeToLight = (recipe: RecipeEntry): RecipeLight => {
    const meta = recipe.meta.en as RecipeEntryMetaItem;

    return {
        title: meta.title,
        slug: meta.slug,
        cover: meta.cover_image,
        categories: meta.categories.map((i) => i.meta.en?.title || ''),
        description: meta.description,
        popular: meta.popular,
    };
};
