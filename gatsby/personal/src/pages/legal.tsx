import React from 'react';
import {
  FooterEntryMeta,
  HeaderEntryMeta,
  LegalPageEntry,
  LegalPageEntryMeta,
} from '../../bcms/types';
import { PageWrapper } from '@/components/PageWrapper';
import AnimatedTitle from '@/components/AnimatedTitle';
import ContentManager from '@/components/ContentManager';
import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import { graphql } from 'gatsby';

const LegalPage: React.FC<{
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
          en: LegalPageEntryMeta;
        };
        content: {
          en: BCMSPropRichTextDataParsed;
        };
      };
    };
    allLegal: {
      nodes: Array<{
        bcms: LegalPageEntry;
      }>;
    };
  };
}> = ({ data }) => {
  return (
    <PageWrapper
      header={data.header}
      footer={data.footer}
      page={data.page}
      location="/legal"
    >
      <div className="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
        <div className="container">
          <AnimatedTitle
            title="Legal Page"
            className="mb-10 md:mb-20 lg:mb-[192px]"
            titleClassName="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
          />
          <div className="grid grid-cols-1 gap-8 lg:gap-14">
            {data.allLegal.nodes &&
              data.allLegal.nodes.map((item, index) => (
                <div
                  key={index}
                  className="lg:grid lg:grid-cols-[300px,1fr] lg:items-start lg:gap-[100px]"
                >
                  <h2 className="text-lg leading-none tracking-[-0.41px] font-Helvetica mb-[14px] lg:text-[32px]">
                    {item.bcms.meta.en?.title}
                  </h2>
                  <ContentManager
                    item={item.bcms.content.en || []}
                    className="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 lg:text-2xl lg:leading-[1.35] lg:text-appGray-500"
                  />
                </div>
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
    page: bcmsLegalPage {
      ...LegalPage
    }
    allLegal: allBcmsLegalPage {
      nodes {
        ...AllLegalPage
      }
    }
  }
`;

export default LegalPage;
