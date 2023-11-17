import React from 'react';
import { graphql } from 'gatsby';
import { PageWrapper } from '@/components/PageWrapper';
import {
  HomeAbout,
  HomePortfolio,
  HomeServices,
  HomeTestimonials,
} from '../../types';
import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import {
  HomePageEntryMeta,
  PortfolioItemEntry,
  PortfolioItemEntryMeta,
  ServiceItemEntry,
  ServiceItemEntryMeta,
  TestimonialItemEntry,
  TestimonialItemEntryMeta,
  HeaderEntryMeta,
  FooterEntryMeta,
} from '../../bcms/types';

import HomePageHero from '@/components/home-page/Hero';
import HomePageServices from '@/components/home-page/Services';
import HomePageAbout from '@/components/home-page/About';
import HomePagePortfolio from '@/components/home-page/Portfolio';
import HomePageTestimonials from '@/components/home-page/Testimonials';
const Home: React.FC<{
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
    services: {
      bcms: {
        meta: {
          en: HomeServices;
        };
        content: {
          en: BCMSPropRichTextDataParsed;
        };
      };
    };
    serviceItem: {
      nodes: Array<{
        bcms: ServiceItemEntry;
      }>;
    };
    about: {
      bcms: {
        meta: {
          en: HomeAbout;
        };
        content: {
          en: BCMSPropRichTextDataParsed;
        };
      };
    };
    portfolio: {
      bcms: {
        meta: {
          en: HomePortfolio;
        };
        content: {
          en: BCMSPropRichTextDataParsed;
        };
      };
    };
    portfolioItem: {
      nodes: Array<{
        bcms: PortfolioItemEntry;
      }>;
    };
    testimonials: {
      bcms: {
        meta: {
          en: HomeTestimonials;
        };
        content: {
          en: BCMSPropRichTextDataParsed;
        };
      };
    };
    testimonialItem: {
      nodes: Array<{
        bcms: TestimonialItemEntry;
      }>;
    };
  };
}> = ({ data }) => {
  const homeService = React.useMemo(() => {
    return {
      title: data.services.bcms.meta.en?.title as string,
      description: data.services.bcms.meta.en
        ?.description as BCMSPropRichTextDataParsed,
      items: data.serviceItem?.nodes.map(
        (item) => item.bcms.meta.en as ServiceItemEntryMeta,
      ),
    };
  }, [data.services.bcms.meta.en, data.serviceItem]);

  const homePortfolio = React.useMemo(() => {
    return {
      title: data.portfolio.bcms.meta.en?.title as string,
      description: data.portfolio.bcms.meta.en
        ?.description as BCMSPropRichTextDataParsed,
      items: data.portfolioItem?.nodes.map(
        (item) => item.bcms.meta.en as PortfolioItemEntryMeta,
      ),
    };
  }, [data.portfolio.bcms.meta.en, data.portfolioItem]);

  const homeTestimonials = React.useMemo(() => {
    return {
      title: data.testimonials.bcms.meta.en?.title as string,
      description: data.testimonials.bcms.meta.en
        ?.description as BCMSPropRichTextDataParsed,
      items: data.testimonialItem?.nodes.map(
        (item) => item.bcms.meta.en as TestimonialItemEntryMeta,
      ),
    };
  }, [data.testimonials.bcms.meta.en, data.testimonialItem]);

  return (
    <PageWrapper
      header={data.header}
      footer={data.footer}
      page={data.page}
      location="/"
    >
      <HomePageHero data={data.page.bcms.meta.en.hero} />
      <HomePageServices data={homeService} />
      <HomePageAbout data={data.about.bcms.meta.en} />
      <HomePagePortfolio data={homePortfolio} />
      <HomePageTestimonials data={homeTestimonials} />
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
    services: bcmsServicesPage {
      ...ServicePage
    }
    serviceItem: allBcmsServiceItem {
      nodes {
        ...ServiceItem
      }
    }
    about: bcmsAboutPage {
      ...AboutPage
    }
    portfolio: bcmsPortfolioPage {
      ...Portfolio
    }
    portfolioItem: allBcmsPortfolioItem {
      nodes {
        ...PortfolioItem
      }
    }
    testimonials: bcmsTestimonialsPage {
      ...Testimonials
    }
    testimonialItem: allBcmsTestimonialItem {
      nodes {
        ...TestimonialItem
      }
    }
  }
`;

export default Home;
