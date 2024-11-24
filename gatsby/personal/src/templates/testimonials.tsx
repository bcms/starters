import React from 'react';
import PageWrapper from '../components/PageWrapper';
import { HomePageContent, TestimonialsPageContent } from '../types';
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
import AnimatedTitle from '../components/AnimatedTitle';
import TestimonialItems from '../components/testimonials-page/Items';

export interface HomeTemplateProps {
    pageContext: TestimonialsPageContent;
}

const TestimonialsTemplate: React.FC<HomeTemplateProps> = ({
    pageContext: { meta, testimonials, bcms },
}) => {
    return (
        <PageWrapper
            title={`${meta.seo?.title || meta.title} - Personal Website`}
        >
            <div className="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
                <div className="container">
                    <AnimatedTitle
                        title={meta.title}
                        className="mb-10 md:mb-20 lg:mb-[124px]"
                        titleClassName="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
                    />
                    <TestimonialItems
                        items={testimonials.map(
                            (e) => e.meta.en as TestimonialEntryMetaItem,
                        )}
                        bcmsConfig={bcms}
                    />
                </div>
            </div>
        </PageWrapper>
    );
};

export default TestimonialsTemplate;
