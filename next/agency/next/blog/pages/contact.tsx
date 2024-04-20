import { TopGradient } from '@/components/TopGradient';
import { PageWrapper } from '@/components/PageWrapper';
import { ContactPageData, PageProps } from '@/types';
import { GetStaticProps } from 'next';
import { ContactPageForm } from '@/components/content-page/Form';
import React, { FC, useEffect } from 'react';
import { useHeadTags } from '@/composables/og-head';
import { ContactPageEntry, ContactPageEntryMeta } from '@/bcms/types';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';

const ContactPage: FC<PageProps<ContactPageData>> = (props) => {
  const { setOgHead } = useHeadTags();
  useEffect(() => {
    setOgHead({
      title: props.page.meta.title,
    });
  }, [props.page]);

  return (
    <PageWrapper {...props}>
      <div className="relative pt-10 pb-8 md:py-[72px] lg:pb-[100px] xl:pb-[128px]">
        <div className="container">
          <div className="flex flex-col-reverse items-center text-center gap-2.5 mb-8 md:gap-4 md:mb-10 lg:gap-5 lg:mb-12">
            <h1 className="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none">
              {props.page.meta.title}
            </h1>
            <h2 className="text-sm leading-none tracking-[-0.41px] text-appGray-600 md:text-base md:leading-none lg:text-xl lg:leading-none">
              {props.page.meta.subtitle}
            </h2>
          </div>
        </div>
        <TopGradient />
      </div>
      <ContactPageForm email={props.page.meta.email} />
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<ContactPageData>
> = async () => {
  const client = getBcmsClient();
  const { header, footer } = await getHeaderAndFooter(client);
  const contactPage = (await client.entry.get({
    // Template name or ID
    template: 'contact_page',
    // Entry slug or ID
    entry: 'contact',
  })) as ContactPageEntry;
  if (!contactPage) {
    throw new Error('Contact page entry does not exist.');
  }
  return {
    props: {
      header,
      footer,
      page: { meta: contactPage.meta.en as ContactPageEntryMeta },
    },
  };
};

export default ContactPage;
