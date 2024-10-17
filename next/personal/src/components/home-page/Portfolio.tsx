'use client';

import React from 'react';
import { A11y, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import Link from 'next/link';
import classNames from 'classnames';
import { PropRichTextDataParsed } from '@thebcms/types';
import { PortfolioEntryMetaItem } from '@bcms-types/types/ts';
import ContentManager from '../ContentManager';
import { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-react';
import './_portfolio.scss';
import 'swiper/css';

interface Props {
    title: string;
    description: PropRichTextDataParsed;
    items: PortfolioEntryMetaItem[];
    bcmsConfig: ClientConfig;
}

SwiperCore.use([A11y, Pagination]);

const sliderOptions = {
    slidesPerView: 1,
    watchOverflow: true,
    spaceBetween: 12,
};

const HomePortfolio: React.FC<Props> = ({
    title,
    description,
    items,
    bcmsConfig,
}) => {
    return (
        <section className="pb-10 lg:pb-14">
            <div className="container">
                <div className="mb-8 md:flex md:items-start md:justify-between md:gap-16 lg:gap-20 lg:mb-10">
                    <div className="flex items-center mb-[14px] md:mt-4">
                        <div className="w-1.5 h-1.5 bg-appText rounded-full mr-2 lg:w-2.5 lg:h-2.5 lg:mr-4 lg:mt-1" />
                        <h2 className="text-lg leading-none tracking-[-0.41px] font-Helvetica lg:text-[32px] lg:leading-none">
                            {title}
                        </h2>
                    </div>
                    <div>
                        <ContentManager
                            items={description.nodes}
                            className="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 md:max-w-[761px] lg:text-base lg:leading-[1.4]"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-4 xl:grid-cols-[repeat(16,1fr)]">
                    {items.map((item, index) => (
                        <div
                            key={index}
                            className={classNames(
                                'flex flex-col rounded-3xl p-6 lg:p-8 lg:pb-4',
                                index % 2 === 2 || index % 3 === 0
                                    ? 'xl:col-span-7'
                                    : 'xl:col-span-9',
                            )}
                            style={{ backgroundColor: item.theme }}
                        >
                            <h3 className="leading-none tracking-[-0.41px] text-white mb-5 lg:text-xl lg:leading-none lg:mb-6">
                                {item.title}
                            </h3>
                            <Link
                                href={`/portfolio/${item.slug}`}
                                className="group relative flex mb-auto w-full xl:flex-1"
                            >
                                <Swiper
                                    {...sliderOptions}
                                    pagination={{
                                        el: `.homePortfolio--galleryPagination_${index}`,
                                    }}
                                    className="w-full rounded-3xl overflow-hidden"
                                >
                                    {item.gallery &&
                                        item.gallery.map(
                                            (galleryItem, galleryIndex) => (
                                                <SwiperSlide
                                                    key={galleryIndex}
                                                    className="w-full"
                                                >
                                                    <BCMSImage
                                                        media={galleryItem}
                                                        clientConfig={
                                                            bcmsConfig
                                                        }
                                                        className={classNames(
                                                            'size-full aspect-[1.45] object-cover rounded-3xl overflow-hidden',
                                                            index % 2 === 2 ||
                                                                index % 3 === 0
                                                                ? 'xl:aspect-[1.45]'
                                                                : 'xl:aspect-[1.84]',
                                                        )}
                                                    />
                                                </SwiperSlide>
                                            ),
                                        )}
                                </Swiper>
                                <div
                                    className="absolute z-10 top-0 left-0 w-full h-full rounded-3xl flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-300 group-hover:opacity-100"
                                    style={{
                                        background:
                                            'radial-gradient(50% 50% at 50% 50%, rgba(217, 217, 217, 0) 0%, #FFFFFF 100%)',
                                    }}
                                >
                                    <div className="px-6 py-4 bg-appText rounded-[32px] leading-none font-medium tracking-[-0.41px] text-white">
                                        Open project
                                    </div>
                                </div>
                            </Link>
                            {item.gallery.length > 0 && (
                                <div
                                    className={`homePortfolio--galleryPagination homePortfolio--galleryPagination_${index} mt-6 lg:mt-8`}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default HomePortfolio;
