import type {
    PropMediaDataParsed,
    PropRichTextDataParsed,
} from '@thebcms/types';
import type { RecipeEntry, RecipeEntryMetaItem } from '~/bcms/type/ts';

export interface RecipeLight {
    title: string;
    slug: string;
    cover?: PropMediaDataParsed;
    description: PropRichTextDataParsed;
    categories: string[];
    popular?: boolean;
}

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
