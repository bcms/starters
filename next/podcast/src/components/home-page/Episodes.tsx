'use client';

import { PropRichTextDataParsed } from '@thebcms/types';
import React, { useMemo } from 'react';
import { EpisodeEntryMetaItem } from '../../../bcms/types/ts';
import { ClientConfig } from '@thebcms/client';
import ContentManager from '../ContentManager';
import { EpisodesItem } from '../episodes/Item';

interface HomepageEpisodesProps {
    title: PropRichTextDataParsed;
    description: PropRichTextDataParsed;
    episodes: EpisodeEntryMetaItem[];
    bcms: ClientConfig;
}

export const HomePageEpisodes: React.FC<HomepageEpisodesProps> = ({
    title,
    description,
    episodes,
    bcms,
}) => {
    const sortedEpisodes = useMemo(() => {
        return episodes.sort((a, b) => b.date.timestamp - a.date.timestamp);
    }, [episodes]);

    return (
        <section
            id="episodes"
            className="relative pt-8 pb-10 lg:pt-[151px] lg:pb-[128px]"
        >
            <div className="container max-w-[1229px]">
                <ContentManager
                    items={title.nodes}
                    className="homeEpisodes--title text-xl leading-none font-medium tracking-[-0.41px] text-white text-center mb-1 [&_u]:no-underline [&_u]:text-appAccent [&_u]:font-bold lg:text-[56px] lg:leading-none lg:tracking-[-2.41px] lg:mb-4"
                />
                <ContentManager
                    items={description.nodes}
                    className="text-sm leading-[1.3] tracking-[-0.8px] text-appGray-300 text-center max-w-[220px] mx-auto mb-8
                lg:text-xl lg:leading-none lg:max-w-none lg:mb-16"
                />
                <div className="grid grid-cols-1 rounded-2xl bg-[#383838]/80 overflow-hidden space-y-px">
                    {sortedEpisodes.map((episode, index) => (
                        <EpisodesItem
                            key={index}
                            item={episode}
                            index={index + 1}
                            bcms={bcms}
                            className="bg-appBody"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};
