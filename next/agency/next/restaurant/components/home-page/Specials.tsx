import { HomeSpecialsGroup, FoodItemEntryMeta } from '@/bcms/types';
import HomePageDivider from '@/components/home-page/Divider';
import React, { useState, useMemo } from 'react';
import ContentManager from '@/components/ContentManager';

import { A11y } from 'swiper/modules';
import SwiperCore from 'swiper';
import { SwiperSlide, Swiper } from 'swiper/react';
import classnames from 'classnames';
import { BCMSImage } from 'next-plugin-bcms/components';

SwiperCore.use([A11y]);

interface HomepageSpecialsProps {
  data: HomeSpecialsGroup;
  items: FoodItemEntryMeta[];
}
const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

const HomepageSpecials: React.FC<HomepageSpecialsProps> = ({ data, items }) => {
  const [activeDay, setActiveDay] = useState<string>('SUN');

  const sliderOptions = {
    slidesPerView: 'auto',
    watchOverflow: true,
    grabCursor: true,
    spaceBetween: '12',
    breakpoints: {
      1024: {
        spaceBetween: 16,
      },
    },
  };
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      return item.day_available.selected === activeDay;
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
            {data.title}
          </h2>
          <ContentManager
            item={data.description}
            className="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-700 uppercase max-w-[745px] mx-auto mb-8 lg:text-base lg:leading-[1.3] lg:mb-[45px]"
          />
          <Swiper
            {...sliderOptions}
            className="homeSpecials--swiper w-full max-w-max"
          >
            {days.map((day, index) => {
              return (
                <SwiperSlide key={index} className="homeSpecials--dayItem">
                  <button
                    className={classnames(
                      'flex justify-center w-full py-2.5 border rounded-[32px] transition-colors duration-300',
                      {
                        'border-appAccent bg-appAccent text-appBody':
                          day === activeDay,
                        'border-appText': day !== activeDay,
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
                    item={item.description}
                    className="leading-[1.3] tracking-[-0.41px] uppercase text-appGray-100 max-w-[475px] max-lg:hidden"
                  />
                </div>
                <BCMSImage
                  media={item.cover}
                  className="absolute top-0 left-0 w-full h-full cover"
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
      <HomePageDivider />
    </section>
  );
};

export default HomepageSpecials;
