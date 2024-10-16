import React from 'react';
import { Metadata } from 'next';
import { bcms } from '../bcms-client';
import {
    TeamMemberEntry,
    TeamPageEntry,
    TeamPageEntryMetaItem,
} from '@bcms-types/types/ts';
import { notFound } from 'next/navigation';
import ContactBlock from '@/components/ContactBlock';
import List from './components/List';
import Hero from '@/components/Hero';

const pageTitle = 'Team - BrandCrafters';
export const metadata: Metadata = {
    title: pageTitle,
    openGraph: {
        title: pageTitle,
    },
    twitter: {
        title: pageTitle,
    },
};

const TeamPage: React.FC = async () => {
    const teamPageEntry = (await bcms.entry.getBySlug(
        'team',
        'team-page',
    )) as TeamPageEntry;

    if (!teamPageEntry) {
        return notFound();
    }

    const teamPageMeta = teamPageEntry.meta.en as TeamPageEntryMetaItem;

    const teamMembersEntries = (await bcms.entry.getAll(
        'team-member',
    )) as TeamMemberEntry[];

    return (
        <div>
            <Hero
                title={teamPageMeta.title}
                subtitle="Team"
                description={teamPageMeta.description}
            />
            <List items={teamMembersEntries} bcmsConfig={bcms.getConfig()} />
            <ContactBlock
                title={teamPageMeta.contact_title}
                description={teamPageMeta.contact_description}
            />
        </div>
    );
};

export default TeamPage;
