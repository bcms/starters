import { HomeAmbienceGroup } from '@/bcms/types';
import React from 'react';
import {HomePageDivider} from '@/src/components/home-page/Divider';
import {ContentManager} from '@/src/components/ContentManager';
import { BCMSImage } from 'gatsby-source-bcms/components';
interface HomepageAmbienceProps {
  data: HomeAmbienceGroup;
}

export const HomePageAmbience: React.FC<HomepageAmbienceProps> = ({ data }) => {
  return (
    <section>
      <div className="container">
        <div className="flex flex-col items-center">
          <div className="text-xs leading-none mb-2.5 lg:text-base lg:leading-none lg:mb-[14px]">
            [ 3 ]
          </div>
          <h2 className="text-lg leading-none uppercase font-Gloock mb-4 lg:text-5xl lg:leading-none lg:mb-6">
            {data.title}
          </h2>
          <ContentManager
            items={data.description}
            className="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-700 uppercase max-w-[745px] mx-auto mb-8 lg:text-base lg:leading-[1.3] lg:mb-[88px]"
          />
        </div>
        <div className="grid grid-cols-2 gap-4 auto-rows-fr lg:gap-6">
          {data.items.map((item, index) => (
            <div
              key={index}
              className="homeAmbience--gridItem w-full h-full relative lg:min-h-[360px]"
            >
              <div className="flex absolute z-10 top-5 left-5 bg-appBody rounded-[32px] px-[14px] py-2.5 max-w-[calc(100%-28px)] lg:top-8 lg:left-8 lg:px-6 lg:py-4">
                <h3 className="text-xs leading-none uppercase truncate lg:text-base lg:leading-none">
                  {item.title}
                </h3>
              </div>
              <BCMSImage
                media={item.cover}
                className="absolute top-0 left-0 w-full h-full cover"
              />
              <div className="absolute top-0 left-0 w-full h-full bg-black/30" />
            </div>
          ))}
        </div>
      </div>
      <HomePageDivider />
    </section>
  );
};

