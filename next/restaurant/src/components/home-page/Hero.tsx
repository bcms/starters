import React from 'react';
import ContentManager from '@/components/ContentManager';
import HomePageDivider from '@/components/home-page/Divider';
import StarIcon from '@/assets/icons/star.svg';
import Btn from '@/components/Btn';
import HomePageMap from '@/components/home-page/Map';
import { PropMediaDataParsed, PropRichTextDataParsed } from '@thebcms/types';
import { ClientConfig } from '@thebcms/client';
import { InlineTextWithImageGroup } from '@bcms-types/types/ts';
import { BCMSImage } from '@thebcms/components-react';

interface Props {
    title: string;
    open_time: PropRichTextDataParsed;
    address: string;
    map: PropMediaDataParsed;
    description: InlineTextWithImageGroup[];
    bcmsConfig: ClientConfig;
}

const HomeHero: React.FC<Props> = ({
    title,
    open_time,
    address,
    map,
    description,
    bcmsConfig,
}) => {
    return (
        <section className="pt-10 md:pt-20 lg:pt-[200px]">
            <div className="container">
                <div className="relative mb-[14px] lg:mb-12">
                    <svg
                        viewBox="0 0 1376 986"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlnsXlink="http://www.w3.org/1999/xlink"
                        className="w-full"
                    >
                        <path
                            d="M0 238.786C403.766 -78.5849 972.234 -78.5849 1376 238.786V986H0V238.786Z"
                            fill="url(#pattern0)"
                        />
                        <defs>
                            <pattern
                                id="pattern0"
                                patternContentUnits="objectBoundingBox"
                                width="1"
                                height="1"
                            >
                                <use
                                    xlinkHref="#image0_560_272"
                                    transform="matrix(0.000558036 0 0 0.000596162 0 -0.301242)"
                                />
                            </pattern>
                            <image
                                id="image0_560_272"
                                width="1792"
                                height="2688"
                                xlinkHref={`/home-cover.jpg`}
                            />
                        </defs>
                    </svg>
                    <div className="absolute top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-between xl:top-10 xl:w-full">
                        <div className="flex flex-col items-end max-xl:hidden">
                            <div className="text-lg leading-none mb-1.5">
                                {address}
                            </div>
                            <HomePageMap map={map} bcmConfig={bcmsConfig} />
                        </div>
                        <div className="h-px flex-1 bg-[#D9D9D9] mx-4 max-xl:hidden" />
                        <div className="bg-white px-4 py-[14px] rounded-[128px] max-w-max lg:px-20 lg:py-14">
                            <div className="flex items-center">
                                <StarIcon className="w-2 h-2 lg:w-12 lg:h-12" />
                                <h1 className="text-xl leading-none font-Gloock mx-2.5 lg:text-[80px] lg:leading-none lg:mx-12 2xl:text-[112px] 2xl:leading-none">
                                    {title}
                                </h1>
                                <StarIcon className="w-2 h-2 lg:w-12 lg:h-12" />
                            </div>
                        </div>
                        <div className="h-px flex-1 bg-[#D9D9D9] mx-4 max-xl:hidden" />
                        <ContentManager
                            items={open_time.nodes}
                            className="text-sm leading-none text-[#8F8E88] text-right [&_strong]:inline-block [&_strong]:leading-none [&_strong]:font-normal [&_strong]:text-base [&_strong]:text-[#1e293b] [&_strong]:mb-1.5 max-xl:hidden md:[&_strong]:text-lg md:[&_strong]:leading-none lg:text-left"
                        />
                    </div>
                </div>
                <div className="flex items-start justify-between mb-6 xl:hidden">
                    <div>
                        <div className="text-sm leading-none mb-1.5 lg:text-lg lg:leading-none">
                            {address}
                        </div>
                        <HomePageMap map={map} bcmConfig={bcmsConfig} />
                    </div>
                    <ContentManager
                        items={open_time.nodes}
                        className="text-sm leading-none text-[#8F8E88] text-right [&_strong]:inline-block [&_strong]:leading-none [&_strong]:font-normal [&_strong]:text-base [&_strong]:text-[#1e293b] [&_strong]:mb-1.5 md:[&_strong]:text-lg md:[&_strong]:leading-none lg:text-left"
                    />
                </div>
                <div className="homeHero--description mb-6 lg:mb-14">
                    {description.map((item, index) => {
                        return (
                            <React.Fragment key={index}>
                                {item.text && item.text.nodes.length > 0 && (
                                    <ContentManager
                                        items={item.text.nodes}
                                        className="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-700 lg:text-[40px] lg:leading-none"
                                    />
                                )}
                                {item.image && (
                                    <BCMSImage
                                        media={item.image}
                                        clientConfig={bcmsConfig}
                                        className="h-4 flex-shrink-0 mx-2 bg-center bg-cover lg:hidden"
                                        style={{
                                            width: `${item.image.width / 5}px`,
                                        }}
                                    />
                                )}
                                {item.image && (
                                    <BCMSImage
                                        media={item.image}
                                        clientConfig={bcmsConfig}
                                        className="h-10 flex-shrink-0 mx-4 -translate-y-2 bg-center bg-cover max-lg:hidden"
                                        style={{
                                            width: `${item.image.width / 2}px`,
                                        }}
                                    />
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
                <Btn to="/about-us" className="uppercase max-w-max mx-auto">
                    <span>
                        Learn more <span className="sr-only">about us</span>
                    </span>
                </Btn>
                <HomePageDivider />
            </div>
        </section>
    );
};

export default HomeHero;
