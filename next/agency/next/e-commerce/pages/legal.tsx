import { GetStaticProps } from 'next';
import { LegalPageData, PageProps } from '@/types';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';
import { LegalEntry, LegalEntryMeta } from '@/bcms/types';
import { BCMSEntryContentParsedItem } from '@becomes/cms-client/types';
import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import ContentManager from '@/components/ContentManager';

const LegalPage: React.FC<PageProps<LegalPageData>> = ({
  header,
  footer,
  page,
}) => {
  return (
    <PageWrapper
      defaultTitle="Legal"
      page={page}
      header={header}
      footer={footer}
    >
      <h1 className="sr-only">Legal page</h1>
      <div className="pt-2 pb-14 md:pb-20 lg:pb-[136px]">
        <div className="container">
          <div className="grid grid-cols-1 gap-6">
            {page.entries.map((item, index) => (
              <div key={index} className="border border-[#DBD9D5] p-6">
                <h2 className="text-[24px] leading-none tracking-[-1.4px] text-appGray-900 mb-5 md:text-[32px]">
                  {item.meta.title}
                </h2>
                <ContentManager
                  item={item.content}
                  className="grid grid-cols-1 gap-4 leading-[1.5] tracking-[-4%] text-appGray-500 md:text-lg"
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
    const legalEntries = (await client.entry.getAll({
      template: 'legal',
    })) as LegalEntry[];

    return {
      props: {
        header,
        footer,
        page: {
          entries: legalEntries.map((entry) => {
            return {
              meta: entry.meta.en as LegalEntryMeta,
              content: entry.content.en as BCMSEntryContentParsedItem[],
            };
          }),
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
