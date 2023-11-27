import React, { FC } from 'react';
import { HomePageData, PageData } from '../../types';
import { PageWrapper } from '@/components/PageWrapper';
import { getHeaderAndFooter } from '@/utils/page-data';
import {
  FooterEntryMeta,
  HeaderEntryMeta,
  HomePageEntry,
  HomePageEntryMeta,
  JobEntry,
  TestimonialEntry,
  TestimonialEntryMeta,
} from '../../bcms/types';
import { toJobLite } from '@/utils/job';
import HomeHero from '@/components/home-page/Hero';
import HomePageJobs from '@/components/home-page/Jobs';
import HomePageAbout from '@/components/home-page/About';
import HomePageTestimonials from '@/components/home-page/Testimonials';
import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import { PageProps, graphql } from 'gatsby';

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
    jobs: {
      nodes: Array<{
        bcms: JobEntry;
      }>;
    };
    testimonials: {
      nodes: Array<{
        bcms: TestimonialEntry;
      }>;
    };
  };
  
}> = ({ data }) => {
  console.log(data.page.bcms.meta.en)
  return (
    <PageWrapper
    header={data.header}
    footer={data.footer}
    page={data.page}
    location="/"
  >
      {
        <>
          <HomeHero data={data.page.bcms.meta.en.hero} />
          <HomePageJobs data={data.page.bcms.meta.en.jobs} jobs={data.jobs} />
          <HomePageAbout data={data.page.bcms.meta.en.about} />
          <HomePageTestimonials data={data.testimonials} /> 
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
    jobs: allBcmsJob {
      nodes {
       ...Job
      }
    }
    testimonials: allBcmsTestimonial {
      nodes {
        ...Testimonials
      }
    }
  }
`

export default HomePage;
