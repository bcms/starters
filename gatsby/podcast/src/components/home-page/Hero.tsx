import React from 'react';
import { EpisodeEntryMetaItem } from '../../../bcms/types/ts';
import { PropMediaDataParsed, PropRichTextDataParsed } from '@thebcms/types';
import ContentManager from '../ContentManager';
import { ClientConfig } from '@thebcms/client';
import { EpisodesItem } from '../episodes/Item';
import { BCMSImage } from '@thebcms/components-react';

interface HomepageHeroProps {
    title: PropRichTextDataParsed;
    description: PropRichTextDataParsed;
    cover: PropMediaDataParsed;
    episodes: EpisodeEntryMetaItem[];
    bcms: ClientConfig;
}

export const HomePageHero: React.FC<HomepageHeroProps> = ({
    title,
    description,
    cover,
    episodes,
    bcms,
}) => {
    return (
        <section className="relative pt-[104px] lg:pt-[324px]">
            <div className="container">
                <div className="relative z-10 max-w-[488px] mx-auto lg:max-w-[784px]">
                    <ContentManager
                        items={title.nodes}
                        className="homeHero--title text-xl leading-none font-medium tracking-[-0.41px] text-white text-center mb-1 [&_u]:no-underline [&_u]:text-appAccent [&_u]:font-bold lg:text-[56px] lg:leading-none lg:tracking-[-2.41px] lg:mb-4"
                    />
                    <ContentManager
                        items={description.nodes}
                        className="text-sm leading-[1.3] tracking-[-0.8px] text-appGray-300 text-center max-w-[220px] mx-auto
                    mb-8 lg:text-xl lg:leading-none lg:max-w-none lg:mb-[72px]"
                    />
                    <div className="grid grid-cols-1 rounded-2xl bg-[#383838]/20 overflow-hidden space-y-px">
                        {episodes.map((episode, index) => (
                            <EpisodesItem
                                key={index}
                                item={episode}
                                index={index + 1}
                                bcms={bcms}
                                className="bg-appBody/80"
                            />
                        ))}
                    </div>
                </div>
            </div>
            <BCMSImage
                media={cover}
                clientConfig={bcms}
                className="absolute top-0 left-0 w-full h-full object-cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
            <div className="absolute z-10 bottom-0 left-0 w-full h-12 bg-gradient-to-b from-appBody/0 to-appBody pointer-events-none lg:h-[114px]" />
        </section>
    );
};
