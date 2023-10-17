import { HomeHeroGroup } from '@/bcms/types';
import React from 'react';

import Logo from '@/assets/media/logo-white.svg';
import { BCMSImage } from 'next-plugin-bcms/components';

interface HomepageHomeProps {
  data: HomeHeroGroup;
}

export const HomePageHome: React.FC<HomepageHomeProps> = ({ data }) => {
  return (
    <section className="relative overflow-hidden h-screen flex items-center">
      <div className="container">
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h1 className="sr-only">{data.title}</h1>
          <Logo
            className="w-[250px] text-white mb-8 md:w-[378px]"
            fontcontrolled="false"
          />
          <p className="text-xl leading-none text-white">{data.description}</p>
        </div>
      </div>
      <BCMSImage
        media={data.cover}
        options={{
          quality: 100,
          sizes: {
            exec: [
              {
                width: 1280,
              },
              {
                width: 1600,
              },
            ],
          },
        }}
        className="absolute inset-0 cover"
      />
    </section>
  );
};
