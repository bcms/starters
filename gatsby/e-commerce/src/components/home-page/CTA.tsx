import { HomeCtaGroup } from '@/bcms/types';
import React from 'react';
import { Btn } from '@/src/components/Btn';
import { BCMSImage } from 'gatsby-source-bcms/components';

interface HomepageCtaProps {
  data: HomeCtaGroup;
}

export const HomepageCta: React.FC<HomepageCtaProps> = ({ data }) => {
  return (
    <section className="relative h-screen flex items-center py-20">
      <div className="container">
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center">
          <h2 className="text-[32px] leading-[1.2] tracking-[-0.1px] text-appGray-900 max-w-[890px] mx-auto mb-4 md:text-[48px]">
            {data.title}
          </h2>
          <p className="text-[20px] leading-[1.3] text-appGray-600 max-w-[710px] mx-auto mb-10">
            {data.description}
          </p>
          <Btn theme="light-green" to={data.cta_link} label={data.cta_label} />
        </div>
      </div>
      <BCMSImage
        media={data.cover}
        options={{
          sizes: {
            exec: [
              {
                width: 750,
                height: 800,
              },
              {
                width: 1024,
                height: 800,
              },
            ],
          },
        }}
        className="absolute inset-0 cover"
      />
    </section>
  );
};
