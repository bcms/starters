import React from 'react';
import { bcms } from '@/app/bcms-client';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PageWrapper from '@/components/PageWrapper';
import { EpisodeEntry, EpisodeEntryMetaItem } from '@bcms-types/types/ts';
import Content from './components/Content';

type Props = {
    params: {
        slug: string;
    };
};

export async function generateStaticParams() {
    const episodes = (await bcms.entry.getAll('episode')) as EpisodeEntry[];
    const episodesMeta = episodes.map(
        (episode) => episode.meta.en as EpisodeEntryMetaItem,
    );

    return episodesMeta.map((episode) => {
        return {
            slug: episode.slug,
        };
    });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const episode = (await bcms.entry.getBySlug(
        params.slug,
        'episode',
    )) as EpisodeEntry;

    if (!episode) {
        return notFound();
    }

    const episodeMeta = episode.meta.en as EpisodeEntryMetaItem;
    const pageTitle = `${episodeMeta.seo?.title || episodeMeta.title} - The Podium`;

    return {
        title: pageTitle,
        openGraph: {
            title: pageTitle,
        },
        twitter: {
            title: pageTitle,
        },
    };
}

const EpisodePage: React.FC<Props> = async ({ params }) => {
    const episodes = (await bcms.entry.getAll('episode')) as EpisodeEntry[];

    const episodesMeta = episodes.map(
        (episode) => episode.meta.en as EpisodeEntryMetaItem,
    );
    const episode = episodesMeta.find(
        (episode) => episode.slug === params.slug,
    );

    if (!episode) {
        return notFound();
    }

    return (
        <PageWrapper bcms={bcms.getConfig()} episodes={episodesMeta}>
            <Content bcms={bcms.getConfig()} meta={episode} />
        </PageWrapper>
    );
};

export default EpisodePage;
