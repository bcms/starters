import React from 'react';
import { recipeToLight } from '@/utils/recipe';
import ContentManager from '@/components/ContentManager';
import { RecipeEntry, RecipeEntryMetaItem } from '@bcms-types/types/ts';
import { notFound } from 'next/navigation';
import { BCMSImage } from '@thebcms/components-react';
import Filters from './components/Filters';
import { QAItem } from './components/QaItem';
import { Ingredients } from './components/Ingredients';
import { Steps } from './components/Steps';
import Link from 'next/link';
import RecipesCard from '@/components/recipes/Card';
import { Metadata } from 'next';
import { bcmsPrivate } from '@/bcms-private';
import { bcmsPublic } from '@/bcms-public';

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateStaticParams() {
    const recipeEntries = (await bcmsPrivate.entry.getAll(
        'recipe',
    )) as RecipeEntry[];
    return recipeEntries.map((recipe) => {
        const meta = recipe.meta.en as RecipeEntryMetaItem;
        return {
            slug: meta.slug,
        };
    });
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const recipeEntry = (await bcmsPrivate.entry.getBySlug(
        params.slug,
        'recipe',
    )) as RecipeEntry;

    if (!recipeEntry) {
        return notFound();
    }

    const recipeEntryMeta = recipeEntry.meta.en as RecipeEntryMetaItem;
    const pageTitle = `${recipeEntryMeta.seo?.title || recipeEntryMeta?.title} - Flavour Fushion`;

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

const RecipePage: React.FC<Props> = async (props) => {
    const params = await props.params;
    const recipeEntries = (await bcmsPrivate.entry.getAll(
        'recipe',
    )) as RecipeEntry[];

    const recipeEntry = recipeEntries.find(
        (e) => e.meta.en?.slug === params.slug,
    );

    if (!recipeEntry) {
        return notFound();
    }

    const recipeEntryMeta = recipeEntry.meta.en as RecipeEntryMetaItem;

    const lightRecipes = recipeEntries.map((e) => {
        return recipeToLight(e);
    });

    const popularRecipes =
        lightRecipes.filter((e) => e.popular).map((e) => e.title) || [];

    const categories =
        recipeEntries.reduce((acc, e) => {
            e.meta.en?.categories.forEach((category) => {
                const categoryTitle = category.meta.en?.title || '';

                if (!acc.includes(categoryTitle)) {
                    acc.push(categoryTitle);
                }
            });
            return acc;
        }, [] as string[]) || [];

    const similarRecipes =
        lightRecipes.filter((e) => {
            const entryCategories =
                recipeEntryMeta.categories.map((i) => i.meta.en?.title) || [];
            const categories = e.categories.map((i) => i) || [];

            for (let i = 0; i < categories.length; i++) {
                if (
                    entryCategories.includes(categories[i]) &&
                    recipeEntryMeta.slug !== e.slug
                ) {
                    return true;
                }
            }
            return false;
        }) || [];

    return (
        <div className="pb-10 md:pb-16 lg:pb-[120px]">
            <Filters popular={popularRecipes} categories={categories} />
            <div className="container">
                {recipeEntryMeta.cover_image && (
                    <BCMSImage
                        media={recipeEntryMeta.cover_image}
                        clientConfig={bcmsPrivate.getConfig()}
                        className="aspect-square rounded-2xl w-full overflow-hidden object-cover mb-5 md:aspect-[1.93] lg:mb-10"
                    />
                )}
                <h1 className="leading-none font-medium tracking-[-0.41px] text-appGray-700 mb-[14px] lg:text-[40px] lg:leading-none lg:mb-6">
                    {recipeEntryMeta.title}
                </h1>
                <ContentManager
                    items={recipeEntryMeta.extended_description.nodes}
                    className="[&_u]:font-semibold [&_u]:text-appGray-700 text-sm leading-[1.55] font-medium tracking-[-0.41px] text-[#86838C] mb-6 lg:text-lg lg:mb-8"
                />
                <div className="flex flex-wrap gap-3 mb-8 lg:gap-4">
                    <div className="bg-[#F7F7F7] rounded-[40px] px-5 py-[13px] text-sm leading-none font-medium tracking-[-0.41px]">
                        <span className="text-appGray-700">Total: </span>
                        <span className="text-[#9C9C9C]">
                            {recipeEntryMeta.cook_time}
                        </span>
                    </div>
                    <div className="bg-[#F7F7F7] rounded-[40px] px-5 py-[13px] text-sm leading-none font-medium tracking-[-0.41px]">
                        <span className="text-appGray-700">Ingredients: </span>
                        <span className="text-[#9C9C9C]">
                            {recipeEntryMeta.ingredients.length} items
                        </span>
                    </div>
                    <div className="bg-[#F7F7F7] rounded-[40px] px-5 py-[13px] text-sm leading-none font-medium tracking-[-0.41px]">
                        <span className="text-appGray-700">Steps: </span>
                        <span className="text-[#9C9C9C]">
                            {recipeEntryMeta.steps.length} steps
                        </span>
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-2 mb-8 lg:mb-16">
                    {recipeEntryMeta.qa.map((item, index) => (
                        <QAItem key={index} item={item} />
                    ))}
                </div>
                <Ingredients ingredients={recipeEntryMeta.ingredients} />
                <Steps
                    steps={recipeEntryMeta.steps}
                    bcmsConfig={bcmsPublic.getConfig()}
                />
                {similarRecipes.length > 0 && (
                    <div>
                        <div className="flex items-center justify-between leading-none font-medium tracking-[-0.41px] text-appGray-700 mb-8 lg:text-2xl lg:leading-none lg:mb-12">
                            <h2>Other recipes you may like</h2>
                            <Link href="/recipes"> Show all </Link>
                        </div>
                        <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:gap-x-16 lg:gap-y-[72px]">
                            {similarRecipes.map((card, index) => (
                                <RecipesCard
                                    key={index}
                                    card={card}
                                    bcmsConfig={bcmsPublic.getConfig()}
                                    showTitleLayer={true}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default RecipePage;
