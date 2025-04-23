import ContentManager from '@/components/ContentManager';
import RecipesList from '@/components/recipes/List';
import { recipeToLight } from '@/utils/recipe';
import {
    RecipeEntry,
    RecipesPageEntry,
    RecipesPageEntryMetaItem,
} from '@bcms-types/types/ts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { bcmsPrivate } from '@/bcms-private';
import { bcmsPublic } from '@/bcms-public';

export async function generateMetadata(): Promise<Metadata> {
    const recipesPageEntry = (await bcmsPrivate.entry.getBySlug(
        'recipes',
        'recipes-page',
    )) as RecipesPageEntry;

    if (!recipesPageEntry) {
        return notFound();
    }

    const recipesPageMeta = recipesPageEntry.meta
        .en as RecipesPageEntryMetaItem;
    const pageTitle = `${recipesPageMeta.seo?.title || recipesPageMeta.title} - Flavour Fushion`;

    return {
        title: pageTitle,
        openGraph: {
            title: pageTitle,
        },
        twitter: {
            title: pageTitle,
        },
    };
}

const RecipesPage: React.FC = async () => {
    const recipesPageEntry = (await bcmsPrivate.entry.getBySlug(
        'recipes',
        'recipes-page',
    )) as RecipesPageEntry;

    if (!recipesPageEntry) {
        return notFound();
    }

    const recipesPageMeta = recipesPageEntry.meta
        .en as RecipesPageEntryMetaItem;

    const recipeEntries = (await bcmsPrivate.entry.getAll(
        'recipe',
    )) as RecipeEntry[];

    const lightRecipes = recipeEntries.map((e) => {
        return recipeToLight(e);
    });

    return (
        <div className="container pt-24 pb-8 md:pb-16 lg:pt-[104px] lg:pb-[120px]">
            <ContentManager
                items={recipesPageMeta.headline.nodes}
                className="recipesPage--title text-xl leading-[1.2] font-medium text-center text-appGray-700 mb-8 md:text-3xl
          lg:text-[56px] lg:leading-[1.2] lg:mb-10"
            />
            <RecipesList
                recipes={lightRecipes}
                bcmsConfig={bcmsPublic.getConfig()}
            />
        </div>
    );
};

export default RecipesPage;
