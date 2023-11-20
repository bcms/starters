import React, { FC } from 'react';
import { ContactPageForm, PageWrapper, TopGradient } from '../components';
import { graphql } from 'gatsby';
import { ContactPageData, PageData } from '../../types';

const Contact: FC<{
  data: PageData<ContactPageData>;
}> = ({ data }) => {
  return (
    <PageWrapper {...data} location="/contact/">
      <div className="relative pt-10 pb-8 md:py-[72px] lg:pb-[100px] xl:pb-[128px]">
        <div className="container">
          <div className="flex flex-col-reverse items-center text-center gap-2.5 mb-8 md:gap-4 md:mb-10 lg:gap-5 lg:mb-12">
            <h1 className="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none">
              {data.page.bcms.meta.en.title}
            </h1>
            <h2 className="text-sm leading-none tracking-[-0.41px] text-appGray-600 md:text-base md:leading-none lg:text-xl lg:leading-none">
              {data.page.bcms.meta.en.subtitle}
            </h2>
          </div>
        </div>
        <TopGradient />
      </div>
      <ContactPageForm email={data.page.bcms.meta.en.email} />
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

export default Contact;
