import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { RecipePageContent } from '../types';
import ContentManager from '../components/ContentManager';
import Filters from '../components/recipe-page/Filters';
import { BCMSImage } from '@thebcms/components-react';
import { Ingredients } from '../components/recipe-page/Ingredients';
import { QAItem } from '../components/recipe-page/QaItem';
import { Steps } from '../components/recipe-page/Steps';
import { Link } from 'gatsby';
import RecipesCard from '../components/recipes/Card';

export interface RecipeTemplateProps {
    pageContext: RecipePageContent;
}

const RecipeTemplate: React.FC<RecipeTemplateProps> = ({
    pageContext: { meta, recipes, header, footer, bcms },
}) => {
    const popularRecipes =
        recipes.filter((e) => e.popular).map((e) => e.title) || [];

    const categories =
        recipes.reduce((acc, e) => {
            e.categories.forEach((category) => {
                const categoryTitle = category || '';

                if (!acc.includes(categoryTitle)) {
                    acc.push(categoryTitle);
                }
            });
            return acc;
        }, [] as string[]) || [];

    const similarRecipes =
        recipes.filter((e) => {
            const entryCategories =
                meta.categories.map((i) => i.meta.en?.title) || [];
            const categories = e.categories.map((i) => i) || [];

            for (let i = 0; i < categories.length; i++) {
                if (
                    entryCategories.includes(categories[i]) &&
                    meta.slug !== e.slug
                ) {
                    return true;
                }
            }
            return false;
        }) || [];

    return (
        <PageWrapper
            title={`${meta.seo?.title || meta.title} - Flavour Fushion`}
            header={header}
            footer={footer}
            bcms={bcms}
        >
            <div className="pb-10 md:pb-16 lg:pb-[120px]">
                <Filters popular={popularRecipes} categories={categories} />
                <div className="container">
                    {meta.cover_image && (
                        <BCMSImage
                            media={meta.cover_image}
                            clientConfig={bcms}
                            className="aspect-square rounded-2xl w-full overflow-hidden object-cover mb-5 md:aspect-[1.93] lg:mb-10"
                        />
                    )}
                    <h1 className="leading-none font-medium tracking-[-0.41px] text-appGray-700 mb-[14px] lg:text-[40px] lg:leading-none lg:mb-6">
                        {meta.title}
                    </h1>
                    <ContentManager
                        items={meta.extended_description.nodes}
                        className="[&_u]:font-semibold [&_u]:text-appGray-700 text-sm leading-[1.55] font-medium tracking-[-0.41px] text-[#86838C] mb-6 lg:text-lg lg:mb-8"
                    />
                    <div className="flex flex-wrap gap-3 mb-8 lg:gap-4">
                        <div className="bg-[#F7F7F7] rounded-[40px] px-5 py-[13px] text-sm leading-none font-medium tracking-[-0.41px]">
                            <span className="text-appGray-700">Total: </span>
                            <span className="text-[#9C9C9C]">
                                {meta.cook_time}
                            </span>
                        </div>
                        <div className="bg-[#F7F7F7] rounded-[40px] px-5 py-[13px] text-sm leading-none font-medium tracking-[-0.41px]">
                            <span className="text-appGray-700">
                                Ingredients:{' '}
                            </span>
                            <span className="text-[#9C9C9C]">
                                {meta.ingredients.length} items
                            </span>
                        </div>
                        <div className="bg-[#F7F7F7] rounded-[40px] px-5 py-[13px] text-sm leading-none font-medium tracking-[-0.41px]">
                            <span className="text-appGray-700">Steps: </span>
                            <span className="text-[#9C9C9C]">
                                {meta.steps.length} steps
                            </span>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 gap-2 mb-8 lg:mb-16">
                        {meta.qa.map((item, index) => (
                            <QAItem key={index} item={item} />
                        ))}
                    </div>
                    <Ingredients ingredients={meta.ingredients} />
                    <Steps steps={meta.steps} bcmsConfig={bcms} />
                    {similarRecipes.length > 0 && (
                        <div>
                            <div className="flex items-center justify-between leading-none font-medium tracking-[-0.41px] text-appGray-700 mb-8 lg:text-2xl lg:leading-none lg:mb-12">
                                <h2>Other recipes you may like</h2>
                                <Link to="/recipes"> Show all </Link>
                            </div>
                            <div className="grid grid-cols-2 gap-x-5 gap-y-8 lg:gap-x-16 lg:gap-y-[72px]">
                                {similarRecipes.map((card, index) => (
                                    <RecipesCard
                                        key={index}
                                        card={card}
                                        bcmsConfig={bcms}
                                        showTitleLayer={true}
                                    />
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </PageWrapper>
    );
};

export default RecipeTemplate;
