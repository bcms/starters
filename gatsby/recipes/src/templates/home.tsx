import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { HomePageContent } from '../types';
import HomePageHero from '../components/home-page/Hero';
import HomePageRecipes from '../components/home-page/Recipes';
import HomePageAboutUs from '../components/home-page/AboutUs';
import HomePageLetsTalk from '../components/home-page/LetsTalk';

export interface HomeTemplateProps {
    pageContext: HomePageContent;
}

const HomeTemplate: React.FC<HomeTemplateProps> = ({
    pageContext: { meta, header, footer, recipes, bcms },
}) => {
    return (
        <PageWrapper
            title={`${meta.seo?.title || meta.title} - Flavour Fushion`}
            header={header}
            footer={footer}
            bcms={bcms}
        >
            <HomePageHero
                headline={meta.headline}
                description={meta.description}
                coverImage={meta.cover_image}
                recipes={recipes}
                bcms={bcms}
            />
            <HomePageRecipes
                title={meta.recipes_title}
                recipes={meta.recipes}
                bcmsConfig={bcms}
            />
            <HomePageAboutUs data={meta.about_us} bcms={bcms} />
            <HomePageLetsTalk
                title={meta.contact_title}
                description={meta.contact_description}
                phone={meta.contact_phone}
                email={meta.contact_email}
            />
        </PageWrapper>
    );
};

export default HomeTemplate;
