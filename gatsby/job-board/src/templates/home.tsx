import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { HomePageContent } from '../types';
import HomeHero from '../components/home-page/Hero';
import HomeJobs from '../components/home-page/Jobs';
import HomeAbout from '../components/home-page/About';
import Testimonials from '../components/home-page/Testimonials';

export interface HomeTemplateProps {
    pageContext: HomePageContent;
}

const HomeTemplate: React.FC<HomeTemplateProps> = ({
    pageContext: { meta, jobs, testimonials, bcms },
}) => {
    return (
        <PageWrapper title={`${meta.seo?.title || meta.title} - Hospitale`}>
            <HomeHero
                title={meta.hero_title}
                description={meta.hero_description}
                cover={meta.hero_cover_image}
                bcmsConfig={bcms}
            />
            <HomeJobs
                title={meta.jobs_title}
                description={meta.jobs_description}
                jobs={jobs}
            />
            <HomeAbout
                title={meta.about_title}
                description={meta.about_description}
                features={meta.about_features}
            />
            <Testimonials testimonials={testimonials} bcmsConfig={bcms} />
        </PageWrapper>
    );
};

export default HomeTemplate;
