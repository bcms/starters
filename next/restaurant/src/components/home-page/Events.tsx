import React from 'react';
import HomePageDivider from '@/components/home-page/Divider';
import ContentManager from '@/components/ContentManager';
import { PropRichTextDataParsed } from '@thebcms/types';
import { EventGroup } from '@bcms-types/types/ts';
import { ClientConfig } from '@thebcms/client';
import { EventCard } from '../events-page/EventCard';

interface Props {
    title: string;
    description: PropRichTextDataParsed;
    events: EventGroup[];
    bcmsConfig: ClientConfig;
}

const HomeEvents: React.FC<Props> = ({
    title,
    description,
    events,
    bcmsConfig,
}) => {
    return (
        <section className="overflow-hidden">
            <div className="container">
                <div className="flex flex-col items-center mb-8 lg:mb-20">
                    <div className="text-xs leading-none mb-2.5 lg:text-base lg:leading-none lg:mb-[14px]">
                        [ 5 ]
                    </div>
                    <h2 className="text-lg leading-none uppercase font-Gloock mb-4 lg:text-5xl lg:leading-none lg:mb-6">
                        {title}
                    </h2>
                    <ContentManager
                        items={description.nodes}
                        className="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-700 uppercase max-w-[745px] mx-auto
                    mb-8 lg:text-base lg:leading-[1.3] lg:mb-[45px]"
                    />
                </div>
                {events.length > 0 ? (
                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8">
                        {events.map((item, index) => (
                            <EventCard
                                key={index}
                                card={item}
                                bcmsConfig={bcmsConfig}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-sm leading-none tracking-[-0.41px] text-center text-appGray-700 my-20">
                        No events
                    </div>
                )}
            </div>
            <HomePageDivider arc />
        </section>
    );
};

export default HomeEvents;
