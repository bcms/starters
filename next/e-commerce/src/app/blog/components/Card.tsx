import { BlogEntryMetaItem } from '@bcms-types/types/ts';
import { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-react';
import Link from 'next/link';
import React, { FC } from 'react';

interface Props {
    card: BlogEntryMetaItem;
    style?: React.CSSProperties;
    bcms: ClientConfig;
}

const Card: FC<Props> = ({ card, style, bcms }) => {
    const formattedDate = (date: number) => {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };

    return (
        <Link
            href={`/blog/${card.slug}`}
            className="group flex flex-col"
            style={style}
        >
            <div className="flex overflow-hidden mb-6">
                <div className="size-full">
                    <BCMSImage
                        media={card.media_image}
                        className="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-105"
                        clientConfig={bcms}
                    />
                </div>
            </div>
            <div className="mb-6">
                <div className="flex items-center gap-1.5 leading-none tracking-[-2%] text-appGray-500 mb-3 lg:text-[18px]">
                    <div>{formattedDate(card.date.timestamp)}</div>
                    <div className="w-1 h-1 rounded-full bg-current mt-1" />
                    <div>By {card.author.meta.en?.title}</div>
                </div>
                <h3 className="text-xl leading-none tracking-[-2%] lg:text-[24px]">
                    {card.title}
                </h3>
            </div>
            <div className="flex justify-center w-full leading-none tracking-[-0.3px] px-14 pt-3.5 pb-[18px] mt-auto bg-appText text-white transition-colors duration-300 hover:bg-appText/80">
                Read now
            </div>
        </Link>
    );
};

export default Card;
