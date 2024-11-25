import React from 'react';
import { PropMediaDataParsed, PropRichTextDataParsed } from '@thebcms/types';
import { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-react';
import AboutUsOutline from '../../assets/icons/about-us-outline.inline.svg';
import ContentManager from '../ContentManager';
import ArchWithStar from '../ArchWithStar';
import Btn from '../Btn';

interface Props {
    title: PropRichTextDataParsed;
    subtitle: PropRichTextDataParsed;
    description: PropRichTextDataParsed;
    cover: PropMediaDataParsed;
    bcmsConfig: ClientConfig;
}

const AboutHero: React.FC<Props> = ({
    title,
    subtitle,
    description,
    cover,
    bcmsConfig,
}) => {
    return (
        <section className="pt-[108px] pb-10 overflow-hidden md:pb-14 lg:pt-[218px]">
            <div className="container max-w-[1198px]">
                <ArchWithStar />
                <div className="relative px-4 max-w-[400px] mx-auto lg:max-w-[962px] xl:px-0">
                    <AboutUsOutline className="absolute w-[220px] right-[30px] lg:w-[822px] lg:-right-4 lg:-top-6" />
                    <ContentManager
                        items={title.nodes}
                        className="aboutHero--title relative z-10 text-xl leading-none font-Gloock mb-2 lg:text-[56px] lg:leading-none lg:mb-3"
                    />
                    <ContentManager
                        items={subtitle.nodes}
                        className="relative z-10 text-[10px] leading-[1.2] uppercase max-w-max ml-auto mb-10 lg:text-base lg:leading-[1.2] lg:mb-[120px]"
                    />
                </div>
                <BCMSImage
                    media={cover}
                    clientConfig={bcmsConfig}
                    className="w-full object-cover aspect-[1.635] mb-4 lg:aspect-[2.67] lg:mb-10"
                />
                <ContentManager
                    items={description.nodes}
                    className="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-700 mb-6 lg:text-[32px] lg:leading-[1.3] lg:mb-14"
                />
                <Btn to="/menu" className="uppercase max-w-max mx-auto">
                    <span>Browse menu</span>
                </Btn>
            </div>
        </section>
    );
};

export default AboutHero;
