import React from 'react';
import { Metadata } from 'next';
import { bcms } from '../bcms-client';
import { EpisodeEntry, EpisodeEntryMetaItem } from '@bcms-types/types/ts';
import PageWrapper from '@/components/PageWrapper';
import Content from './components/Content';

const pageTitle = 'Now Playing - The Podium';
export const metadata: Metadata = {
    title: pageTitle,
    openGraph: {
        title: pageTitle,
    },
    twitter: {
        title: pageTitle,
    },
};

const NowPlayingPage: React.FC = async () => {
    const episodes = (await bcms.entry.getAll('episode')) as EpisodeEntry[];
    const episodesMeta = episodes.map(
        (episode) => episode.meta.en as EpisodeEntryMetaItem,
    );

    return (
        <PageWrapper bcms={bcms.getConfig()} episodes={episodesMeta}>
            <Content bcms={bcms.getConfig()} />
        </PageWrapper>
    );
};

export default NowPlayingPage;
