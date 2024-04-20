import { EpisodeEntryMeta, HomeHeroGroup } from '@/bcms/types';
import ContentManager from '@/components/ContentManager';
import React from 'react';
import EpisodesItem from '@/components/episodes/Item';
import { BCMSImage } from 'next-plugin-bcms/components';

interface HomepageHeroProps {
  data: HomeHeroGroup;
  episodes: EpisodeEntryMeta[];
}

const HomepageHero: React.FC<HomepageHeroProps> = ({ data, episodes }) => {
  return (
    <section className="relative pt-[104px] lg:pt-[324px]">
      <div className="container">
        <div className="relative z-10 max-w-[488px] mx-auto lg:max-w-[784px]">
          <ContentManager
            item={data.title}
            className="homeHero--title text-xl leading-none font-medium tracking-[-0.41px] text-white text-center
                    mb-1 lg:text-[56px] lg:leading-none lg:tracking-[-2.41px] lg:mb-4"
          />
          <ContentManager
            item={data.description}
            className="text-sm leading-[1.3] tracking-[-0.8px] text-appGray-300 text-center max-w-[220px] mx-auto
                    mb-8 lg:text-xl lg:leading-none lg:max-w-none lg:mb-[72px]"
          />
          <div className="grid grid-cols-1 rounded-2xl bg-[#383838]/20 overflow-hidden space-y-px">
            {episodes.map((episode, index) => (
              <EpisodesItem
                key={index}
                item={episode}
                index={index + 1}
                className="bg-appBody/80"
              />
            ))}
          </div>
        </div>
      </div>
      <BCMSImage
        media={data.cover}
        options={{
          sizes: {
            exec: [
              {
                width: 750,
                height: 710,
              },
              {
                width: 1024,
                height: 826,
              },
              {
                width: 1640,
                height: 826,
              },
            ],
          },
        }}
        className="absolute top-0 left-0 w-full h-full cover"
      />
      <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
      <div className="absolute z-10 bottom-0 left-0 w-full h-12 bg-gradient-to-b from-appBody/0 to-appBody pointer-events-none lg:h-[114px]" />
    </section>
  );
};

export default HomepageHero;
