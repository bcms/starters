import React from 'react';
import { A11y, Pagination } from 'swiper/modules';
import SwiperCore from 'swiper';
import { TestimonialEntry } from '../../../bcms/types';
import { BCMSImage } from 'gatsby-source-bcms/components';
import ContentManager from '@/components/ContentManager';
import { SwiperSlide, Swiper } from 'swiper/react';

interface TestimonialsProps {
  data: {
    nodes: Array<{
      bcms: TestimonialEntry;
    }>;
  };
}

SwiperCore.use([A11y, Pagination]);

const Testimonials: React.FC<TestimonialsProps> = ({ data }) => {
  const sliderOptions = {
    slidesPerView: 1.1,
    watchOverflow: true,
    grabCursor: true,
    spaceBetween: 16,
    pagination: {
      el: '.homeTestimonials--pagination',
      bulletElement: 'button',
      bulletClass: 'homeTestimonials--pagination-btn',
      bulletActiveClass: 'homeTestimonials--pagination-btn_active',
      clickable: true,
    },
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
          {data.nodes.map((slide, index) => (
            <SwiperSlide
              key={index}
              className="homeTestimonials--slide flex flex-col bg-appLight rounded-lg p-5 border border-[#CCCAC6] xl:p-8"
            >
              {slide.bcms.meta.en && (
                <>
                  <div className="flex items-center mb-[18px]">
                    <BCMSImage
                      media={slide.bcms.meta.en.author.avatar}
                      options={{
                        sizes: {
                          exec: [
                            {
                              width: 80,
                              height: 80,
                            },
                          ],
                        },
                      }}
                      className="w-8 h-8 cover rounded-full mr-[14px] xl:w-10 xl:h-10"
                    />
                    <span className="text-sm leading-none font-semibold font-PlayfairDisplay tracking-[-0.41px] xl:text-base xl:leading-none">
                      {slide.bcms.meta.en.author.name}
                    </span>
                  </div>
                  <ContentManager
                    item={slide.bcms.meta.en.review}
                    className="text-sm leading-[1.45] font-medium text-appGray-600 tracking-[-0.41px] xl:text-base xl:leading-[1.45]"
                  />
                </>
              )}
            </SwiperSlide>
          ))}
        </Swiper>
        <div className="homeTestimonials--pagination flex items-center gap-2.5 mt-8 lg:mt-12" />
      </div>
    </section>
  );
};

export default Testimonials;
