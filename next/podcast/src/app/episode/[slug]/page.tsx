import React from 'react';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import PageWrapper from '@/components/PageWrapper';
import { EpisodeEntry, EpisodeEntryMetaItem } from '@bcms-types/types/ts';
import Content from './components/Content';
import { bcmsPublic } from '@/app/bcms-public';
import { bcmsPrivate } from '@/app/bcms-private';

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export async function generateStaticParams() {
    const episodes = (await bcmsPrivate.entry.getAll(
        'episode',
    )) as EpisodeEntry[];
    const episodesMeta = episodes.map(
        (episode) => episode.meta.en as EpisodeEntryMetaItem,
    );

    return episodesMeta.map((episode) => {
        return {
            slug: episode.slug,
        };
    });
}

export async function generateMetadata(props: Props): Promise<Metadata> {
    const params = await props.params;
    const episode = (await bcmsPrivate.entry.getBySlug(
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

const EpisodePage: React.FC<Props> = async (props) => {
    const params = await props.params;
    const episodes = (await bcmsPrivate.entry.getAll(
        'episode',
    )) as EpisodeEntry[];

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
        <PageWrapper bcms={bcmsPublic.getConfig()} episodes={episodesMeta}>
            <Content bcms={bcmsPublic.getConfig()} meta={episode} />
        </PageWrapper>
    );
};

export default EpisodePage;
