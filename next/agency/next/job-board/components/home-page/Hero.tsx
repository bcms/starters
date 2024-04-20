import React, { FC } from 'react';
import { HomeHeroGroup } from '@/bcms/types';
import { BCMSImage } from 'next-plugin-bcms/components';
import ContentManager from '@/components/ContentManager';
import Btn from '@/components/Btn';

interface HomeHeroProps {
  data: HomeHeroGroup;
}

const HomeHero: FC<HomeHeroProps> = ({ data }) => {
  const scrollToJobs = () => {
    const jobs = document.getElementById('homeJobs');

    if (jobs) {
      jobs.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="pt-10 lg:pt-[104px]">
      <div className="container">
        <div className="max-w-[250px] mx-auto md:max-w-[350px] lg:max-w-[840px]">
          <h1 className="homeHero--title mb-4 lg:mb-8">
            {data.title.map((item, index) => (
              <React.Fragment key={index}>
                {item.text && item.text.length > 0 && (
                  <ContentManager
                    item={item.text}
                    className="text-2xl leading-[1.4] font-medium font-PlayfairDisplay tracking-[-0.41px] md:text-4xl lg:text-[80px] lg:leading-[1.1]"
                  />
                )}
                {item.image && (
                  <BCMSImage
                    key={index}
                    media={item.image}
                    options={{
                      sizes: {
                        exec: [
                          {
                            width: 176,
                            height: 80,
                          },
                          {
                            width: 352,
                            height: 160,
                          },
                        ],
                      },
                    }}
                    className="image cover w-[53px] h-6 flex-shrink-0 translate-y-1 mx-1 bg-center bg-cover lg:w-[176px] lg:h-20 lg:mx-3 lg:translate-y-3"
                  />
                )}
              </React.Fragment>
            ))}
          </h1>
          <ContentManager
            item={data.description}
            className="text-sm leading-[1.4] font-medium tracking-[-0.41px] text-center text-appGray-600 mb-8 md:text-base lg:leading-none lg:mb-10"
          />
          <Btn className="mx-auto mb-12 lg:mb-[120px]" onClick={scrollToJobs}>
            <span>Search Jobs Now</span>
          </Btn>
        </div>
      </div>
      <div className="relative">
        <BCMSImage
          media={data.cover}
          options={{
            sizes: {
              exec: [
                {
                  width: 640,
                  height: 232,
                },
                {
                  width: 1280,
                  height: 464,
                },
                {
                  width: 1920,
                  height: 696,
                },
              ],
            },
          }}
          className="w-full aspect-[2.76] cover lg:aspect-[3.1]"
        />
        <div className="absolute top-0 left-0 w-full h-full bg-black/60" />
      </div>
    </section>
  );
};

export default HomeHero;
