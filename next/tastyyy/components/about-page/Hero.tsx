import { AboutHeroGroup } from '@/bcms/types';
import React from 'react';
import ArchWithStar from '@/components/ArchWithStar';
import ContentManager from '@/components/ContentManager';
import { BCMSImage } from 'next-plugin-bcms/components';
import Btn from '@/components/Btn';
import AboutUsOutline from '@/assets/media/about-us-outline.svg';

interface AboutPageHeroProps {
  data: AboutHeroGroup;
}
const AboutPageHero: React.FC<AboutPageHeroProps> = ({ data }) => {
  return (
    <section className="pt-[108px] pb-10 overflow-hidden md:pb-14 lg:pt-[218px]">
      <div className="container max-w-[1198px]">
        <ArchWithStar />
        <div className="relative px-4 max-w-[400px] mx-auto lg:max-w-[962px] xl:px-0">
          <AboutUsOutline className="absolute w-[220px] right-[30px] lg:w-[822px] lg:-right-4 lg:-top-6" />
          <ContentManager
            item={data.title}
            className="aboutHero--title relative z-10 text-xl leading-none font-Gloock mb-2 lg:text-[56px]
                    lg:leading-none lg:mb-3"
          />
          <ContentManager
            item={data.subtitle}
            className="relative z-10 text-[10px] leading-[1.2] uppercase max-w-max ml-auto mb-10 lg:text-base
                    lg:leading-[1.2] lg:mb-[120px]"
          />
        </div>
        <BCMSImage
          media={data.cover}
          className="w-full cover aspect-[1.635] mb-4 lg:aspect-[2.67] lg:mb-10"
        />
        <ContentManager
          item={data.description}
          className="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-700 mb-6 lg:text-[32px]
                lg:leading-[1.3] lg:mb-14"
        />
        <Btn to="/menu" className="uppercase max-w-max mx-auto">
          <span>Browse menu</span>
        </Btn>
      </div>
    </section>
  );
};

export default AboutPageHero;
