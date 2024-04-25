import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import { PageProps, PortfolioPageData } from '@/types';
import { PortfolioPageEntry, PortfolioPageEntryMeta } from '@/bcms/types';
import { GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';
import Hero from '@/components/Hero';
import PortfolioList from '@/components/portfolio/List';
import ContactBlock from '@/components/ContactBlock';

const PortfolioPage: React.FC<PageProps<PortfolioPageData>> = ({
  page,
  header,
  footer,
}) => {
  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <Hero
        title={page.meta.title}
        subtitle="Portfolio"
        description={page.meta.description}
      />
      <PortfolioList items={page.meta.items} />
      <ContactBlock data={page.meta.contact_block} />
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<PortfolioPageData>
> = async () => {
  try {
    const client = getBcmsClient();

    const { header, footer } = await getHeaderAndFooter(client);

    const portfolioPage = (await client.entry.get({
      // Template name or ID
      template: 'portfolio_page',
      // Entry slug or ID
      entry: 'portfolio',
    })) as PortfolioPageEntry;
    if (!portfolioPage) {
      throw new Error('Portfolio page entry does not exist.');
    }
    return {
      props: {
        header,
        footer,
        page: {
          meta: portfolioPage.meta.en as PortfolioPageEntryMeta,
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

export default PortfolioPage;
