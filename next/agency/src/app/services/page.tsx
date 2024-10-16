import React from 'react';
import { Metadata } from 'next';
import { bcms } from '../bcms-client';
import { notFound } from 'next/navigation';
import ContactBlock from '@/components/ContactBlock';
import Hero from '@/components/Hero';
import {
    ServiceEntry,
    ServicesPageEntry,
    ServicesPageEntryMetaItem,
} from '@bcms-types/types/ts';
import List from './components/List';

const pageTitle = 'Services - BrandCrafters';
export const metadata: Metadata = {
    title: pageTitle,
    openGraph: {
        title: pageTitle,
    },
    twitter: {
        title: pageTitle,
    },
};

const ServicesPage: React.FC = async () => {
    const servicesPageEntry = (await bcms.entry.getBySlug(
        'services',
        'services-page',
    )) as ServicesPageEntry;

    if (!servicesPageEntry) {
        return notFound();
    }

    const servicesPageMeta = servicesPageEntry.meta
        .en as ServicesPageEntryMetaItem;

    const servicesEntries = (await bcms.entry.getAll(
        'service',
    )) as ServiceEntry[];

    return (
        <div>
            <Hero
                title={servicesPageMeta.title}
                subtitle="Services"
                description={servicesPageMeta.description}
            />
            <List items={servicesEntries} bcmsConfig={bcms.getConfig()} />
            <ContactBlock
                title={servicesPageMeta.contact_title}
                description={servicesPageMeta.contact_description}
            />
        </div>
    );
};

export default ServicesPage;
