import React, { type FC } from 'react';
import { BCMSImage } from '@thebcms/components-react';
import type { InlineTextWithImageGroup } from '../../../bcms/types/ts';
import type { PropMediaDataParsed, PropRichTextDataParsed } from '@thebcms/types';
import type { ClientConfig } from '@thebcms/client';
import ContentManager from '../ContentManager';
import Btn from '../Btn';

interface Props {
    title: InlineTextWithImageGroup[];
    description: PropRichTextDataParsed;
    cover: PropMediaDataParsed;
    bcmsConfig: ClientConfig;
}

const HomeHero: FC<Props> = ({ title, description, cover, bcmsConfig }) => {
    const scrollToJobs = () => {
        const jobs = document.getElementById('homeJobs');

        if (jobs) {
            jobs.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section className="pt-10 lg:pt-[104px]">
            <div className="container">
                <div className="max-w-[250px] mx-auto md:max-w-[350px] lg:max-w-[840px]">
                    <h1 className="mb-4 lg:mb-8 [&_*]:inline">
                        {title.map((item, index) => (
                            <React.Fragment key={index}>
                                {item.text && item.text.nodes.length > 0 && (
                                    <ContentManager
                                        items={item.text.nodes}
                                        className="text-2xl leading-[1.4] font-medium font-PlayfairDisplay tracking-[-0.41px] md:text-4xl lg:text-[80px] lg:leading-[1.1]"
                                    />
                                )}
                                {item.image && (
                                    <BCMSImage
                                        key={index}
                                        media={item.image}
                                        clientConfig={bcmsConfig}
                                        className="inline-block object-cover w-[53px] h-6 flex-shrink-0 -translate-y-1 mx-1 bg-center bg-cover lg:w-[176px] lg:h-20 lg:mx-3 lg:-translate-y-5"
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </h1>
                    <ContentManager
                        items={description.nodes}
                        className="text-sm leading-[1.4] font-medium tracking-[-0.41px] text-center text-appGray-600 mb-8 md:text-base lg:leading-none lg:mb-10"
                    />
                    <Btn
                        className="mx-auto mb-12 lg:mb-[120px]"
                        onClick={scrollToJobs}
                    >
                        <span>Search Jobs Now</span>
                    </Btn>
                </div>
            </div>
            <div className="relative">
                <BCMSImage
                    media={cover}
                    clientConfig={bcmsConfig}
                    className="w-full aspect-[2.76] object-cover lg:aspect-[3.1]"
                />
                <div className="absolute top-0 left-0 w-full h-full bg-black/60" />
            </div>
        </section>
    );
};

export default HomeHero;
