import React from 'react';
import ContentManager from '@/components/ContentManager';
import BCMSImage from 'gatsby-source-bcms/components/image';
import { HomeHeroGroup } from '../../../bcms/types';
import ContactUs from '../ContactUs';

interface HeroProps {
  data: HomeHeroGroup;
}

const Hero: React.FC<HeroProps> = ({ data }) => {
  return (
    <section className="relative z-10 pt-2 pb-6 md:pt-5 md:mb-10 lg:mb-10">
      <div className="container">
        <div className="relative max-md:mb-6">
          <ContentManager
            item={data.title}
            className="content relative z-20 w-[68%] text-[26px] font-medium leading-[1.1] tracking-[0.26px] max-w-[787px] [&_i]:font-PlayfairDisplay [&_strong]:text-appText-light [&_strong]:relative [&_strong]:after:absolute [&_strong]:after:z-[-1] [&_strong]:after:top-[calc(50%-3px)] [&_strong]:after:-translate-y-1/2 [&_strong]:after:left-0 [&_strong]:after:w-full [&_strong]:after:h-[calc(100%+4px)] [&_strong:first-of-type]:after:bg-appAccent-300 [&_strong:last-of-type]:after:bg-appAccent2 sm:text-4xl md:w-1/2 md:text-5xl lg:text-6xl md:[&_strong]:after:top-[calc(50%-5px)] lg:leading-[1.05] lg:tracking-[-1.76px] lg:[&_i]:tracking-[0.88px] lg:[&_strong]:after:top-[calc(50%-7px)] xl:w-[68%] xl:text-[88px] xl:[&_strong]:after:top-[calc(50%-8px)]"
          />
          <div className="absolute top-0 right-0 w-[49%] h-full min-h-[200px] max-sm:-right-2">
            <BCMSImage
              media={data.gallery}
              options={{
                sizes: {
                  exec: [
                    {
                      width: 850,
                      height: 1033,
                    },
                    {
                      width: 1300,
                      height: 1580,
                    },
                  ],
                },
              }}
              className="w-full full"
            />
          </div>
        </div>
        <ContactUs className="max-w-max md:hidden" />
      </div>
    </section>
  );
};

export default Hero;
