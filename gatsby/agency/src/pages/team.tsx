import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';

import {
  TeamMemberEntry,
  TeamPageEntryMeta,
  FooterEntryMeta,
  HeaderEntryMeta,
} from '../../bcms/types';

import ContactBlock from '@/components/ContactBlock';
import { graphql } from 'gatsby';
import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import Hero from '@/components/Hero';
import Team from '@/components/team/List';

const TeamPage: React.FC<{
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
          en: TeamPageEntryMeta;
        };
        content: {
          en: BCMSPropRichTextDataParsed;
        };
      };
    };
    team: {
      nodes: Array<{
        bcms: TeamMemberEntry;
      }>;
    };
  };
}> = ({ data }) => {
  return (
    <PageWrapper
      header={data.header}
      footer={data.footer}
      page={data.page}
      location="/team"
    >
      {
        <>
          <Hero
            title={data.page.bcms.meta.en.title}
            subtitle="Team"
            description={data.page.bcms.meta.en.description}
          />
          <Team items={data.team.nodes} />
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
    page: bcmsTeamPage {
      ...TeamPage
    }
    team: allBcmsTeamMember {
      nodes {
        ...AllTeam
      }
    }
  }
`;

export default TeamPage;
