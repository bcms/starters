import React from 'react';
import { AboutPageData, PageData } from '@/types';
import { PageWrapper } from '@/src/components/PageWrapper';
import { BCMSImage } from 'gatsby-source-bcms/components';
import { ContentManager } from '@/src/components/ContentManager';
import { graphql } from 'gatsby';

interface AboutPageProps {
  data: PageData<AboutPageData>;
}
const AboutPage: React.FC<AboutPageProps> = ({
  data: { header, page, footer },
}) => {
  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <div className="container relative z-10 pt-20 pb-10 lg:pt-[104px] lg:pb-[128px]">
        <div className="relative aspect-square rounded overflow-hidden mb-6 md:aspect-[2.47] lg:rounded-2xl lg:mb-10">
          <h1 className="absolute z-10 bottom-6 left-6 text-lg leading-none font-medium tracking-[-0.41px] lg:bottom-10 lg:left-10 lg:text-[56px] lg:leading-none lg:tracking-[-2.41px]">
            {page.bcms.meta.en.title}
          </h1>
          <BCMSImage
            media={page.bcms.meta.en.cover}
            options={{
              sizes: {
                exec: [
                  {
                    width: 654,
                    height: 654,
                  },
                  {
                    width: 768,
                    height: 291,
                  },
                  {
                    width: 1344,
                    height: 544,
                  },
                ],
              },
            }}
            className="absolute top-0 left-0 w-full h-full cover rounded overflow-hidden lg:rounded-2xl"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/50 lg:bg-black/60" />
        </div>
        <div className="grid grid-cols-1 gap-4">
          {page.bcms.meta.en.content.map((item, index) => (
            <div
              key={index}
              className="p-4 border border-appGray-600 rounded-2xl bg-appBody lg:p-8"
            >
              <ContentManager items={item} className="aboutPage--content" />
            </div>
          ))}
        </div>
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
export default AboutPage;
