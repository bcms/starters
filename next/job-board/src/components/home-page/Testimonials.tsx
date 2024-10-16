'use client';

import React from 'react';
import { A11y } from 'swiper/modules';
import SwiperCore from 'swiper';
import ContentManager from '@/components/ContentManager';
import { SwiperSlide, Swiper } from 'swiper/react';
import { TestimonialEntryMetaItem } from '@bcms-types/types/ts';
import { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-react';
import 'swiper/css';
import { SwiperOptions } from 'swiper/types';

interface Props {
    testimonials: TestimonialEntryMetaItem[];
    bcmsConfig: ClientConfig;
}

SwiperCore.use([A11y]);

const Testimonials: React.FC<Props> = ({ testimonials, bcmsConfig }) => {
    const sliderOptions: SwiperOptions = {
        slidesPerView: 1.1,
        watchOverflow: true,
        grabCursor: true,
        spaceBetween: 16,
        breakpoints: {
            640: {
                slidesPerView: 2,
            },
            1024: {
                slidesPerView: 3,
            },
            1280: {
                slidesPerView: 4,
                spaceBetween: 32,
            },
        },
    };

    return (
        <section className="pt-12 pb-14 md:py-20 lg:py-[120px]">
            <div className="container">
                <Swiper {...sliderOptions}>
                    {testimonials.map((slide, index) => (
                        <SwiperSlide
                            key={index}
                            className="!h-auto flex flex-col bg-appLight rounded-lg p-5 border border-[#CCCAC6] xl:p-8"
                        >
                            <div className="flex items-center mb-[18px]">
                                <BCMSImage
                                    media={slide.author.avatar_image}
                                    clientConfig={bcmsConfig}
                                    className="w-8 h-8 object-cover rounded-full mr-[14px] xl:w-10 xl:h-10"
                                />
                                <span className="text-sm leading-none font-semibold font-PlayfairDisplay tracking-[-0.41px] xl:text-base xl:leading-none">
                                    {slide.author.name}
                                </span>
                            </div>
                            <ContentManager
                                items={slide.review.nodes}
                                className="text-sm leading-[1.45] font-medium text-appGray-600 tracking-[-0.41px] xl:text-base xl:leading-[1.45]"
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default Testimonials;
