import ArrowIcon from '../../assets/icons/arrow.inline.svg';
import { PropMediaDataParsed, PropRichTextDataParsed } from '@thebcms/types';
import { BCMSImage } from '@thebcms/components-react';
import { ClientConfig } from '@thebcms/client';
import React from 'react';
import ContentManager from '../ContentManager';

interface Props {
    title: string;
    cover: PropMediaDataParsed;
    description: PropRichTextDataParsed;
    topics: string[];
    bcmsConfig: ClientConfig;
}

const HomeAbout: React.FC<Props> = ({
    title,
    cover,
    description,
    topics,
    bcmsConfig,
}) => {
    return (
        <section className="pt-8 pb-16 lg:pt-[120px] lg:pb-[240px]">
            <div className="container">
                <div className="flex items-center justify-between mb-4 lg:mb-[72px]">
                    <h2 className="leading-none tracking-[-0.05em] font-semibold lg:text-[104px] lg:leading-none">
                        {title}
                    </h2>
                    <ArrowIcon className="w-4 h-4 lg:w-[100px] lg:h-[104px]" />
                </div>
                <BCMSImage
                    media={cover}
                    clientConfig={bcmsConfig}
                    className="w-full aspect-[1.78] object-cover mb-5 lg:aspect-[2.15] lg:mb-12"
                />
                <ContentManager
                    items={description.nodes}
                    className="text-sm leading-[1.4] tracking-[-0.8px] text-appGray-500 font-medium mb-6 lg:text-[26px] lg:leading-[1.4] lg:mb-[112px]"
                />
                <div className="flex flex-wrap justify-around gap-x-14 gap-y-8 lg:justify-center lg:gap-x-[96px]">
                    {topics.map((topic, index) => (
                        <div
                            key={index}
                            className="text-sm leading-none tracking-[-0.04em] font-semibold lg:text-[32px] lg:leading-none"
                        >
                            {topic}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomeAbout;
