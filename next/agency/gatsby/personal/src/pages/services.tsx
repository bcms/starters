import {
  FooterEntryMeta,
  HeaderEntryMeta,
  ServiceItemEntry,
  ServicesPageEntryMeta,
} from '../../bcms/types';
import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import AnimatedTitle from '@/components/AnimatedTitle';
import ContentManager from '@/components/ContentManager';
import { BCMSPropRichTextDataParsed } from '@becomes/cms-client/types';
import { graphql } from 'gatsby';

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
    serviceItem: {
      nodes: Array<{
        bcms: ServiceItemEntry;
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
      <div className="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
        <div className="container">
          <AnimatedTitle
            title={data.page.bcms.meta.en.title}
            className="mb-10 md:mb-20 lg:mb-[192px]"
            titleClassName="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
          />
          <div className="grid grid-cols-1 gap-10 lg:gap-[72px]">
            {data.serviceItem.nodes &&
              data.serviceItem.nodes.map((service, index) => (
                <div
                  key={index}
                  className="lg:grid lg:grid-cols-[1fr,378px,minmax(auto,1fr)] lg:items-start lg:gap-10"
                >
                  <div className="flex items-center max-lg:mb-[14px]">
                    <div className="w-1.5 h-1.5 bg-appText rounded-full mr-2 lg:w-2.5 lg:h-2.5 lg:mr-4 lg:mt-2" />
                    <h2 className="text-lg leading-none tracking-[-0.41px] font-Helvetica lg:text-[32px] lg:leading-none">
                      {service.bcms.meta.en?.title}
                    </h2>
                  </div>
                  <div className="max-lg:mb-6 lg:max-w-[378px]">
                    <ContentManager
                      item={
                        service.bcms.meta.en
                          ?.description as BCMSPropRichTextDataParsed
                      }
                      className="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 mb-[14px] lg:text-base lg:leading-[1.4] lg:mb-6"
                    />
                    <div className="leading-none tracking-[-0.41px] font-Helvetica lg:text-xl lg:leading-none">
                      Start from ${service.bcms.meta.en?.start_price}
                    </div>
                  </div>
                  <div className="flex lg:justify-end">
                    <button className="flex justify-center items-center w-full px-6 py-[13px] border border-appGray-200 rounded-[32px] text-appGray-500 transition-colors duration-300 hover:border-appText hover:bg-appText hover:text-white lg:px-10 lg:py-5 lg:w-auto">
                      <span className="text-sm leading-none tracking-[-0.41px] font-medium lg:text-2xl lg:leading-none">
                        Start project
                      </span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
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
      ...ServicePage
    }
    serviceItem: allBcmsServiceItem {
      nodes {
        ...ServiceItem
      }
    }
  }
`;

export default ServicesPage;
