'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';
import SvgoArrow from '@/assets/icons/arrow.svg';
import { PropRichTextDataParsed } from '@thebcms/types';
import ContentManager from '../ContentManager';
import { PortfolioEntryMetaItem } from '@bcms-types/types/ts';
import { BCMSImage } from '@thebcms/components-react';
import { ClientConfig } from '@thebcms/client';
import 'swiper/css';

interface Props {
    title: string;
    subtitle: string;
    description: PropRichTextDataParsed;
    portfolio_items: PortfolioEntryMetaItem[];
    bcmsConfig: ClientConfig;
}

const HomeCapabilities: React.FC<Props> = ({
    title,
    subtitle,
    description,
    portfolio_items,
    bcmsConfig,
}) => {
    return (
        <section className="mb-8 lg:mb-16 xl:mb-[104px]">
            <div className="container">
                <div className="flex flex-col gap-6 mb-8 lg:grid lg:grid-cols-[254px,1fr] lg:mb-12 xl:mb-16">
                    <div className="text-appGray-300 font-Inter text-xs font-medium leading-none tracking-[-0.24px] lg:text-base lg:leading-none lg:tracking-[-0.32px] lg:flex-shrink-0">
                        {subtitle}
                    </div>
                    <div>
                        <h2 className="font-bold leading-[1.2] tracking-[-0.32px] max-w-[52%] mb-2 lg:text-[32px] lg:tracking-[-0.64px] lg:max-w-[488px]">
                            {title}
                        </h2>
                        <ContentManager
                            items={description.nodes}
                            className="text-appGray-200 text-xs font-medium leading-[1.3] tracking-[-0.24px] max-w-[66%] mb-8 lg:text-base lg:leading-[1.3] lg:tracking-[-0.32px] lg:max-w-[488px]"
                        />
                        <Link
                            href="/portfolio"
                            className="flex items-center gap-1 text-appGray-300 transition-colors duration-300 hover:text-appText"
                        >
                            <span className="font-Inter text-xs font-medium leading-none tracking-[-0.24px] lg:text-base lg:leading-none lg:tracking-[-0.32px]">
                                See all portfolios
                            </span>
                            <SvgoArrow className="w-4 h-4" />
                        </Link>
                    </div>
                </div>
            </div>
            <div className="lg:container">
                <Swiper
                    slidesPerView={1.6}
                    spaceBetween={24}
                    breakpoints={{
                        768: {
                            slidesPerView: 2.1,
                        },
                    }}
                    className="!overflow-visible !px-5 lg:!pl-[278px]"
                >
                    {portfolio_items.map((item, index) => (
                        <SwiperSlide key={index}>
                            <Link
                                href={item.url}
                                target="_blank"
                                className="flex flex-col gap-2.5 lg:gap-6"
                            >
                                <BCMSImage
                                    media={item.project_image}
                                    clientConfig={bcmsConfig}
                                    className="size-full object-cover rounded overflow-hidden lg:rounded-2xl"
                                    style={{
                                        boxShadow:
                                            '0px 0px 0px 1px #EDEDED, 0px 1.5px 1px 0px rgba(15, 18, 35, 0.14)',
                                    }}
                                />
                                <h3 className="text-appGray-300 font-Inter text-xs font-semibold leading-none tracking-[-0.24px] lg:text-base lg:leading-none lg:tracking-[-0.32px]">
                                    {item.subtitle}
                                </h3>
                            </Link>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default HomeCapabilities;
