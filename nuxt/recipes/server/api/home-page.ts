import {
    FooterEntry,
    FooterEntryMetaItem,
    HeaderEntry,
    HeaderEntryMetaItem,
    HomePageEntry,
    HomePageEntryMetaItem,
    RecipeEntry,
} from '~/bcms/type/ts';
import { RecipeLight, recipeToLight } from '~/utils/recipe';

export type HomePageResponse = {
    meta: HomePageEntryMetaItem;
    recipes: RecipeLight[];
    header: HeaderEntryMetaItem;
    footer: FooterEntryMetaItem;
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const header = (await bcms.entry.getBySlug(
        'header',
        'header',
    )) as HeaderEntry;
    const footer = (await bcms.entry.getBySlug(
        'footer',
        'footer',
    )) as FooterEntry;

    const homePage = (await bcms.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;
    const recipeEntries = (await bcms.entry.getAll('recipe')) as RecipeEntry[];
    const lightRecipes = recipeEntries.map((e) => {
        return recipeToLight(e);
    });

    const res: HomePageResponse = {
        meta: homePage.meta.en as HomePageEntryMetaItem,
        recipes: lightRecipes,
        header: header.meta.en as HeaderEntryMetaItem,
        footer: footer.meta.en as FooterEntryMetaItem,
    };

    return res;
});
