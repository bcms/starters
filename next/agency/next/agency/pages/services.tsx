import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';  
import { PageProps, ServicesPageData } from '@/types';
import {
    ServicesPageEntry,
    ServicesPageEntryMeta,
  } from '@/bcms/types';
import { GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';
import Hero from '@/components/Hero';
import Services from '@/components/services/List'
import ContactBlock from '@/components/ContactBlock';

const ServicesPage: React.FC<PageProps<ServicesPageData>> = ({ page, header, footer }) => {
    return (
      <PageWrapper page={page} header={header} footer={footer}>
        <Hero 
            title={page.meta.title} 
            subtitle="Portfolio" 
            description={page.meta.description} 
        />
        <Services services={page.meta.services} />
        <ContactBlock data={page.meta.contact_block} />
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<ServicesPageData>
> = async () => {
  try {
    const client = getBcmsClient();

    const { header, footer } = await getHeaderAndFooter(client);

    const ServicesPage = (await client.entry.get({
      // Template name or ID
      template: 'services_page',
      // Entry slug or ID
      entry: 'services',
    })) as ServicesPageEntry;
    if (!ServicesPage) {
      throw new Error('services page entry does not exist.');
    }
    return {
      props: {
        header,
        footer,
        page: {
          meta: ServicesPage.meta.en as ServicesPageEntryMeta,
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

export default ServicesPage;
