import React from 'react';
import { GetStaticProps } from 'next';

import { PageWrapper } from '@/components/PageWrapper';
import { HomePageData, PageProps } from '@/types';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-props';
import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import {
  AboutEducationGroup,
  AboutPageEntry,
  AboutWorkHistoryGroup,
  HomePageEntry,
  HomePageEntryMeta,
  PortfolioItemEntry,
  PortfolioItemEntryMeta,
  PortfolioPageEntry,
  ServiceItemEntry,
  ServiceItemEntryMeta,
  ServicesPageEntry,
  TestimonialItemEntry,
  TestimonialItemEntryMeta,
  TestimonialsPageEntry,
} from '@/bcms/types';

import HomePageHero from '@/components/home-page/Hero';
import HomePageServices from '@/components/home-page/Services';
import HomePageAbout from '@/components/home-page/About';
import HomePagePortfolio from '@/components/home-page/Portfolio';
import HomePageTestimonials from '@/components/home-page/Testimonials';
const Home: React.FC<PageProps<HomePageData>> = ({ header, footer, page }) => {
  return (
    <PageWrapper header={header} footer={footer} page={page}>
      <HomePageHero data={page.meta.hero} />
      <HomePageServices data={page.services} />
      <HomePageAbout data={page.about} />
      <HomePagePortfolio data={page.portfolio} />
      <HomePageTestimonials data={page.testimonials} />
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<HomePageData>
> = async () => {
  try {
    const client = getBcmsClient();

    const { header, footer } = await getHeaderAndFooter(client);

    const homePage = (await client.entry.get({
      // Template name or ID
      template: 'home_page',
      // Entry slug or ID
      entry: 'home',
    })) as HomePageEntry;
    if (!homePage) {
      throw new Error('Home page entry does not exist.');
    }
    const servicesPage = (await client.entry.get({
      // Template name or ID
      template: 'services_page',
      // Entry slug or ID
      entry: 'services',
    })) as ServicesPageEntry;
    if (!servicesPage) {
      throw new Error('Services page entry does not exist.');
    }
    const serviceItems = (await client.entry.getAll({
      // Template name or ID
      template: 'service_item',
    })) as ServiceItemEntry[];
    const aboutPage = (await client.entry.get({
      // Template name or ID
      template: 'about_page',
      // Entry slug or ID
      entry: 'abooout',
    })) as AboutPageEntry;
    if (!aboutPage) {
      throw new Error('About page entry does not exist.');
    }
    const portfolioPage = (await client.entry.get({
      // Template name or ID
      template: 'portfolio_page',
      // Entry slug or ID
      entry: 'portfolio',
    })) as PortfolioPageEntry;
    if (!portfolioPage) {
      throw new Error('Portfolio page entry does not exist.');
    }
    const portfolioItems = (await client.entry.getAll({
      // Template name or ID
      template: 'portfolio_item',
    })) as PortfolioItemEntry[];
    const testimonialsPage = (await client.entry.get({
      // Template name or ID
      template: 'testimonials_page',
      // Entry slug or ID
      entry: 'testimonials',
    })) as TestimonialsPageEntry;
    if (!testimonialsPage) {
      throw new Error('Testimonials page entry does not exist.');
    }
    const testimonialItems = (await client.entry.getAll({
      // Template name or ID
      template: 'testimonial_item',
    })) as TestimonialItemEntry[];

    return {
      props: {
        header,
        footer,
        page: {
          meta: homePage.meta.en as HomePageEntryMeta,
          services: {
            title: servicesPage.meta.en?.title as string,
            description: servicesPage.meta.en
              ?.description as BCMSPropRichTextDataParsed,
            items: serviceItems.map(
              (item) => item.meta.en as ServiceItemEntryMeta,
            ),
          },
          about: {
            title: aboutPage.meta.en?.title as string,
            description: aboutPage.meta.en
              ?.description as BCMSPropRichTextDataParsed,
            education: aboutPage.meta.en?.education as AboutEducationGroup,
            workHistory: aboutPage.meta.en
              ?.work_history as AboutWorkHistoryGroup,
          },
          portfolio: {
            title: portfolioPage.meta.en?.title as string,
            description: portfolioPage.meta.en
              ?.description as BCMSPropRichTextDataParsed,
            items: portfolioItems.map(
              (e) => e.meta.en as PortfolioItemEntryMeta,
            ),
          },
          testimonials: {
            title: testimonialsPage.meta.en?.title as string,
            description: testimonialsPage.meta.en
              ?.description as BCMSPropRichTextDataParsed,
            items: testimonialItems.map(
              (e) => e.meta.en as TestimonialItemEntryMeta,
            ),
          },
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

export default Home;
