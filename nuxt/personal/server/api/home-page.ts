import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
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
    ServicesPageEntryMetaItem,
    TestimonialEntry,
    TestimonialEntryMetaItem,
    TestimonialsPageEntry,
    TestimonialsPageEntryMetaItem,
} from '~/bcms/types/ts';

export type HomePageResponse = {
    meta: HomePageEntryMetaItem;
    servicesMeta: ServicesPageEntryMetaItem;
    services: ServiceEntryMetaItem[];
    aboutMeta: AboutPageEntryMetaItem;
    portfolio: PortfolioEntryMetaItem[];
    portfolioMeta: PortfolioPageEntryMetaItem;
    testimonials: TestimonialEntryMetaItem[];
    testimonialsMeta: TestimonialsPageEntryMetaItem;
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const homePageEntry = (await bcms.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;
    const servicesPageEntry = (await bcms.entry.getBySlug(
        'services',
        'services-page',
    )) as ServicesPageEntry;
    const servicesEntries = (await bcms.entry.getAll(
        'service',
    )) as ServiceEntry[];
    const aboutPageEntry = (await bcms.entry.getBySlug(
        'about',
        'about-page',
    )) as AboutPageEntry;
    const portfolioPageEntry = (await bcms.entry.getBySlug(
        'portfolio',
        'portfolio-page',
    )) as PortfolioPageEntry;
    const portfolioEntries = (await bcms.entry.getAll(
        'portfolio',
    )) as PortfolioEntry[];
    const testimonialsPageEntry = (await bcms.entry.getBySlug(
        'testimonials',
        'testimonials-page',
    )) as TestimonialsPageEntry;
    const testimonialEntries = (await bcms.entry.getAll(
        'testimonial',
    )) as TestimonialEntry[];

    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;
    const servicesPageMeta = servicesPageEntry.meta.en as ServiceEntryMetaItem;
    const aboutPageMeta = aboutPageEntry.meta.en as AboutPageEntryMetaItem;
    const portfolioPageMeta = portfolioPageEntry.meta
        .en as PortfolioPageEntryMetaItem;
    const testimonialsPageMeta = testimonialsPageEntry.meta
        .en as TestimonialsPageEntryMetaItem;

    const res: HomePageResponse = {
        meta: homePageMeta,
        services: servicesEntries.map((e) => e.meta.en as ServiceEntryMetaItem),
        servicesMeta: servicesPageMeta,
        aboutMeta: aboutPageMeta,
        portfolio: portfolioEntries.map(
            (e) => e.meta.en as PortfolioEntryMetaItem,
        ),
        portfolioMeta: portfolioPageMeta,
        testimonials: testimonialEntries.map(
            (e) => e.meta.en as TestimonialEntryMetaItem,
        ),
        testimonialsMeta: testimonialsPageMeta,
        bcms: bcms.getConfig(),
    };

    return res;
});
