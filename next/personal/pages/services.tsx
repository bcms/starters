import { GetStaticProps } from 'next';
import { PageProps, ServicesPageData } from '@/types';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-props';
import {
  ServiceItemEntry,
  ServiceItemEntryMeta,
  ServicesPageEntry,
  ServicesPageEntryMeta,
} from '@/bcms/types';
import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import AnimatedTitle from '@/components/AnimatedTitle';
import ContentManager from '@/components/ContentManager';

const ServicesPage: React.FC<PageProps<ServicesPageData>> = ({
  footer,
  page,
  header,
}) => {
  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <div className="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
        <div className="container">
          <AnimatedTitle
            title={page.meta.title}
            className="mb-10 md:mb-20 lg:mb-[192px]"
            titleClassName="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
          />
          <div className="grid grid-cols-1 gap-10 lg:gap-[72px]">
            {page.services &&
              page.services.map((service, index) => (
                <div
                  key={index}
                  className="lg:grid lg:grid-cols-[1fr,378px,minmax(auto,1fr)] lg:items-start lg:gap-10"
                >
                  <div className="flex items-center max-lg:mb-[14px]">
                    <div className="w-1.5 h-1.5 bg-appText rounded-full mr-2 lg:w-2.5 lg:h-2.5 lg:mr-4 lg:mt-2" />
                    <h2 className="text-lg leading-none tracking-[-0.41px] font-Helvetica lg:text-[32px] lg:leading-none">
                      {service.title}
                    </h2>
                  </div>
                  <div className="max-lg:mb-6 lg:max-w-[378px]">
                    <ContentManager
                      item={service.description}
                      className="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 mb-[14px] lg:text-base lg:leading-[1.4] lg:mb-6"
                    />
                    <div className="leading-none tracking-[-0.41px] font-Helvetica lg:text-xl lg:leading-none">
                      Start from ${service.start_price}
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

export const getStaticProps: GetStaticProps<
  PageProps<ServicesPageData>
> = async () => {
  try {
    const client = getBcmsClient();

    const { header, footer } = await getHeaderAndFooter(client);

    const servicesPage = (await client.entry.get({
      // Template name or ID
      template: 'services_page',
      // Entry slug or ID
      entry: 'services',
    })) as ServicesPageEntry;
    if (!servicesPage) {
      throw new Error('Services page entry does not exist.');
    }
    const serviceItems = (await client.entry.getAll({
      // Template name or ID
      template: 'service_item',
    })) as ServiceItemEntry[];
    return {
      props: {
        header,
        footer,
        page: {
          meta: servicesPage.meta.en as ServicesPageEntryMeta,
          services: serviceItems.map(
            (item) => item.meta.en as ServiceItemEntryMeta,
          ),
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
