import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';  
import ContactHero from '@/components/contact/Hero';
import ContactForm from '@/components/contact/Form';
import { ContactPageData, PageProps } from '@/types';
import { GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';
import { ContactPageEntry, ContactPageEntryMeta } from '@/bcms/types';

const ContactPage: React.FC<PageProps<ContactPageData>> = ({ page, header, footer }) => {
  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <ContactHero 
        title={page.meta.title}
        email={page.meta.email}
        phone={page.meta.phone} 
      />
      <ContactForm />
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<ContactPageData>
> = async () => {
  const client = getBcmsClient();
  const { header, footer } = await getHeaderAndFooter(client);

  // Get Contact Page entry
  const contactPage = (await client.entry.get({
    template: 'contact_page',
    entry: 'contact',
  })) as ContactPageEntry;

  if (!contactPage) {
    throw new Error('Home page entry does not exist.');
  }

  return {
    props: {
      header,
      footer,
      page: {
        meta: contactPage.meta.en as ContactPageEntryMeta,
      },
    },
  };
}; 


export default ContactPage;
