import React from 'react';
import { graphql } from 'gatsby';
import {
  HeaderEntryMeta,
  FooterEntryMeta,
  PortfolioItemEntryMeta,
} from '../../bcms/types';
import { PageWrapper } from '@/components/PageWrapper';
import ContentManager from '@/components/ContentManager';
import { BCMSImage } from 'gatsby-source-bcms/components';
import {
  BCMSPropMediaDataParsed,
  BCMSPropRichTextDataParsed,
} from '@becomes/cms-client/types';

const PortfolioItemPage: React.FC<{
  data: {
    header: {
      bcms: {
        meta: {
          en: HeaderEntryMeta;
        };
      };
    };
    footer: {
      bcms: {
        meta: {
          en: FooterEntryMeta;
        };
      };
    };
    page: {
      bcms: {
        meta: {
          en: PortfolioItemEntryMeta;
        };
        content: {
          en: BCMSPropRichTextDataParsed;
        };
      };
    };
  };
}> = ({ data }) => {
  return (
    <PageWrapper
      header={data.header}
      footer={data.footer}
      page={data.page}
      location={`/portfolio/${data.page.bcms.meta.en.slug}`}
    >
      <div className="pt-6 pb-10 overflow-hidden md:pb-20 lg:pt-8 lg:pb-[120px]">
        <div className="relative mb-4 lg:mb-6">
          <div className="py-6">
            <div className="container">
              <div className="relative z-10 aspect-[1.23] md:aspect-[1.95]">
                <h1 className="text-xl leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[72px] lg:leading-none">
                  {data.page.bcms.meta.en.title}
                </h1>
                <div className="flex items-end justify-between gap-5 h-full">
                  <div className="flex flex-col">
                    <div className="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3">
                      Project
                    </div>
                    <div className="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none">
                      {data.page.bcms.meta.en.project_no.padStart(2, '0')}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3">
                      Brand name
                    </div>
                    <div className="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none">
                      {data.page.bcms.meta.en.brand_name}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3">
                      Role
                    </div>
                    <div className="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none">
                      {data.page.bcms.meta.en.role}
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="leading-none tracking-[-0.41px] font-Helvetica text-appGray-200 mb-1.5 lg:text-2xl lg:leading-none lg:mb-3">
                      Year
                    </div>
                    <div className="text-sm leading-none tracking-[-0.41px] font-Helvetica text-white lg:text-[26px] lg:leading-none">
                      {new Date(data.page.bcms.meta.en.year).getFullYear()}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <BCMSImage
            media={data.page.bcms.meta.en.gallery[0]}
            options={{
              sizes: {
                exec: [
                  {
                    width: 1440,
                    height: 740,
                  },
                ],
              },
            }}
            className="absolute top-0 left-0 w-full h-full cover"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-appText/80" />
        </div>
        <div className="container">
          <ContentManager
            item={data.page.bcms.meta.en.description}
            className="text-sm leading-[1.2] tracking-[-0.41px] max-w-[1138px] mb-8 lg:text-[40px] lg:leading-[1.2] lg:mb-[72px]"
          />
          <div className="grid grid-cols-3 gap-3 mb-4 lg:gap-8 lg:mb-6">
            {data.page.bcms.meta.en.gallery
              .slice(1)
              .map(
                (
                  image: BCMSPropMediaDataParsed,
                  index: React.Key | null | undefined,
                ) => (
                  <BCMSImage
                    key={index}
                    media={image}
                    className="portfolioItemPage--galleryImage w-full cover h-full"
                  />
                ),
              )}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export const query = graphql`
  query ($id: String!) {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }
    page: bcmsPortfolioItem(bcms: { _id: { eq: $id } }) {
      ...PortfolioItem
    }
  }
`;

export default PortfolioItemPage;
