import React, { FC } from 'react';
import { ContentManager, PageWrapper, TopGradient } from '../components';
import { graphql } from 'gatsby';
import { AboutPageData, PageData } from '../../types';
import { BCMSImage } from 'gatsby-source-bcms/components';

const AboutMe: FC<{
  data: PageData<AboutPageData>;
}> = ({ data }) => {
  return (
    <PageWrapper {...data} location="/about">
      <div className="relative pt-10 pb-8 md:py-[72px] lg:pb-[104px]">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-8 md:mb-20 lg:mb-[134px]">
            <div className="text-sm leading-none tracking-[-0.41px] text-appGray-600 mb-2.5 md:text-base md:leading-none lg:text-xl lg:leading-none lg:mb-5">
              {data.page.bcms.meta.en.subtitle}
            </div>
            <h1 className="leading-none font-medium tracking-[-0.41px] mb-3 md:text-2xl md:leading-none md:mb-4 lg:text-[56px] lg:leading-none lg:mb-6">
              {data.page.bcms.meta.en.title}
            </h1>
            <ContentManager
              items={data.page.bcms.meta.en.description}
              className="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-500 font-medium max-w-[633px] mx-auto md:text-lg md:leading-none lg:text-[22px] lg:leading-[1.3]"
            />
          </div>
          <div className="relative aspect-[2.07] rounded-lg overflow-hidden mb-6 lg:aspect-[2.43] lg:rounded-2xl lg:mb-8">
            <BCMSImage
              media={data.page.bcms.meta.en.cover}
              options={{
                sizes: {
                  exec: [
                    {
                      width: 660,
                      height: 320,
                    },
                    {
                      width: 960,
                      height: 400,
                    },
                    {
                      width: 1344,
                      height: 554,
                    },
                  ],
                },
              }}
              className="w-full h-full cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
          </div>
          <ContentManager items={data.page.bcms.content.en} className="prose" />
        </div>
        <TopGradient />
      </div>
    </PageWrapper>
  );
};

export const query = graphql`
  {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }
    page: bcmsAboutPage {
      ...AboutPage
    }
  }
`;

export default AboutMe;
