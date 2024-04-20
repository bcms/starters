import { HomeSeasonsGroup } from '@/bcms/types';
import React from 'react';
import Link from 'next/link';
import { BCMSImage } from 'next-plugin-bcms/components';
import ContentManager from '@/components/ContentManager';
import HomePageDivider from '@/components/home-page/Divider';
interface HomepageSeasonsProps {
  data: HomeSeasonsGroup;
}

const HomepageSeasons: React.FC<HomepageSeasonsProps> = ({ data }) => {
  return (
    <section>
      <div className="container">
        <div className="flex flex-col items-center mb-8 lg:mb-[88px]">
          <div className="text-xs leading-none mb-2.5 lg:text-base lg:leading-none lg:mb-[14px]">
            [ 2 ]
          </div>
          <h2 className="text-lg leading-none uppercase font-Gloock mb-4 lg:text-5xl lg:leading-none lg:mb-6">
            {data.title}
          </h2>
          <ContentManager
            item={data.description}
            className="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-700 uppercase max-w-[745px] mx-auto lg:text-base lg:leading-[1.3]"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2">
        {data.seasons.map((meal, index) => (
          <Link
            key={index}
            href={`/seasonal-menu?s=${meal.meta.en?.title.toLowerCase()}`}
          >
            <a className="flex relative">
              {meal.meta.en && (
                <div className="container">
                  <div className="relative z-10 flex flex-col items-center justify-center text-center py-12 min-h-[200px] lg:aspect-[1.73]">
                    <h3 className="text-xl leading-none font-Gloock text-white uppercase lg:text-[32px] lg:leading-none">
                      {meal.meta.en.title}
                    </h3>
                  </div>
                  <BCMSImage
                    media={meal.meta.en?.cover}
                    options={{
                      sizes: {
                        exec: [
                          {
                            width: 750,
                            height: 400,
                          },
                          {
                            width: 1500,
                            height: 800,
                          },
                        ],
                      },
                    }}
                    className="absolute top-0 left-0 w-full h-full cover"
                  />
                  <div className="absolute top-0 left-0 w-full h-full bg-black/40" />
                </div>
              )}
            </a>
          </Link>
        ))}
      </div>
      <HomePageDivider />
    </section>
  );
};

export default HomepageSeasons;
