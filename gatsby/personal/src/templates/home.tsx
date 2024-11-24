import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { HomePageContent } from '../types';
import HomeAbout from '../components/home-page/About';
import HomePortfolio from '../components/home-page/Portfolio';
import HomeTestimonials from '../components/home-page/Testimonials';
import HomeHero from '../components/home-page/Hero';
import HomeServices from '../components/home-page/Services';
import {
    PortfolioEntryMetaItem,
    ServiceEntryMetaItem,
    TestimonialEntryMetaItem,
} from '../../bcms/types/ts';

export interface HomeTemplateProps {
    pageContext: HomePageContent;
}

const HomeTemplate: React.FC<HomeTemplateProps> = ({
    pageContext: {
        meta,
        servicesMeta,
        services,
        aboutMeta,
        portfolioMeta,
        portfolio,
        testimonialsMeta,
        testimonials,
        bcms,
    },
}) => {
    return (
        <PageWrapper
            title={`${meta.seo?.title || meta.title} - Personal Website`}
        >
            <HomeHero
                title={meta.hero_title}
                description={meta.hero_description}
                image={meta.image}
                bcmsConfig={bcms}
            />
            <HomeServices
                title={servicesMeta.title}
                description={servicesMeta.description}
                items={services.map((e) => e.meta.en as ServiceEntryMetaItem)}
            />
            <HomeAbout
                title={aboutMeta.title}
                description={aboutMeta.description}
                education_title={aboutMeta.education_title}
                education_degrees={aboutMeta.education_degrees}
                work_history_title={aboutMeta.work_history_title}
                work_history_items={aboutMeta.work_history_items}
            />
            <HomePortfolio
                title={portfolioMeta.title}
                description={portfolioMeta.description}
                items={portfolio.map(
                    (e) => e.meta.en as PortfolioEntryMetaItem,
                )}
                bcmsConfig={bcms}
            />
            <HomeTestimonials
                title={testimonialsMeta.title}
                description={testimonialsMeta.description}
                items={testimonials.map(
                    (e) => e.meta.en as TestimonialEntryMetaItem,
                )}
                bcmsConfig={bcms}
            />
        </PageWrapper>
    );
};

export default HomeTemplate;
