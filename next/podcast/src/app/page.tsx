import React from 'react';
import { Metadata } from 'next';
import { bcms } from './bcms-client';
import {
    EpisodeEntry,
    EpisodeEntryMetaItem,
    HomePageEntry,
    HomePageEntryMetaItem,
} from '@bcms-types/types/ts';
import { notFound } from 'next/navigation';
import { HomePageHero } from '@/components/home-page/Hero';
import { HomePageEpisodes } from '@/components/home-page/Episodes';
import PageWrapper from '@/components/PageWrapper';

const pageTitle = 'Home - The Podium';
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
    const homePageEntry = (await bcms.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;

    if (!homePageEntry) {
        return notFound();
    }

    const meta = homePageEntry.meta.en as HomePageEntryMetaItem;

    const episodes = (await bcms.entry.getAll('episode')) as EpisodeEntry[];
    const episodesMeta = episodes.map(
        (episode) => episode.meta.en as EpisodeEntryMetaItem,
    );

    return (
        <PageWrapper bcms={bcms.getConfig()} episodes={episodesMeta}>
            <HomePageHero
                title={meta.hero_title}
                description={meta.hero_description}
                cover={meta.hero_cover_image}
                bcms={bcms.getConfig()}
                episodes={episodesMeta.slice(0, 3)}
            />
            <HomePageEpisodes
                title={meta.episodes_title}
                description={meta.episodes_description}
                bcms={bcms.getConfig()}
                episodes={episodesMeta}
            />
        </PageWrapper>
    );
};

export default HomePage;
