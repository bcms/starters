import React, { FC } from 'react';
import { GetStaticProps } from 'next';
import { HomePageData, PageProps } from '@/types';
import { PageWrapper } from '@/components/PageWrapper';
import { getHeaderAndFooter } from '@/utils/page-data';
import { getBcmsClient } from 'next-plugin-bcms';
import {
  HomePageEntry,
  HomePageEntryMeta,
  JobEntry,
  TestimonialEntry,
  TestimonialEntryMeta,
} from '@/bcms/types';
import { toJobLite } from '@/utils/job';
import HomeHero from '@/components/home-page/Hero';
import HomePageJobs from '@/components/home-page/Jobs';
import HomePageAbout from '@/components/home-page/About';
import HomePageTestimonials from '@/components/home-page/Testimonials';

const HomePage: FC<PageProps<HomePageData>> = ({ header, footer, page }) => {
  return (
    <PageWrapper header={header} footer={footer} page={page}>
      {
        <>
          <HomeHero data={page.meta.hero} />
          <HomePageJobs data={page.meta.jobs} jobs={page.jobs} />
          <HomePageAbout data={page.meta.about} />
          <HomePageTestimonials data={page.testimonials} />
          {/*<HomePageBlogsList blogs={props.page.blogs} />*/}
        </>
      }
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
  // Get all Blog entries
  const jobs = (await client.entry.getAll({
    template: 'job',
  })) as JobEntry[];

  const testimonials = (await client.entry.getAll({
    template: 'testimonial',
  })) as TestimonialEntry[];

  return {
    props: {
      header,
      footer,
      page: {
        jobs: jobs.map((job) => toJobLite(job)),
        meta: homePage.meta.en as HomePageEntryMeta,
        testimonials: testimonials.map(
          (testimonial) => testimonial.meta.en as TestimonialEntryMeta,
        ),
      },
    },
  };
};

export default HomePage;
