import { config } from 'dotenv';
config();
import { CreatePagesArgs } from 'gatsby';
import path from 'node:path';
import {
    HomePageEntry,
    HomePageEntryMetaItem,
    LegalPageEntry,
    LegalPageEntryMetaItem,
    PortfolioEntry,
    PortfolioPageEntry,
    PortfolioPageEntryMetaItem,
    ServiceEntry,
    ServicesPageEntry,
    ServicesPageEntryMetaItem,
    TeamMemberEntry,
    TeamPageEntry,
    TeamPageEntryMetaItem,
} from './bcms/types/ts';
import { Client } from '@thebcms/client';
import {
    HomePageContent,
    LegalPageContent,
    PortfolioPageContent,
    ServicesPageContent,
    TeamPageContent,
} from './src/types';

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
    // HOME
    const homeTemplate = path.resolve('./src/templates/home.tsx');
    const homePageEntry = (await bcms.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;

    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;

    createPage({
        path: `/`,
        component: homeTemplate,
        context: {
            meta: homePageMeta,
            bcms: bcms.getConfig(),
        } as HomePageContent,
    });

    // TEAM
    const teamTemplate = path.resolve('./src/templates/team.tsx');
    const teamPageEntry = (await bcms.entry.getBySlug(
        'team',
        'team-page',
    )) as TeamPageEntry;

    const teamPageMeta = teamPageEntry.meta.en as TeamPageEntryMetaItem;

    const teamMembersEntries = (await bcms.entry.getAll(
        'team-member',
    )) as TeamMemberEntry[];

    createPage({
        path: `/team`,
        component: teamTemplate,
        context: {
            meta: teamPageMeta,
            entries: teamMembersEntries,
            bcms: bcms.getConfig(),
        } as TeamPageContent,
    });

    // SERVICES
    const servicesTemplate = path.resolve('./src/templates/services.tsx');
    const servicesPageEntry = (await bcms.entry.getBySlug(
        'services',
        'services-page',
    )) as ServicesPageEntry;

    const servicesPageMeta = servicesPageEntry.meta
        .en as ServicesPageEntryMetaItem;

    const servicesEntries = (await bcms.entry.getAll(
        'service',
    )) as ServiceEntry[];

    createPage({
        path: `/services`,
        component: servicesTemplate,
        context: {
            meta: servicesPageMeta,
            entries: servicesEntries,
            bcms: bcms.getConfig(),
        } as ServicesPageContent,
    });

    // PORTFOLIO
    const portfolioTemplate = path.resolve('./src/templates/portfolio.tsx');
    const portfolioPageEntry = (await bcms.entry.getBySlug(
        'portfolio',
        'portfolio-page',
    )) as PortfolioPageEntry;

    const portfolioPageMeta = portfolioPageEntry.meta
        .en as PortfolioPageEntryMetaItem;

    const portfolioEntries = (await bcms.entry.getAll(
        'portfolio',
    )) as PortfolioEntry[];

    createPage({
        path: `/portfolio`,
        component: portfolioTemplate,
        context: {
            meta: portfolioPageMeta,
            entries: portfolioEntries,
            bcms: bcms.getConfig(),
        } as PortfolioPageContent,
    });

    // LEGAL
    const legalTemplate = path.resolve('./src/templates/legal.tsx');
    const legalPageEntry = (await bcms.entry.getBySlug(
        'legal',
        'legal-page',
    )) as LegalPageEntry;

    const legalPageMeta = legalPageEntry.meta.en as LegalPageEntryMetaItem;

    createPage({
        path: `/legal`,
        component: legalTemplate,
        context: {
            meta: legalPageMeta,
            bcms: bcms.getConfig(),
        } as LegalPageContent,
    });

    // CONTACT
    const contactTemplate = path.resolve('./src/templates/contact.tsx');
    createPage({
        path: `/contact`,
        component: contactTemplate,
    });
};
