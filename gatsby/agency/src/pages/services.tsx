import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';

import {
  ServiceEntry,
  ServicesPageEntryMeta,
  FooterEntryMeta,
  HeaderEntryMeta,
} from '../../bcms/types';

import ContactBlock from '@/components/ContactBlock';
import { graphql } from 'gatsby';
import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import Hero from '@/components/Hero';
import Services from '@/components/services/List';

const ServicesPage: React.FC<{
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
          en: ServicesPageEntryMeta;
        };
        content: {
          en: BCMSPropRichTextDataParsed;
        };
      };
    };
    services: {
      nodes: Array<{
        bcms: ServiceEntry;
      }>;
    };
  };
}> = ({ data }) => {
  
  return (
    <PageWrapper
      header={data.header}
      footer={data.footer}
      page={data.page}
      location="/services"
    >
      {
        <>
          <Hero
            title={data.page.bcms.meta.en.title}
            subtitle="Our services"
            description={data.page.bcms.meta.en.description}
          />
          <Services services={data.services.nodes} />
          <ContactBlock data={data.page.bcms.meta.en.contact_block} />
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
    page: bcmsServicesPage {
      ...Services
    }
    services: allBcmsService {
      nodes {
        ...AllServices
      }
    }
  }
`;

export default ServicesPage;
