import React from 'react';
import { Metadata } from 'next';
import {
    AboutPageEntry,
    AboutPageEntryMetaItem,
    HomePageEntry,
    HomePageEntryMetaItem,
    PortfolioEntry,
    PortfolioEntryMetaItem,
    PortfolioPageEntry,
    PortfolioPageEntryMetaItem,
    ServiceEntry,
    ServiceEntryMetaItem,
    ServicesPageEntry,
    TestimonialEntry,
    TestimonialEntryMetaItem,
    TestimonialsPageEntry,
    TestimonialsPageEntryMetaItem,
} from '@bcms-types/types/ts';
import { notFound } from 'next/navigation';
import HomeHero from '@/components/home-page/Hero';
import HomeServices from '@/components/home-page/Services';
import HomeAbout from '@/components/home-page/About';
import HomePortfolio from '@/components/home-page/Portfolio';
import HomeTestimonials from '@/components/home-page/Testimonials';
import { bcmsPrivate } from '@/app/bcms-private';
import { bcmsPublic } from '@/app/bcms-public';

const pageTitle = 'Home - Personal Website';
export const metadata: Metadata = {
    title: pageTitle,
    openGraph: {
        title: pageTitle,
    },
    twitter: {
        title: pageTitle,
    },
};

const HomePage: React.FC = async () => {
    const homePageEntry = (await bcmsPrivate.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;
    const servicesPageEntry = (await bcmsPrivate.entry.getBySlug(
        'services',
        'services-page',
    )) as ServicesPageEntry;
    const servicesEntries = (await bcmsPrivate.entry.getAll(
        'service',
    )) as ServiceEntry[];
    const aboutPageEntry = (await bcmsPrivate.entry.getBySlug(
        'about',
        'about-page',
    )) as AboutPageEntry;
    const portfolioPageEntry = (await bcmsPrivate.entry.getBySlug(
        'portfolio',
        'portfolio-page',
    )) as PortfolioPageEntry;
    const portfolioEntries = (await bcmsPrivate.entry.getAll(
        'portfolio',
    )) as PortfolioEntry[];
    const testimonialsPageEntry = (await bcmsPrivate.entry.getBySlug(
        'testimonials',
        'testimonials-page',
    )) as TestimonialsPageEntry;
    const testimonialEntries = (await bcmsPrivate.entry.getAll(
        'testimonial',
    )) as TestimonialEntry[];

    if (
        !homePageEntry ||
        !servicesPageEntry ||
        !aboutPageEntry ||
        !portfolioPageEntry ||
        !testimonialsPageEntry
    ) {
        return notFound();
    }

    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;
    const servicesPageMeta = servicesPageEntry.meta.en as ServiceEntryMetaItem;
    const aboutPageMeta = aboutPageEntry.meta.en as AboutPageEntryMetaItem;
    const portfolioPageMeta = portfolioPageEntry.meta
        .en as PortfolioPageEntryMetaItem;
    const testimonialsPageMeta = testimonialsPageEntry.meta
        .en as TestimonialsPageEntryMetaItem;

    return (
        <div>
            <HomeHero
                title={homePageMeta.hero_title}
                description={homePageMeta.hero_description}
                image={homePageMeta.image}
                bcmsConfig={bcmsPublic.getConfig()}
            />
            <HomeServices
                title={servicesPageMeta.title}
                description={servicesPageMeta.description}
                items={servicesEntries.map(
                    (e) => e.meta.en as ServiceEntryMetaItem,
                )}
            />
            <HomeAbout
                title={aboutPageMeta.title}
                description={aboutPageMeta.description}
                education_title={aboutPageMeta.education_title}
                education_degrees={aboutPageMeta.education_degrees}
                work_history_title={aboutPageMeta.work_history_title}
                work_history_items={aboutPageMeta.work_history_items}
            />
            <HomePortfolio
                title={portfolioPageMeta.title}
                description={portfolioPageMeta.description}
                items={portfolioEntries.map(
                    (e) => e.meta.en as PortfolioEntryMetaItem,
                )}
                bcmsConfig={bcmsPublic.getConfig()}
            />
            <HomeTestimonials
                title={testimonialsPageMeta.title}
                description={testimonialsPageMeta.description}
                items={testimonialEntries.map(
                    (e) => e.meta.en as TestimonialEntryMetaItem,
                )}
                bcmsConfig={bcmsPublic.getConfig()}
            />
        </div>
    );
};

export default HomePage;
