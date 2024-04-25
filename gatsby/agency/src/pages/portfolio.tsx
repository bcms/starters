import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';

import {
  PortfolioEntry,
  PortfolioPageEntryMeta,
  FooterEntryMeta,
  HeaderEntryMeta,
} from '../../bcms/types';

import ContactBlock from '@/components/ContactBlock';
import { graphql } from 'gatsby';
import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import Hero from '@/components/Hero';
import Portfolios from '@/components/portfolio/List';

const HomePage: React.FC<{
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
    portfolio: {
      nodes: Array<{
        bcms: PortfolioEntry;
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
      <Hero
        title={data.page.bcms.meta.en.title}
        subtitle="Portfolio"
        description={data.page.bcms.meta.en.description}
      />
      <Portfolios items={data.portfolio.nodes} />
      <ContactBlock data={data.page.bcms.meta.en.contact_block} />
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
      ...PortfolioPage
    }
    portfolio: allBcmsPortfolio {
      nodes {
        ...AllPortfolio
      }
    }
  }
`;

export default HomePage;
