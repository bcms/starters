import React from 'react';
import { Metadata } from 'next';
import { EpisodeEntry, EpisodeEntryMetaItem } from '@bcms-types/types/ts';
import PageWrapper from '@/components/PageWrapper';
import Content from './components/Content';
import { bcmsPrivate } from '@/app/bcms-private';
import { bcmsPublic } from '@/app/bcms-public';

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
    const episodes = (await bcmsPrivate.entry.getAll(
        'episode',
    )) as EpisodeEntry[];
    const episodesMeta = episodes.map(
        (episode) => episode.meta.en as EpisodeEntryMetaItem,
    );

    return (
        <PageWrapper bcms={bcmsPublic.getConfig()} episodes={episodesMeta}>
            <Content bcms={bcmsPublic.getConfig()} />
        </PageWrapper>
    );
};

export default NowPlayingPage;
