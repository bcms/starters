import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import AnimatedTitle from '@/components/AnimatedTitle';
import { BCMSImage } from 'gatsby-source-bcms/components';
import { Link, graphql } from 'gatsby';
import ContentManager from '@/components/ContentManager';
import {
  FooterEntryMeta,
  HeaderEntryMeta,
  PortfolioItemEntry,
  PortfolioPageEntryMeta,
} from '../../bcms/types';
import {
  BCMSPropMediaDataParsed,
  BCMSPropRichTextDataParsed,
} from '@becomes/cms-client/types';

const PortfolioPage: React.FC<{
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
          en: PortfolioPageEntryMeta;
        };
        content: {
          en: BCMSPropRichTextDataParsed;
        };
      };
    };
    portfolioItem: {
      nodes: Array<{
        bcms: PortfolioItemEntry;
      }>;
    };
  };
}> = ({ data }) => {
  return (
    <PageWrapper
      header={data.header}
      footer={data.footer}
      page={data.page}
      location="/portfolio"
    >
      <div className="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
        <div className="container">
          <AnimatedTitle
            title={data.page.bcms.meta.en.title}
            className="mb-10 md:mb-20 lg:mb-[192px]"
            titleClassName="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
          />
          <div className="grid grid-cols-1 gap-[33px] lg:gap-20">
            {data.portfolioItem.nodes.map((item, index) => (
              <Link
                v-for="(item, index) in data.page.items"
                key={index}
                to={`/portfolio/${item.bcms.meta.en?.slug}`}
              >
                <a>
                  <BCMSImage
                    media={
                      item.bcms.meta.en?.gallery[0] as BCMSPropMediaDataParsed
                    }
                    options={{
                      sizes: {
                        exec: [
                          {
                            width: 1264,
                            height: 611,
                          },
                        ],
                      },
                    }}
                    className="w-full aspect-[2.07] cover rounded-[6px] overflow-hidden mb-4 lg:rounded-3xl lg:mb-12"
                  />
                  <div className="lg:flex lg:items-start lg:justify-between">
                    <h3 className="flex text-sm leading-none tracking-[-0.41px] font-Helvetica mb-3 md:text-2xl md:leading-none lg:text-[32px]">
                      {item.bcms.meta.en?.brand_name}
                      <span className="text-[10px] ml-1.5 md:text-sm lg:text-xl">
                        &#169;
                      </span>
                    </h3>
                    <ContentManager
                      item={
                        item.bcms.meta.en
                          ?.description as BCMSPropRichTextDataParsed
                      }
                      className="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 lg:text-[15px] lg:max-w-[551px]"
                    />
                  </div>
                </a>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export const query = graphql`
  query {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }
    page: bcmsPortfolioPage {
      ...Portfolio
    }
    portfolioItem: allBcmsPortfolioItem {
      nodes {
        ...PortfolioItem
      }
    }
  }
`;

export default PortfolioPage;
