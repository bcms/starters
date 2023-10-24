import React from 'react';
import { AboutPageData, PageProps } from '@/types';
import { PageWrapper } from '@/components/PageWrapper';
import { GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';
import { AboutPageEntry, AboutPageEntryMeta } from '@/bcms/types';
import AboutPageHero from '@/components/about-page/Hero';
import AboutPageTextImage from '@/components/about-page/TextImage';

const AboutUsPage: React.FC<PageProps<AboutPageData>> = ({
  header,
  page,
  footer,
}) => {
  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <AboutPageHero data={page.meta.hero} />
      <AboutPageTextImage data={page.meta.text_image_cols} />
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<AboutPageData>
> = async () => {
  const client = getBcmsClient();
  try {
    const { header, footer } = await getHeaderAndFooter(client);
    const aboutPage = (await client.entry.get({
      // Template name or ID
      template: 'about_page',
      // Entry slug or ID
      entry: 'about-us',
    })) as AboutPageEntry;
    if (!aboutPage) {
      throw new Error('About page entry does not exist.');
    }

    return {
      props: {
        header,
        footer,
        page: {
          meta: aboutPage.meta.en as AboutPageEntryMeta,
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
export default AboutUsPage;
