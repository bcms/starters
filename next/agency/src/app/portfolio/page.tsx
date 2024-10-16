import React from 'react';
import { Metadata } from 'next';
import { bcms } from '../bcms-client';
import {
    PortfolioEntry,
    PortfolioPageEntry,
    PortfolioPageEntryMetaItem,
} from '@bcms-types/types/ts';
import { notFound } from 'next/navigation';
import ContactBlock from '@/components/ContactBlock';
import List from './components/List';
import Hero from '@/components/Hero';

const pageTitle = 'Portfolio - BrandCrafters';
export const metadata: Metadata = {
    title: pageTitle,
    openGraph: {
        title: pageTitle,
    },
    twitter: {
        title: pageTitle,
    },
};

const PortfolioPage: React.FC = async () => {
    const portfolioPageEntry = (await bcms.entry.getBySlug(
        'portfolio',
        'portfolio-page',
    )) as PortfolioPageEntry;

    if (!portfolioPageEntry) {
        return notFound();
    }

    const portfolioPageMeta = portfolioPageEntry.meta
        .en as PortfolioPageEntryMetaItem;

    const portfolioEntries = (await bcms.entry.getAll(
        'portfolio',
    )) as PortfolioEntry[];

    return (
        <div>
            <Hero
                title={portfolioPageMeta.title}
                subtitle="Portfolio"
                description={portfolioPageMeta.description}
            />
            <List items={portfolioEntries} bcmsConfig={bcms.getConfig()} />
            <ContactBlock
                title={portfolioPageMeta.contact_title}
                description={portfolioPageMeta.contact_description}
            />
        </div>
    );
};

export default PortfolioPage;
