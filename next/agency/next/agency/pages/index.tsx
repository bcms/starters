import React from 'react';
import { GetStaticProps } from 'next';
import { HomePageData, PageProps } from '@/types';
import { PageWrapper } from '@/components/PageWrapper';
import { getHeaderAndFooter } from '@/utils/page-data';
import { getBcmsClient } from 'next-plugin-bcms';

import { HomePageEntry, HomePageEntryMeta } from '@/bcms/types';

import HomePageHero from '@/components/home-page/Hero';
import HomePageAbout from '@/components/home-page/About';
import HomePageServices from '@/components/home-page/Services';
import HomePageTeam from '@/components/home-page/Team';
import HomePageCapabilities from '@/components/home-page/Capabilities';
import ContactBlock from '@/components/ContactBlock';


const HomePage: React.FC<PageProps<HomePageData>> = ({ page, header, footer }) => {
  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <HomePageHero data={page.meta.hero} />
      <HomePageAbout data={page.meta.about} />
      <HomePageServices data={page.meta.services} />
      <HomePageCapabilities data={page.meta.capabilities} />
      <HomePageTeam data={page.meta.team} />
      <ContactBlock data={page.meta.contact_block} />
    </PageWrapper>
  );
};


export const getStaticProps: GetStaticProps<
  PageProps<HomePageData>
> = async () => {
  const client = getBcmsClient();
  const { header, footer } = await getHeaderAndFooter(client);

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
      page: {
        meta: homePage.meta.en as HomePageEntryMeta,
      },
    },
  };
}; 

export default HomePage;
