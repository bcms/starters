import { SponsorsGroup } from '@/bcms/types';
import classNames from 'classnames';
import { useMemo, useState } from 'react';
import SwiperCore from 'swiper';
import { A11y, Pagination } from 'swiper/modules';
import { SwiperSlide, Swiper } from 'swiper/react';
import ContentManager from '@/components/ContentManager';
import { BCMSImage } from 'next-plugin-bcms/components';
import ContactForm from '@/components/ContactForm';

interface HomePageSponsorsProps {
  data: SponsorsGroup;
}

type TiersType = 'general' | 'platinum' | 'gold' | 'pr partners';

const tiers: TiersType[] = ['general', 'platinum', 'gold', 'pr partners'];

SwiperCore.use([A11y, Pagination]);

const sliderOptions = {
  slidesPerView: 1,
  watchOverflow: true,
  grabCursor: true,
  spaceBetween: 20,
  pagination: {
    el: '.homeSponsors--pagination',
    clickable: true,
  },
};
const HomePageSponsors: React.FC<HomePageSponsorsProps> = ({ data }) => {
  const [activeTier, setActiveTier] = useState<TiersType>('platinum');

  const [showContactForm, setShowContactForm] = useState<boolean>(false);

  const filteredSponsors = useMemo(() => {
    return data.sponsors.filter(
      (sponsor) => sponsor.tier.toLowerCase() === activeTier.toLowerCase(),
    );
  }, [activeTier]);
  return (
    <section className="pb-16 lg:pb-[176px]">
      <div className="container">
        <div className="leading-none tracking-[-0.02em] font-semibold text-center mb-6 lg:text-5xl lg:leading-none lg:mb-16">
          {data.title}
        </div>
        <div className="p-1.5 rounded-[64px] bg-appGray-200 grid grid-cols-4 mb-8 lg:max-w-[828px] lg:mx-auto lg:mb-[128px]">
          {tiers.map((tier) => (
            <button
              className={classNames(
                'flex justify-center capitalize px-1 py-[7px] rounded-[38px] text-xs leading-none tracking-[-0.04em] transition-colors duration-300 lg:py-[18px] lg:text-2xl lg:leading-none',
                {
                  'text-white bg-appAccent font-semibold': activeTier === tier,
                  'text-appGray-600 font-medium': activeTier !== tier,
                },
              )}
              onClick={() => setActiveTier(tier)}
              key={tier}
            >
              {tier}
            </button>
          ))}
        </div>
        <div className="mb-10 lg:mb-[128px]">
          <Swiper {...sliderOptions} className="mb-8 lg:mb-[72px]">
            {filteredSponsors.length &&
              filteredSponsors.map((sponsor, index) => (
                <SwiperSlide key={index}>
                  <div className="flex items-center justify-center w-[295px] aspect-[2.17] rounded-lg bg-white mx-auto mb-6 lg:w-[462px] lg:aspect-[1.7] lg:rounded-2xl lg:mb-12">
                    <BCMSImage
                      media={sponsor.cover}
                      className="w-auto h-6 cover lg:h-12"
                    />
                  </div>
                  <ContentManager
                    item={sponsor.description}
                    className="text-sm leading-[1.4] tracking-[-0.8px] font-medium text-center text-appGray-500 max-w-[1152px] mx-auto lg:text-[26px] lg:leading-[1.4]"
                  />
                </SwiperSlide>
              ))}
          </Swiper>
          <div className="homeSponsors--pagination swiper--customPagination" />
        </div>
        <button
          className="flex px-7 py-[13px] bg-black rounded-[72px] text-sm leading-none tracking-[-0.04em] font-semibold text-white mx-auto lg:px-16 lg:py-8 lg:text-[32px] lg:leading-none"
          onClick={() => setShowContactForm(true)}
        >
          Contact us
        </button>
      </div>
      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}
    </section>
  );
};

export default HomePageSponsors;
