import React, { useState, useMemo } from 'react';
import { A11y } from 'swiper/modules';
import SwiperCore from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import classnames from 'classnames';
import { PropRichTextDataParsed } from '@thebcms/types';
import { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-react';
import { FoodItemEntryMetaItem } from '../../../bcms/types/ts';
import ContentManager from '../ContentManager';
import HomeDivider from './Divider';

SwiperCore.use([A11y]);

interface Props {
    title: string;
    description: PropRichTextDataParsed;
    items: FoodItemEntryMetaItem[];
    bcmsConfig: ClientConfig;
}

const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const HomeSpecials: React.FC<Props> = ({
    title,
    description,
    items,
    bcmsConfig,
}) => {
    const [activeDay, setActiveDay] = useState('SUN');

    const filteredItems = useMemo(() => {
        return items.filter((item) => {
            return item.day_available === activeDay && item.special;
        });
    }, [activeDay]);

    return (
        <section className="overflow-hidden">
            <div className="container">
                <div className="flex flex-col items-center mb-8 lg:mb-20">
                    <div className="text-xs leading-none mb-2.5 lg:text-base lg:leading-none lg:mb-[14px]">
                        [ 4 ]
                    </div>
                    <h2 className="text-lg leading-none uppercase font-Gloock mb-4 lg:text-5xl lg:leading-none lg:mb-6">
                        {title}
                    </h2>
                    <ContentManager
                        items={description.nodes}
                        className="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-700 uppercase max-w-[745px] mx-auto mb-8 lg:text-base lg:leading-[1.3] lg:mb-[45px]"
                    />
                    <Swiper
                        slidesPerView={'auto'}
                        watchOverflow
                        grabCursor
                        spaceBetween={12}
                        breakpoints={{
                            1024: {
                                spaceBetween: 16,
                            },
                        }}
                        className="w-full max-w-max !overflow-visible"
                    >
                        {days.map((day, index) => {
                            return (
                                <SwiperSlide
                                    key={index}
                                    className="!w-[112px] lg:!w-[72px]"
                                >
                                    <button
                                        className={classnames(
                                            'flex justify-center w-full py-2.5 border rounded-[32px] transition-colors duration-300',
                                            {
                                                'border-appAccent bg-appAccent text-appBody':
                                                    day === activeDay,
                                                'border-appText':
                                                    day !== activeDay,
                                            },
                                        )}
                                        onClick={() => setActiveDay(day)}
                                    >
                                        <span className="text-xs leading-none tracking-[-0.41px] lg:text-base lg:leading-none">
                                            {day}
                                        </span>
                                    </button>
                                </SwiperSlide>
                            );
                        })}
                    </Swiper>
                </div>
                {filteredItems.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4 auto-rows-fr lg:gap-6">
                        {filteredItems.map((item, index) => (
                            <div
                                key={index}
                                className="homeSpecials--gridItem w-full h-full relative lg:min-h-[360px]"
                            >
                                <div className="relative z-10 flex flex-col items-center justify-center h-full p-2 lg:items-start lg:justify-between lg:p-10">
                                    <h3 className="text-xs leading-none uppercase text-white font-Gloock text-center lg:text-[32px] lg:leading-none lg:mb-[18px]">
                                        {item.title}
                                    </h3>
                                    <ContentManager
                                        items={item.description.nodes}
                                        className="leading-[1.3] tracking-[-0.41px] uppercase text-appGray-100 max-w-[475px] max-lg:hidden"
                                    />
                                </div>
                                <BCMSImage
                                    media={item.cover_image}
                                    clientConfig={bcmsConfig}
                                    className="absolute top-0 left-0 w-full h-full object-cover"
                                />
                                <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-sm leading-none tracking-[-0.41px] text-center text-appGray-700 my-20">
                        No specials for this day
                    </div>
                )}
            </div>
            <HomeDivider />
        </section>
    );
};

export default HomeSpecials;
