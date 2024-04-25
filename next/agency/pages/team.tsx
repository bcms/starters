import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { PageProps, TeamPageData } from '@/types';
import { TeamPageEntry, TeamPageEntryMeta } from '@/bcms/types';
import { GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';
import Hero from '@/components/Hero';
import TeamList from '@/components/team/List';
import ContactBlock from '@/components/ContactBlock';

const TeamMembersPage: React.FC<PageProps<TeamPageData>> = ({
  page,
  header,
  footer,
}) => {
  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <Hero
        title={page.meta.title}
        subtitle="Team"
        description={page.meta.description}
      />
      <TeamList items={page.meta.team_members} />
      <ContactBlock data={page.meta.contact_block} />
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<TeamPageData>
> = async () => {
  try {
    const client = getBcmsClient();

    const { header, footer } = await getHeaderAndFooter(client);

    const teamPage = (await client.entry.get({
      // Template name or ID
      template: 'team_page',
      // Entry slug or ID
      entry: 'team',
    })) as TeamPageEntry;
    if (!teamPage) {
      throw new Error('Team page entry does not exist.');
    }
    return {
      props: {
        header,
        footer,
        page: {
          meta: teamPage.meta.en as TeamPageEntryMeta,
        },
      },
    };
  } catch (error) {
    return {
      props: {},
      notFound: true,
    };
  }
};

export default TeamMembersPage;
