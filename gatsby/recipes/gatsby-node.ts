import { config } from 'dotenv';
config();
import { CreatePagesArgs } from 'gatsby';
import path from 'node:path';
import {
    FooterEntry,
    FooterEntryMetaItem,
    HeaderEntry,
    HeaderEntryMetaItem,
    HomePageEntry,
    HomePageEntryMetaItem,
    LegalPageEntry,
    RecipeEntry,
    RecipeEntryMetaItem,
    RecipesPageEntry,
    RecipesPageEntryMetaItem,
} from './bcms/types/ts';
import { Client } from '@thebcms/client';
import {
    HomePageContent,
    LegalPageContent,
    RecipePageContent,
    RecipesPageContent,
} from './src/types';
import { recipeToLight } from './src/utils/recipe';

const bcms = new Client(
    process.env.BCMS_ORG_ID || '',
    process.env.BCMS_INSTANCE_ID || '',
    {
        id: process.env.BCMS_API_KEY_ID || '',
        secret: process.env.BCMS_API_KEY_SECRET || '',
    },
    {
        injectSvg: true,
    },
);

export const createPages = async ({
    actions: { createPage },
}: CreatePagesArgs) => {
    const header = (await bcms.entry.getBySlug(
        'header',
        'header',
    )) as HeaderEntry;
    const headerMeta = header.meta.en as HeaderEntryMetaItem;
    const footer = (await bcms.entry.getBySlug(
        'footer',
        'footer',
    )) as FooterEntry;
    const footerMeta = footer.meta.en as FooterEntryMetaItem;
    // HOME
    const homeTemplate = path.resolve('./src/templates/home.tsx');
    const homePageEntry = (await bcms.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;

    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;

    const recipeEntries = (await bcms.entry.getAll('recipe')) as RecipeEntry[];

    const lightRecipes = recipeEntries.map((e) => {
        return recipeToLight(e);
    });

    createPage({
        path: `/`,
        component: homeTemplate,
        context: {
            header: headerMeta,
            footer: footerMeta,
            meta: homePageMeta,
            recipes: lightRecipes,
            bcms: bcms.getConfig(),
        } as HomePageContent,
    });

    // LEGAL
    const legalTemplate = path.resolve('./src/templates/legal.tsx');
    const legalPageEntries = (await bcms.entry.getAll(
        'legal-page',
    )) as LegalPageEntry[];
    createPage({
        path: `/legal`,
        component: legalTemplate,
        context: {
            header: headerMeta,
            footer: footerMeta,
            entries: legalPageEntries,
            bcms: bcms.getConfig(),
        } as LegalPageContent,
    });

    // RECIPES
    const recipesTemplate = path.resolve('./src/templates/recipes.tsx');
    const recipesPageEntry = (await bcms.entry.getBySlug(
        'recipes',
        'recipes-page',
    )) as RecipesPageEntry;

    const recipesPageMeta = recipesPageEntry.meta
        .en as RecipesPageEntryMetaItem;
    createPage({
        path: `/recipes`,
        component: recipesTemplate,
        context: {
            header: headerMeta,
            footer: footerMeta,
            meta: recipesPageMeta,
            recipes: lightRecipes,
            bcms: bcms.getConfig(),
        } as RecipesPageContent,
    });

    // RECIPE
    const recipeTemplate = path.resolve('./src/templates/recipe.tsx');
    recipeEntries.forEach((recipe) => {
        const meta = recipe.meta.en as RecipeEntryMetaItem;

        createPage({
            path: `/recipes/${meta.slug}`,
            component: recipeTemplate,
            context: {
                header: headerMeta,
                footer: footerMeta,
                meta,
                recipes: lightRecipes,
                bcms: bcms.getConfig(),
            } as RecipePageContent,
        });
    });
};
