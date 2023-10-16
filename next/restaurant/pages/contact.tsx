import React from 'react';
import { ContactPageData, PageProps } from '@/types';
import { GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { getHeaderAndFooter } from '@/utils/page-data';
import { ContactPageEntry, ContactPageEntryMeta } from '@/bcms/types';
import { PageWrapper } from '@/components/PageWrapper';
import ContentManager from '@/components/ContentManager';
import ArchWithStar from '@/components/ArchWithStar';
import { BCMSImage } from 'next-plugin-bcms/components';
import Btn from '@/components/Btn';

const ContactPage: React.FC<PageProps<ContactPageData>> = ({
  header,
  footer,
  page,
}) => {
  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <section className="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]">
        <div className="container max-w-[1198px]">
          <ArchWithStar />
          <div className="relative px-4 max-w-[400px] mx-auto lg:max-w-[560px] xl:px-0">
            <h1 className="text-xl leading-none font-Gloock uppercase text-center mb-8 lg:text-5xl lg:leading-none lg:mb-20">
              {page.meta.title}
            </h1>
            <ContentManager
              item={page.meta.description}
              className="contactPage--description text-sm leading-[1.3] tracking-[-0.41px] uppercase text-center text-appGray-700 mb-8 lg:text-base lg:leading-[1.3] lg:mb-12"
            />
            <div className="bg-[#E5E4DA] rounded-2xl p-4 mb-8 lg:mb-10">
              <BCMSImage
                media={page.meta.map}
                options={{
                  sizes: {
                    exec: [
                      {
                        width: 1078,
                        height: 678,
                      },
                    ],
                  },
                }}
                className="w-full h-auto cover rounded-[10px] overflow-hidden pointer-events-auto"
              />
            </div>
            <Btn
              to="https://www.google.com/maps"
              className="uppercase max-w-max mx-auto"
            >
              <span>Open maps</span>
            </Btn>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<ContactPageData>
> = async () => {
  const client = getBcmsClient();
  try {
    const { header, footer } = await getHeaderAndFooter(client);
    const contactPage = (await client.entry.get({
      // Template name or ID
      template: 'contact_page',
      // Entry slug or ID
      entry: 'contact-us',
    })) as ContactPageEntry;
    if (!contactPage) {
      throw new Error('Contact page entry does not exist.');
    }

    return {
      props: {
        header,
        footer,
        page: {
          meta: contactPage.meta.en as ContactPageEntryMeta,
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
export default ContactPage;
