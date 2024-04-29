import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import ContactHero from '@/components/contact/Hero';
import ContactForm from '@/components/contact/Form';
import {
  ContactPageEntryMeta,
  HeaderEntryMeta,
  FooterEntryMeta,
} from '../../bcms/types';
import { graphql } from 'gatsby';
import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';

const ContactPage: React.FC<{
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
          en: ContactPageEntryMeta;
        };
        content: {
          en: BCMSPropRichTextDataParsed;
        };
      };
    };
  };
}> = ({ data }) => {
  return (
    <PageWrapper
      header={data.header}
      footer={data.footer}
      page={data.page}
      location="/contact"
    >
      <ContactHero
        title={data.page.bcms.meta.en.title}
        email={data.page.bcms.meta.en.email}
        phone={data.page.bcms.meta.en.phone}
      />
      <ContactForm />
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
    page: bcmsContactPage {
      ...ContactPage
    }
  }
`;

export default ContactPage;
