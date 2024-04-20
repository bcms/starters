import React, { useState } from 'react';
import { AgendaGroup } from '@/bcms/types';
import SwiperCore from 'swiper';
import { A11y, Pagination } from 'swiper/modules';
import { SwiperSlide, Swiper, SwiperClass } from 'swiper/react';
import ContentManager from '@/components/ContentManager';

SwiperCore.use([A11y, Pagination]);

const sliderOptions = {
  slidesPerView: 1,
  watchOverflow: true,
  grabCursor: true,
  spaceBetween: 20,
  pagination: {
    el: '.homeAgenda--pagination',
    clickable: true,
  },
};

interface HomePageAgendaProps {
  data: AgendaGroup;
}

const HomePageAgenda: React.FC<HomePageAgendaProps> = ({ data }) => {
  const [activeSlide, setActiveSlide] = useState<number>(0);

  const handleIndexChange = (swiper: SwiperClass): void => {
    setActiveSlide(swiper.activeIndex);
  };

  return (
    <section className="pb-[72px] lg:pb-[136px]">
      <div className="container">
        <div className="flex items-center justify-between mb-6 lg:mb-16">
          <div className="leading-none tracking-[-0.02em] font-semibold text-center lg:text-5xl lg:leading-none">
            {data.title}
          </div>
          <div className="flex px-2 py-[5px] bg-[#6BCD7D1A] rounded-[25px] text-sm leading-none tracking-[-0.04em] font-medium text-[#388045] lg:px-[15px] lg:py-2.5 lg:text-xl lg:leading-none">
            {data.days[activeSlide].label}
          </div>
        </div>
        <Swiper
          {...sliderOptions}
          className="mb-8 lg:mb-20"
          onActiveIndexChange={handleIndexChange}
        >
          {data.days.map((day, index) => (
            <SwiperSlide key={index}>
              <div className="grid grid-cols-1 gap-6 lg:gap-12">
                {day.items.map((item, itemItem) => (
                  <div
                    key={itemItem}
                    className="grid grid-cols-[70px,1fr] lg:grid-cols-[295px,1fr]"
                  >
                    <div className="text-sm leading-none tracking-[-0.04em] font-medium text-appGray-600 lg:text-2xl lg:leading-none">
                      {item.hours}
                    </div>
                    <div>
                      <div className="text-xs leading-none font-medium tracking-[-0.04em] text-appGray-600 mb-3 lg:text-xl lg:leading-none lg:mb-4">
                        {item.title}
                      </div>
                      <ContentManager
                        item={item.description}
                        className="text-sm leading-[1.4] tracking-[-0.41px] font-medium text-appGray-500 mb-4 lg:text-xl lg:leading-[1.4] lg:mb-6"
                      />
                      <div className="text-sm leading-none tracking-[-0.04em] font-medium text-appGray-600 lg:text-2xl lg:leading-none">
                        Location: {item.location}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="homeAgenda--pagination swiper--customPagination" />
      </div>
    </section>
  );
};

export default HomePageAgenda;
