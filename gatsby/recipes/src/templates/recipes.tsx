import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { RecipesPageContent } from '../types';
import ContentManager from '../components/ContentManager';
import RecipesList from '../components/recipes/List';

export interface RecipesTemplateProps {
    pageContext: RecipesPageContent;
}

const RecipesTemplate: React.FC<RecipesTemplateProps> = ({
    pageContext: { meta, recipes, header, footer, bcms },
}) => {
    return (
        <PageWrapper
            title={`${meta.seo?.title || meta.title} - Flavour Fushion`}
            header={header}
            footer={footer}
            bcms={bcms}
        >
            <div className="container pt-24 pb-8 md:pb-16 lg:pt-[104px] lg:pb-[120px]">
                <ContentManager
                    items={meta.headline.nodes}
                    className="recipesPage--title text-xl leading-[1.2] font-medium text-center text-appGray-700 mb-8 md:text-3xl
          lg:text-[56px] lg:leading-[1.2] lg:mb-10"
                />
                <RecipesList recipes={recipes} bcmsConfig={bcms} />
            </div>
        </PageWrapper>
    );
};

export default RecipesTemplate;
