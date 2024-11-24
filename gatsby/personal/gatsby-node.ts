import { config } from 'dotenv';
config();
import { CreatePagesArgs } from 'gatsby';
import path from 'node:path';
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
    TestimonialsPageEntry,
    TestimonialsPageEntryMetaItem,
} from './bcms/types/ts';
import { Client } from '@thebcms/client';
import {
    HomePageContent,
    PortfolioPageContent,
    PortfoliosPageContent,
    TestimonialsPageContent,
} from './src/types';
import { AboutPageContent } from './src/types/page/about';

const bcms = new Client(
    process.env.BCMS_ORG_ID || '',
    process.env.BCMS_INSTANCE_ID || '',
    {
        id: process.env.BCMS_API_KEY_ID || '',
        secret: process.env.BCMS_API_KEY_SECRET || '',
    },
    {
        injectSvg: true,
    },
);

export const createPages = async ({
    actions: { createPage },
}: CreatePagesArgs) => {
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

    // HOME
    const homeTemplate = path.resolve('./src/templates/home.tsx');
    createPage({
        path: `/`,
        component: homeTemplate,
        context: {
            meta: homePageMeta,
            aboutMeta: aboutPageMeta,
            servicesMeta: servicesPageMeta,
            services: servicesEntries,
            portfolioMeta: portfolioPageMeta,
            portfolio: portfolioEntries,
            testimonialsMeta: testimonialsPageMeta,
            testimonials: testimonialEntries,
            bcms: bcms.getConfig(),
        } as HomePageContent,
    });

    // TESTIMONIALS
    const testimonialsTemplate = path.resolve(
        './src/templates/testimonials.tsx',
    );
    createPage({
        path: `/testimonials`,
        component: testimonialsTemplate,
        context: {
            meta: testimonialsPageMeta,
            testimonials: testimonialEntries,
            bcms: bcms.getConfig(),
        } as TestimonialsPageContent,
    });

    // SERVICES
    const servicesTemplate = path.resolve('./src/templates/services.tsx');
    createPage({
        path: `/services`,
        component: servicesTemplate,
        context: {
            meta: servicesPageMeta,
            services: servicesEntries,
            bcms: bcms.getConfig(),
        },
    });

    // CONTACT
    const contactTemplate = path.resolve('./src/templates/contact.tsx');
    createPage({
        path: `/contact`,
        component: contactTemplate,
    });

    // ABOUT
    const aboutTemplate = path.resolve('./src/templates/about.tsx');
    createPage({
        path: `/about`,
        component: aboutTemplate,
        context: {
            meta: aboutPageMeta,
            bcms: bcms.getConfig(),
        } as AboutPageContent,
    });

    // PORTFOLIOS
    const portfoliosTemplate = path.resolve('./src/templates/portfolios.tsx');
    createPage({
        path: `/portfolio`,
        component: portfoliosTemplate,
        context: {
            meta: portfolioPageMeta,
            portfolio: portfolioEntries,
            bcms: bcms.getConfig(),
        } as PortfoliosPageContent,
    });

    // PORTFOLIO
    const portfolioTemplate = path.resolve('./src/templates/portfolio.tsx');
    portfolioEntries.forEach((entry) => {
        const meta = entry.meta.en as PortfolioEntryMetaItem;
        createPage({
            path: `/portfolio/${meta.slug}`,
            component: portfolioTemplate,
            context: {
                meta: meta,
                bcms: bcms.getConfig(),
            } as PortfolioPageContent,
        });
    });
};
