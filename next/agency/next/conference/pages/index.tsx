import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import { HomePageData, PageProps } from '@/types';
import { PageWrapper } from '@/components/PageWrapper';
import { getHeaderAndFooter } from '@/utils/page-data';
import { getBcmsClient } from 'next-plugin-bcms';

import { HomePageEntry, HomePageEntryMeta } from '@/bcms/types';

import HomePageHero from '@/components/home-page/Hero';
import HomepageAbout from '@/components/home-page/About';
import HomePageSpeakers from '@/components/home-page/Speakers';
import HomePageSponsors from '@/components/home-page/Sponsors';
import HomePageTickets from '@/components/home-page/Tickets';
import HomePageAgenda from '@/components/home-page/Agenda';

const HomePage: FC<PageProps<HomePageData>> = ({
  header,
  footer,
  page,
  legal,
}) => {
  return (
    <PageWrapper legal={legal} header={header} footer={footer} page={page}>
      {
        <>
          <HomePageHero data={page.meta.hero} />
          <HomepageAbout data={page.meta.about} />
          <HomePageSpeakers data={page.meta.speakers} />
          <HomePageSponsors data={page.meta.sponsors} />
          <HomePageTickets data={page.meta.tickets} />
          <HomePageAgenda data={page.meta.agenda} />
        </>
      }
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<HomePageData>
> = async () => {
  const client = getBcmsClient();
  const { header, footer, legal } = await getHeaderAndFooter(client);

  // Get Home Page entry
  const homePage = (await client.entry.get({
    template: 'home_page',
    entry: 'home',
  })) as HomePageEntry;

  if (!homePage) {
    throw new Error('Home page entry does not exist.');
  }

  return {
    props: {
      header,
      footer,
      legal,
      page: {
        meta: homePage.meta.en as HomePageEntryMeta,
      },
    },
  };
};

export default HomePage;
