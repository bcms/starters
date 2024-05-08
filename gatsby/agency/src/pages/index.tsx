import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';

import {
  HomePageEntryMeta,
  FooterEntryMeta,
  HeaderEntryMeta,
} from '../../bcms/types';

import HomePageHero from '@/components/home-page/Hero';
import HomePageAbout from '@/components/home-page/About';
import HomePageServices from '@/components/home-page/Services';
import HomePageTeam from '@/components/home-page/Team';
import HomePageCapabilities from '@/components/home-page/Capabilities';
import ContactBlock from '@/components/ContactBlock';
import { graphql } from 'gatsby';
import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import { HomePageCapabilitiesType, HomePageTeamType } from '../../types';

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
          en: Omit<HomePageEntryMeta, 'capabilities' | 'team'> & {
            capabilities: HomePageCapabilitiesType;
            team: HomePageTeamType;
          };
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
      location="/"
    >
      {
        <>
          <HomePageHero data={data.page.bcms.meta.en.hero} />
          <HomePageAbout data={data.page.bcms.meta.en.about} />
          <HomePageServices data={data.page.bcms.meta.en.services} />
          <HomePageCapabilities data={data.page.bcms.meta.en.capabilities} />
          <HomePageTeam data={data.page.bcms.meta.en.team} />
          <ContactBlock data={data.page.bcms.meta.en.contact_block} />
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
  }
`;

export default HomePage;
