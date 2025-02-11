import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { HomePageContent } from '../types';
import { HomeHero } from '../components/home-page/Hero';
import { HomeCategories } from '../components/home-page/Categories';
import { HomeCta } from '../components/home-page/Cta';
import { HomeProducts } from '../components/home-page/Products';

export interface HomeTemplateProps {
    pageContext: HomePageContent;
}

const HomeTemplate: React.FC<HomeTemplateProps> = ({
    pageContext: { meta, categories, products, filters, bcms },
}) => {
    return (
        <PageWrapper title={`${meta.seo?.title || meta.title} - Moda`}>
            <HomeHero
                title={meta.hero_title}
                description={meta.hero_description}
                image={meta.hero_cover_image}
                bcms={bcms}
            />
            <HomeCategories
                data={categories.slice(0, 6)}
                ctaTheme="dark-green"
                bcms={bcms}
            />
            <HomeCta
                title={meta.cta_title}
                description={meta.cta_description}
                image={meta.cta_cover_image}
                cta={{
                    label: meta.cta_label,
                    href: meta.cta_link,
                }}
                bcms={bcms}
            />
            <HomeCategories
                data={categories.slice(6, 12)}
                ctaTheme="orange"
                bcms={bcms}
            />
            <HomeProducts products={products} filters={filters} bcms={bcms} />
        </PageWrapper>
    );
};

export default HomeTemplate;
