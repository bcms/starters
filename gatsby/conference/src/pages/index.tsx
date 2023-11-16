import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';

import {
  FooterEntryMeta,
  HeaderEntryMeta,
  HomePageEntryMeta,
  LegalEntry,
} from '../../bcms/types';

import HomePageHero from '@/components/home-page/Hero';
import HomepageAbout from '@/components/home-page/About';
import HomePageSpeakers from '@/components/home-page/Speakers';
import HomePageSponsors from '@/components/home-page/Sponsors';
import HomePageTickets from '@/components/home-page/Tickets';
import HomePageAgenda from '@/components/home-page/Agenda';
import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import { graphql } from 'gatsby';

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
          en: HomePageEntryMeta;
        };
        content: {
          en: BCMSPropRichTextDataParsed;
        };
      };
    };

    legal: {
      nodes: Array<{
        bcms: LegalEntry;
      }>;
    };
  };
}> = ({ data }) => {
  return (
    <PageWrapper
      header={data.header}
      footer={data.footer}
      legal={data.legal}
      page={data.page}
      location="/"
    >
      {
        <>
          <HomePageHero data={data.page.bcms.meta.en.hero} />
          <HomepageAbout data={data.page.bcms.meta.en.about} />
          <HomePageSpeakers data={data.page.bcms.meta.en.speakers} />
          <HomePageSponsors data={data.page.bcms.meta.en.sponsors} />
          <HomePageTickets data={data.page.bcms.meta.en.tickets} />
          <HomePageAgenda data={data.page.bcms.meta.en.agenda} />
        </>
      }
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
    page: bcmsHomePage {
      ...HomePage
    }
    legal: allBcmsLegal {
      nodes {
        ...AllLegal
      }
    }
  }
`;

export default HomePage;
