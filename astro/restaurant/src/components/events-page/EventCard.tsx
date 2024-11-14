import { BCMSImage } from '@thebcms/components-react';
import React from 'react';
import ContentManager from '../ContentManager';
import type { EventGroup } from '../../../bcms/types/ts';
import type { ClientConfig } from '@thebcms/client';

interface Props {
    card: EventGroup;
    bcmsConfig: ClientConfig;
}

export const EventCard: React.FC<Props> = ({ card, bcmsConfig }) => {
    return (
        <article className="px-6 py-8 rounded-2xl bg-[#EDEBE1]">
            <BCMSImage
                media={card.cover_image}
                clientConfig={bcmsConfig}
                className="object-cover aspect-[1.25] w-full rounded-2xl overflow-hidden mb-4 lg:aspect-[1.77] lg:mb-6"
            />
            <div className="text-xs leading-none tracking-[-0.41px] text-appGray-600 uppercase mb-2 lg:text-base lg:leading-none lg:mb-3">
                {card.date}
            </div>
            <h3 className="leading-none font-Gloock mb-[14px] lg:text-[32px] lg:leading-none lg:mb-6">
                {card.title}
            </h3>
            <ContentManager
                items={card.description.nodes}
                className="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-300 lg:text-xl lg:leading-none"
            />
        </article>
    );
};
