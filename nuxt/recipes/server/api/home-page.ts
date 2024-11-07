import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import {
    FooterEntry,
    FooterEntryMetaItem,
    HeaderEntry,
    HeaderEntryMetaItem,
    HomePageEntry,
    HomePageEntryMetaItem,
    RecipeEntry,
} from '~/bcms/types/ts';
import { RecipeLight, recipeToLight } from '~/utils/recipe';

export type HomePageResponse = {
    meta: HomePageEntryMetaItem;
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
        bcms: bcms.getConfig(),
    };

    return res;
});
