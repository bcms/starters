import { GetStaticProps } from 'next';
import { PageProps, LegalPageData } from '@/types';
import { LegalPageEntry, LegalPageEntryMeta } from '@/bcms/types';
import { getHeaderAndFooter } from '@/utils/page-data';
import { BCMSEntryContentParsedItem } from '@becomes/cms-client/types';
import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import ContentManager from '@/components/ContentManager';
import { getBcmsClient } from 'next-plugin-bcms';

interface LegalPageProps extends PageProps<LegalPageData> {
  page: {
    entries: {
      meta: LegalPageEntryMeta;
      content: BCMSEntryContentParsedItem[];
    }[];
  };
}

const LegalPage: React.FC<LegalPageProps> = ({ header, footer, page }) => {
  const meta = { title: 'Legal' };
  return (
    <PageWrapper page={{ meta }} header={header} footer={footer}>
      <div className="pt-6 pb-14 md:pt-10 md:pb-20 lg:pt-16 lg:pb-[120px]">
        <div className="container">
          <div className="grid grid-cols-1 gap-4 max-w-[850px] mx-auto lg:gap-6">
            <h1 className="sr-only">Legal page content</h1>
            {page.entries.map((item, index) => (
              <div
                key={index}
                className="border border-[#DBD9D5] rounded-[7px] p-6"
              >
                <h2 className="text-sm leading-none font-medium tracking-[-0.41px] font-PlayfairDisplay mb-3 lg:text-[32px] lg:leading-none lg:mb-5">
                  {item.meta.title}
                </h2>
                <ContentManager
                  item={item.content}
                  className="text-xs leading-normal font-medium tracking-[-0.41px] text-appGray-600 lg:text-lg lg:leading-normal"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  try {
    const client = getBcmsClient();
    const { header, footer } = await getHeaderAndFooter(client);

    const legalEntries = (await client.entry.getAll({
      template: 'legal_page',
    })) as LegalPageEntry[];

    const entries = legalEntries.map((entry) => {
      return {
        meta: entry.meta.en as LegalPageEntryMeta,
        content: entry.content.en as BCMSEntryContentParsedItem[],
      };
    });

    return {
      props: {
        header,
        footer,
        page: {
          entries,
        },
      },
    };
  } catch (error) {
    throw {
      statusCode: 500,
    };
  }
};

export default LegalPage;
