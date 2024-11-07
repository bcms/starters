import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import {
    FooterEntry,
    FooterEntryMetaItem,
    HeaderEntry,
    HeaderEntryMetaItem,
    RecipeEntry,
    RecipesPageEntry,
    RecipesPageEntryMetaItem,
} from '~/bcms/types/ts';
import { RecipeLight, recipeToLight } from '~/utils/recipe';

export type RecipesPageResponse = {
    meta: RecipesPageEntryMetaItem;
    recipes: RecipeLight[];
    header: HeaderEntryMetaItem;
    footer: FooterEntryMetaItem;
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const header = (await bcms.entry.getBySlug(
        'header',
        'header',
    )) as HeaderEntry;
    const footer = (await bcms.entry.getBySlug(
        'footer',
        'footer',
    )) as FooterEntry;

    const recipesPage = (await bcms.entry.getBySlug(
        'recipes',
        'recipes-page',
    )) as RecipesPageEntry;
    const recipes = (await bcms.entry.getAll('recipe')) as RecipeEntry[];

    const res: RecipesPageResponse = {
        meta: recipesPage.meta.en as RecipesPageEntryMetaItem,
        recipes: recipes.map((recipe) => {
            return recipeToLight(recipe);
        }),
        header: header.meta.en as HeaderEntryMetaItem,
        footer: footer.meta.en as FooterEntryMetaItem,
        bcms: bcms.getConfig(),
    };

    return res;
});
