import React from 'react';
import { Metadata } from 'next';
import {
    HomePageEntry,
    HomePageEntryMetaItem,
    JobPostEntry,
    TestimonialEntry,
    TestimonialEntryMetaItem,
} from '@bcms-types/types/ts';
import HomeHero from '@/components/home-page/Hero';
import HomeJobs from '@/components/home-page/Jobs';
import { toJobLite } from '@/utils/job';
import HomeAbout from '@/components/home-page/About';
import Testimonials from '@/components/home-page/Testimonials';
import { bcmsPrivate } from '@/app/bcms-private';
import { bcmsPublic } from '@/app/bcms-public';

const pageTitle = 'Home - Hospitale';
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
    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;

    const jobEntries = (await bcmsPrivate.entry.getAll(
        'job-post',
    )) as JobPostEntry[];
    const jobEntriesLite = jobEntries.map((job) => {
        return toJobLite(job);
    });

    const testimonialEntries = (await bcmsPrivate.entry.getAll(
        'testimonial',
    )) as TestimonialEntry[];
    const testimonialEntriesMeta = testimonialEntries.map(
        (testimonial) => testimonial.meta.en as TestimonialEntryMetaItem,
    );

    return (
        <div>
            <HomeHero
                title={homePageMeta.hero_title}
                description={homePageMeta.hero_description}
                cover={homePageMeta.hero_cover_image}
                bcmsConfig={bcmsPublic.getConfig()}
            />
            <HomeJobs
                title={homePageMeta.jobs_title}
                description={homePageMeta.jobs_description}
                jobs={jobEntriesLite}
            />
            <HomeAbout
                title={homePageMeta.about_title}
                description={homePageMeta.about_description}
                features={homePageMeta.about_features}
            />
            <Testimonials
                testimonials={testimonialEntriesMeta}
                bcmsConfig={bcmsPublic.getConfig()}
            />
        </div>
    );
};

export default HomePage;
