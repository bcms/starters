import React from 'react';
import { AboutPageData, PageData } from '@/types';
import { PageWrapper } from '@/src/components/PageWrapper';
import { AboutPageHero } from '@/src/components/about-page/Hero';
import { AboutPageTextImage } from '@/src/components/about-page/TextImage';
import { graphql } from 'gatsby';

interface AboutUsPageProps {
  data: PageData<AboutPageData>;
}
const AboutUsPage: React.FC<AboutUsPageProps> = ({ data }) => {
  return (
    <PageWrapper page={data.page} header={data.header} footer={data.footer}>
      <AboutPageHero data={data.page.bcms.meta.en.hero} />
      <AboutPageTextImage data={data.page.bcms.meta.en.text_image_cols} />
    </PageWrapper>
  );
};

export const query = graphql`
  {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }

    page: bcmsAboutPage {
      ...AboutPage
    }
  }
`;

export default AboutUsPage;
