import {
  FooterEntryMeta,
  HeaderEntryMeta,
  LegalPageEntry,
  LegalPageEntryMeta,
} from '../../bcms/types';
import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import ContentManager from '@/components/ContentManager';
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
      <div className="pt-6 pb-14 md:pt-10 md:pb-20 lg:pt-16 lg:pb-[120px]">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 max-w-[850px] mx-auto lg:gap-6">
            <h1 className="sr-only">Legal page content</h1>
            {data.allLegal.nodes.map((item, index) => (
              <div
                key={index}
                className="border border-[#DBD9D5] rounded-[7px] p-6"
              >
                <h2 className="text-sm leading-none font-medium tracking-[-0.41px] font-PlayfairDisplay mb-3 lg:text-[32px] lg:leading-none lg:mb-5">
                  {item.bcms.meta.en?.title}
                </h2>
                <ContentManager
                  item={item.bcms.content.en as BCMSPropRichTextDataParsed}
                  className="text-xs leading-normal font-medium tracking-[-0.41px] text-appGray-600 lg:text-lg lg:leading-normal"
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
