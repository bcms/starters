import { TopGradient } from '@/components/TopGradient';
import { ContentManager } from '@/components/ContentManager';
import { BCMSImage } from 'next-plugin-bcms/components';
import { PageWrapper } from '@/components/PageWrapper';
import { GetStaticProps } from 'next';
import { AboutPageData, PageProps } from '@/types';
import { useHeadTags } from '@/composables/og-head';
import React, { FC, useEffect } from 'react';
import { Widgets } from '@/components/widgets/Widgets';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';
import { AboutPageEntry, AboutPageEntryMeta } from '@/bcms/types';
import { BCMSEntryContentParsedItem } from '@becomes/cms-client/types';

const AboutMe: FC<PageProps<AboutPageData>> = (props) => {
  const { setOgHead } = useHeadTags();

  useEffect(() => {
    setOgHead({
      title: props.page.meta.title,
    });
  }, [props.page]);

  return (
    <PageWrapper {...props}>
      <div className="relative pt-10 pb-8 md:py-[72px] lg:pb-[104px]">
        <div className="container">
          <div className="flex flex-col items-center text-center mb-8 md:mb-20 lg:mb-[134px]">
            <div className="text-sm leading-none tracking-[-0.41px] text-appGray-600 mb-2.5 md:text-base md:leading-none lg:text-xl lg:leading-none lg:mb-5">
              {props.page.meta.subtitle}
            </div>
            <h1 className="leading-none font-medium tracking-[-0.41px] mb-3 md:text-2xl md:leading-none md:mb-4 lg:text-[56px] lg:leading-none lg:mb-6">
              {props.page.meta.title}
            </h1>
            <ContentManager
              items={props.page.meta.description}
              className="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-500 font-medium max-w-[633px] mx-auto md:text-lg md:leading-none lg:text-[22px] lg:leading-[1.3]"
            />
          </div>
          <div className="relative aspect-[2.07] rounded-lg overflow-hidden mb-6 lg:aspect-[2.43] lg:rounded-2xl lg:mb-8">
            <BCMSImage
              media={props.page.meta.cover}
              className="w-full h-full cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-black/50" />
          </div>
          <ContentManager
            items={props.page.content}
            widgetComponents={Widgets}
            className="prose"
          />
        </div>
        <TopGradient />
      </div>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<AboutPageData>
> = async () => {
  const client = getBcmsClient();
  const { header, footer } = await getHeaderAndFooter(client);
  // Get About Page entry
  const aboutPage = (await client.entry.get({
    // Template name of ID
    template: 'about_page',
    // Entry slug or ID
    entry: 'about',
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
        content: aboutPage.content.en as BCMSEntryContentParsedItem[],
      },
    },
  };
};

export default AboutMe;
