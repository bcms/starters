import {
    FooterEntry,
    FooterEntryMetaItem,
    HeaderEntry,
    HeaderEntryMetaItem,
    RecipeEntry,
    RecipeEntryMetaItem,
} from '~/bcms/type/ts';
import { RecipeLight, recipeToLight } from '~/utils/recipe';

export type RecipeResponse = {
    meta: RecipeEntryMetaItem;
    similarRecipes: RecipeLight[];
    categories: string[];
    popular: string[];
    header: HeaderEntryMetaItem;
    footer: FooterEntryMetaItem;
};

export default defineEventHandler(async (event) => {
    const bcms = useBcmsPrivate();
    const header = (await bcms.entry.getBySlug(
        'header',
        'header',
    )) as HeaderEntry;
    const footer = (await bcms.entry.getBySlug(
        'footer',
        'footer',
    )) as FooterEntry;
    const recipes = (await bcms.entry.getAll('recipe')) as RecipeEntry[];
    const slug = getRouterParam(event, 'slug');
    const recipe = recipes.find((e) => e.meta.en?.slug === slug);

    if (!recipe) {
        throw new Error(`Recipe "${slug}" not found`);
    }

    const similarRecipes = recipes
        .filter((e) => {
            const entryCategories =
                recipe.meta.en?.categories.map((i) => i.meta.en?.title) || [];
            const categories =
                e.meta.en?.categories.map((i) => i.meta.en?.title) || [];

            for (let i = 0; i < categories.length; i++) {
                if (
                    entryCategories.includes(categories[i]) &&
                    recipe.meta.en?.slug !== e.meta.en?.slug
                ) {
                    return true;
                }
            }
            return false;
        })
        .map((e) => recipeToLight(e));

    const res: RecipeResponse = {
        meta: recipe.meta.en as RecipeEntryMetaItem,
        similarRecipes,
        categories:
            recipes.reduce((acc, e) => {
                e.meta.en?.categories.forEach((category) => {
                    const categoryTitle = category.meta.en?.title || '';

                    if (!acc.includes(categoryTitle)) {
                        acc.push(categoryTitle);
                    }
                });
                return acc;
            }, [] as string[]) || [],
        popular:
            recipes
                .filter((e) => e.meta.en?.popular)
                .map((e) => e.meta.en?.title || '') || [],
        header: header.meta.en as HeaderEntryMetaItem,
        footer: footer.meta.en as FooterEntryMetaItem,
    };

    return res;
});
