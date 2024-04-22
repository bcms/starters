import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';  
import ContentManager from '@/components/ContentManager'; 
import { LegalPageData, PageProps } from '@/types';
import { LegalBlockGroup, LegalPageEntry, LegalPageEntryMeta } from '@/bcms/types';
import { GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';

const LegalPage: React.FC<PageProps<LegalPageData>> = ({ page, header, footer }) => {
    return (
      <PageWrapper page={page} header={header} footer={footer}>
      <div className="mt-6 md:mt-10 lg:mt-[76px]">
        <div className="container">
          <h1 className="font-bold leading-none tracking-[-0.32px] text-center mb-8 md:text-3xl md:leading-none md:mb-14 lg:font-Inter lg:font-medium lg:text-5xl lg:leading-none lg:tracking-[-0.96px] lg:mb-20">
            {page.meta.title}
          </h1>
          <div className="grid grid-cols-1 gap-3 lg:gap-4">
            {page.meta.blocks.map((block: LegalBlockGroup, index: number) => (
              <div 
                key={index} 
                className="flex flex-col gap-4 p-6 rounded-lg"
                style={{ boxShadow: '0px 0px 0px 1px #EDEDED, 0px 1.5px 1px 0px rgba(15, 18, 35, 0.14)' }}
              >
                <h2 className="text-sm font-bold leading-[1.1] tracking-[-0.28px] lg:text-2xl lg:leading-[1.1] lg:tracking-[-0.48px]">
                  {block.title}
                </h2>
                <ContentManager 
                  item={block.description}
                  className="text-appGray-200 text-xs font-medium leading-[1.4] tracking-[-0.24px] lg:text-xl lg:leading-[1.4] lg:tracking-[-0.4px]"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<LegalPageData>
> = async () => {
  const client = getBcmsClient();
  const { header, footer } = await getHeaderAndFooter(client);

  // Get Contact Page entry
  const contactPage = (await client.entry.get({
    template: 'legal_page',
    entry: 'legal',
  })) as LegalPageEntry;

  if (!contactPage) {
    throw new Error('Legal page entry does not exist.');
  }

  return {
    props: {
      header,
      footer,
      page: {
        meta: contactPage.meta.en as LegalPageEntryMeta,
      },
    },
  };
}; 

export default LegalPage;
