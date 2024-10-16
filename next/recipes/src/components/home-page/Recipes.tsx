import React, { useMemo } from 'react';
import RecipesSearch from '@/components/recipes/Search';
import { RecipeLight } from '@/types';
import Btn from '@/components/Btn';
import ArrowIcon from '@/assets/icons/arrow-right.svg';
import { RecipeEntry, RecipeEntryMetaItem } from '@bcms-types/types/ts';
import RecipesCard from '../recipes/Card';
import { ClientConfig } from '@thebcms/client';

interface Props {
    title: string;
    recipes: RecipeEntry[];
    bcmsConfig: ClientConfig;
}

const HomePageRecipes: React.FC<Props> = ({
    title,
    recipes: items,
    bcmsConfig,
}) => {
    const recipes = useMemo(() => {
        return items.map((e) => {
            const meta = e.meta.en as RecipeEntryMetaItem;
            return {
                title: meta.title,
                slug: meta.slug,
                cover: meta.cover_image,
                categories: meta.categories.map((i) => i.meta.en?.title || ''),
                description: meta.description,
            } as RecipeLight;
        });
    }, [items]);

    return (
        <section className="py-8 lg:py-20 xl:pt-[128px] xl:pb-[120px]">
            <div className="container">
                <RecipesSearch
                    recipes={recipes}
                    static
                    className="relative z-10 mb-8 lg:hidden"
                />
                <h2 className="leading-none font-semibold tracking-[-0.41px] text-appGray-700 mb-5 lg:text-2xl lg:mb-9 xl:text-4xl xl:mb-12">
                    {title}
                </h2>
                <div className="grid grid-cols-2 gap-x-5 gap-y-8 mb-8 lg:grid-cols-3 lg:mb-16 xl:gap-x-12 xl:gap-y-16">
                    {recipes.map((card, index) => (
                        <RecipesCard
                            key={index}
                            bcmsConfig={bcmsConfig}
                            card={card}
                        />
                    ))}
                </div>
                <div className="flex justify-center">
                    <Btn to="/recipes" theme="dark">
                        <span className="mr-2">Browse more recipes</span>
                        <ArrowIcon className="w-[14px] h-[14px] lg:w-5 lg:h-5" />
                    </Btn>
                </div>
            </div>
        </section>
    );
};

export default HomePageRecipes;
