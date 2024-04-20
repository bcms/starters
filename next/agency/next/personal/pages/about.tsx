import { GetStaticProps } from 'next';
import { PageProps, AboutPageData } from '@/types';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-props';
import { AboutPageEntry, AboutPageEntryMeta } from '@/bcms/types';
import React from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import AnimatedTitle from '@/components/AnimatedTitle';
import ContentManager from '@/components/ContentManager';
import { BCMSImage } from 'next-plugin-bcms/components';
const AboutPage: React.FC<PageProps<AboutPageData>> = ({
  footer,
  page,
  header,
}) => {
  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <div className="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
        <div className="container mb-10 lg:mb-[128px] xl:pr-[220px]">
          <AnimatedTitle
            title={page.meta.title}
            className="mb-10 md:mb-20 lg:mb-[192px]"
            titleClassName="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
          />
          <div className="mb-8 lg:flex lg:items-start lg:gap-[98px] lg:mb-14">
            <div className="flex items-center mb-[14px] flex-shrink-0 lg:w-[200px]">
              <div className="w-1.5 h-1.5 flex-shrink-0 bg-appText rounded-full mr-2 lg:w-2 lg:h-2 lg:mr-4" />
              <div className="text-lg leading-none font-Helvetica tracking-[-0.41px] lg:text-[32px]">
                {page.meta.education.title}
              </div>
            </div>
            <div>
              <ContentManager
                item={page.meta.education.description}
                className="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 mb-6 lg:text-base lg:leading-[1.4] lg:mb-8"
              />
              <div className="flex flex-wrap gap-3">
                {page?.meta?.education?.degrees.map((degree, index) => (
                  <div
                    key={index}
                    className="flex text-sm leading-none tracking-[-0.41px] text-appGray-500 font-medium px-4 py-3 border border-appGray-200 rounded-[32px] lg:text-base lg:leading-none"
                  >
                    {degree}
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="lg:flex lg:items-start lg:gap-[98px]">
            <div className="flex items-center mb-[14px] flex-shrink-0 lg:w-[200px]">
              <div className="w-1.5 h-1.5 flex-shrink-0 bg-appText rounded-full mr-2 lg:w-2 lg:h-2 lg:mr-4" />
              <div className="text-lg leading-none font-Helvetica tracking-[-0.41px] lg:text-[32px]">
                {page.meta.work_history.title}
              </div>
            </div>
            <div>
              <ContentManager
                item={page.meta.work_history.description}
                className="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 mb-6 lg:text-base lg:leading-[1.4] lg:mb-8"
              />
              <div className="flex flex-wrap gap-3">
                {page.meta.work_history.items.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center text-sm leading-none tracking-[-0.41px] text-appGray-500 px-4 py-3 border border-appGray-200 rounded-[32px] lg:text-base lg:leading-none"
                  >
                    <span>{item.company_name}</span>
                    <span className="w-[3px] h-[3px] rounded-full bg-appGray-500 mx-1.5 lg:mx-2" />
                    <span>{new Date(item.from).getFullYear()}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <BCMSImage
          media={page.meta.cover}
          className="w-full cover aspect-[1.84] mb-10 lg:aspect-[2.59] lg:mb-20"
        />
        <div className="container">
          <div className="max-w-[969px] mx-auto">
            <ContentManager
              item={page.meta.awards.title}
              className="text-lg leading-[1.2] tracking-[-0.41px] font-Helvetica mb-6 lg:text-[40px] lg:mb-16"
            />
            <div className="grid grid-cols-1 gap-[14px] lg:gap-6">
              {page.meta.awards.items.map((award, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between pb-[14px] border-b border-appGray-200 lg:pb-6"
                >
                  <div className="flex">
                    <span className="text-xs leading-none tracking-[-0.41px] mr-1 lg:text-base lg:leading-none lg:mr-2">
                      {award.place}
                    </span>
                    <span className="text-sm leading-none tracking-[-0.41px] text-appGray-400 lg:text-2xl lg:leading-none">
                      {award.title}
                    </span>
                  </div>
                  <div className="text-sm leading-none tracking-[-0.41px] lg:text-base lg:leading-none">
                    ({new Date(award.year).getFullYear()})
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<AboutPageData>
> = async () => {
  try {
    const client = getBcmsClient();

    const { header, footer } = await getHeaderAndFooter(client);

    const aboutPage = (await client.entry.get({
      // Template name or ID
      template: 'about_page',
      // Entry slug or ID
      entry: 'abooout',
    })) as AboutPageEntry;
    if (!aboutPage) {
      throw new Error('About page entry does not exist.');
    }

    return {
      props: {
        header,
        footer,
        page: {
          meta: aboutPage.meta.en as AboutPageEntryMeta,
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

export default AboutPage;
