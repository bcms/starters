import React from 'react';
import SwiperCore from 'swiper';
import { A11y, Navigation } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import { BCMSImage } from '@thebcms/components-react';
import type { PropRichTextDataParsed } from '@thebcms/types';
import type { TestimonialGroup } from '../../../bcms/types/ts';
import type { ClientConfig } from '@thebcms/client';
import ContentManager from '../ContentManager';

interface Props {
    title: string;
    description: PropRichTextDataParsed;
    testimonials: TestimonialGroup[];
    bcmsConfig: ClientConfig;
}

SwiperCore.use([A11y, Navigation]);

const HomeTestimonials: React.FC<Props> = ({
    title,
    description,
    testimonials,
    bcmsConfig,
}) => {
    return (
        <section className="overflow-hidden pb-14 md:pb-20 lg:pb-[120px]">
            <div className="container">
                <div className="flex flex-col items-center">
                    <div className="text-xs leading-none mb-2.5 lg:text-base lg:leading-none lg:mb-[14px]">
                        [ 6 ]
                    </div>
                    <h2 className="text-lg leading-none uppercase font-Gloock mb-4 lg:text-5xl lg:leading-none lg:mb-6">
                        {title}
                    </h2>
                    <ContentManager
                        items={description.nodes}
                        className="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-700 uppercase max-w-[745px] mx-auto mb-10 lg:text-base lg:leading-[1.3] lg:mb-[45px]"
                    />
                    <div className="grid grid-cols-[auto,1fr,auto] gap-5 w-full lg:gap-24">
                        <button className="homeTestimonials--swiperPrev flex translate-y-[60px]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="w-4 h-4 flex-shrink-0 lg:w-12 lg:h-12"
                            >
                                <mask
                                    id="aaa"
                                    width="48"
                                    height="48"
                                    x="0"
                                    y="0"
                                    maskUnits="userSpaceOnUse"
                                    style={{ maskType: 'alpha' }}
                                >
                                    <path fill="#D9D9D9" d="M48 0H0v48h48z" />
                                </mask>
                                <g mask="url(#aaa)">
                                    <path
                                        fill="currentColor"
                                        d="m24 40 2.85-2.8L15.65 26H40v-4H15.65l11.2-11.2L24 8 8 24l16 16Z"
                                    />
                                </g>
                            </svg>
                        </button>
                        <Swiper
                            slidesPerView={1}
                            watchOverflow
                            grabCursor
                            spaceBetween={12}
                            navigation={{
                                prevEl: '.homeTestimonials--swiperPrev',
                                nextEl: '.homeTestimonials--swiperNext',
                            }}
                            className="w-full"
                        >
                            {testimonials.map((testimonial, index) => (
                                <SwiperSlide
                                    key={index}
                                    className="flex flex-col items-center justify-center text-center"
                                >
                                    <ContentManager
                                        items={testimonial.quote.nodes}
                                        className="text-sm leading-[1.4] font-Gloock text-appGray-700 mb-4 lg:text-[32px] lg:leading-[1.4] lg:mb-12"
                                    />
                                    <BCMSImage
                                        media={testimonial.author_avatar_image}
                                        clientConfig={bcmsConfig}
                                        className="w-10 h-10 rounded-full overflow-hidden object-cover mb-3 mx-auto lg:w-16 lg:h-16 lg:mb-6"
                                    />
                                    <div className="text-xs leading-none tracking-[-0.41px] text-appGray-700 uppercase lg:text-xl lg:leading-none">
                                        {testimonial.author_name}
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                        <button className="homeTestimonials--swiperNext flex translate-y-[60px]">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                className="w-4 h-4 flex-shrink-0 lg:w-12 lg:h-12"
                            >
                                <mask
                                    id="add"
                                    width="48"
                                    height="48"
                                    x="0"
                                    y="0"
                                    maskUnits="userSpaceOnUse"
                                    style={{ maskType: 'alpha' }}
                                >
                                    <path fill="#D9D9D9" d="M0 0h48v48H0z" />
                                </mask>
                                <g mask="url(#add)">
                                    <path
                                        fill="currentColor"
                                        d="m24 40-2.85-2.8L32.35 26H8v-4h24.35l-11.2-11.2L24 8l16 16-16 16Z"
                                    />
                                </g>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeTestimonials;
