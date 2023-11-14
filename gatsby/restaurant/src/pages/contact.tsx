import React from 'react';
import { ContactPageData, PageData } from '@/types';
import { PageWrapper } from '@/src/components/PageWrapper';
import { ContentManager } from '@/src/components/ContentManager';
import ArchWithStar from '@/src/components/ArchWithStar';
import { BCMSImage } from 'gatsby-source-bcms/components';
import Btn from '@/src/components/Btn';
import { graphql } from 'gatsby';

interface ContactPageProps {
  data: PageData<ContactPageData>;
}
const ContactPage: React.FC<ContactPageProps> = ({ data }) => {
  return (
    <PageWrapper page={data.page} header={data.header} footer={data.footer}>
      <section className="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]">
        <div className="container max-w-[1198px]">
          <ArchWithStar />
          <div className="relative px-4 max-w-[400px] mx-auto lg:max-w-[560px] xl:px-0">
            <h1 className="text-xl leading-none font-Gloock uppercase text-center mb-8 lg:text-5xl lg:leading-none lg:mb-20">
              {data.page.bcms.meta.en.title}
            </h1>
            <ContentManager
              items={data.page.bcms.meta.en.description}
              className="contactPage--description text-sm leading-[1.3] tracking-[-0.41px] uppercase text-center text-appGray-700 mb-8 lg:text-base lg:leading-[1.3] lg:mb-12"
            />
            <div className="bg-[#E5E4DA] rounded-2xl p-4 mb-8 lg:mb-10">
              <BCMSImage
                media={data.page.bcms.meta.en.map}
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

export const query = graphql`
  {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }

    page: bcmsContactPage {
      ...ContactPage
    }
  }
`;
export default ContactPage;
