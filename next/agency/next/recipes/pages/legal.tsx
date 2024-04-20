import React from 'react';
import { LegalPageData, PageProps } from '@/types';
import { PageWrapper } from '@/components/PageWrapper';
import ContentManager from '@/components/ContentManager';
import { GetStaticProps } from 'next';
import { LegalPageEntry } from '@/bcms/types';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';

const LegalPage: React.FC<PageProps<LegalPageData>> = ({
  page,
  footer,
  header,
}) => {
  const updatedDate = (val: number) => {
    const date = new Date(val);

    const day = date.getDate();
    const month = date.toLocaleString('default', {
      month: 'long',
    });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };
  return (
    <PageWrapper
      defaultTitle="Legal"
      header={header}
      page={page}
      footer={footer}
    >
      <div className="pt-24 pb-10 lg:pt-[104px] lg:pb-20 xl:pb-[120px]">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 lg:gap-12">
            {page.entries.map((item, index) => (
              <div
                key={index}
                className="border border-[#E6E6E6] rounded-[10px] px-4 py-6 lg:rounded-2xl lg:px-8 lg:py-10"
              >
                <h2 className="leading-none font-semibold tracking-[-0.41px] text-appGray-700 mb-2 lg:text-[40px] lg:leading-none lg:mb-5">
                  {item.meta.en?.title}
                </h2>
                <div className="text-xs leading-none font-medium tracking-[-0.41px] text-appGray-600 mb-4 lg:text-base lg:leading-none lg:mb-6">
                  Last updated: {updatedDate(item.updatedAt)}
                </div>
                <ContentManager
                  item={item.content.en || []}
                  className="text-sm leading-normal font-medium tracking-[-0.41px] text-appGray-500 lg:text-base lg:leading-normal"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LegalPage;

export const getStaticProps: GetStaticProps<
  PageProps<LegalPageData>
> = async () => {
  const client = getBcmsClient();
  try {
    const { header, footer } = await getHeaderAndFooter(client);

    const legalPage = (await client.entry.getAll({
      // Template name or ID
      template: 'legal_page',
    })) as LegalPageEntry[];
    return {
      props: {
        header,
        footer,
        page: {
          entries: legalPage,
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
