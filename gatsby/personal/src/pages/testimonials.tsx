import {
  FooterEntryMeta,
  HeaderEntryMeta,
  TestimonialItemEntry,
  TestimonialsPageEntryMeta,
} from '../../bcms/types';

import React, { useState } from 'react';
import { PageWrapper } from '@/components/PageWrapper';
import AnimatedTitle from '@/components/AnimatedTitle';
import { BCMSImage } from 'gatsby-source-bcms/components';
import ContentManager from '@/components/ContentManager';
import {
  BCMSPropMediaDataParsed,
  BCMSPropRichTextDataParsed,
} from '@becomes/cms-client/types';
import { graphql } from 'gatsby';

const TestimonialsPage: React.FC<{
  data: {
    header: {
      bcms: {
        meta: {
          en: HeaderEntryMeta;
        };
      };
    };
    footer: {
      bcms: {
        meta: {
          en: FooterEntryMeta;
        };
      };
    };
    page: {
      bcms: {
        meta: {
          en: TestimonialsPageEntryMeta;
        };
        content: {
          en: BCMSPropRichTextDataParsed;
        };
      };
    };
    testimonialItem: {
      nodes: Array<{
        bcms: TestimonialItemEntry;
      }>;
    };
  };
}> = ({ data }) => {
  const [activeItemIndex, setActiveItemIndex] = useState(0);

  const activeItem = data.testimonialItem?.nodes[activeItemIndex];

  return (
    <PageWrapper
      header={data.header}
      footer={data.footer}
      page={data.page}
      location="/testimonials"
    >
      <div className="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
        <div className="container">
          <AnimatedTitle
            title={data.page.bcms.meta.en.title}
            className="mb-10 md:mb-20 lg:mb-[124px]"
            titleClassName="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
          />
          <div className="flex flex-wrap justify-center gap-4 mb-12 max-w-[856px] mx-auto lg:gap-6 lg:mb-[170px]">
            {data.testimonialItem?.nodes.map((item, index) => (
              <button
                key={index}
                className="flex"
                onClick={() => setActiveItemIndex(index)}
              >
                <BCMSImage
                  media={
                    item.bcms.meta.en?.author.avatar as BCMSPropMediaDataParsed
                  }
                  options={{
                    sizes: {
                      exec: [
                        {
                          width: 100,
                          height: 100,
                        },
                      ],
                    },
                  }}
                  className={`w-10 h-10 rounded-full overflow-hidden cover transition-all duration-300 lg:w-16 lg:h-16 ${
                    activeItemIndex === index ? 'scale-125' : 'opacity-20'
                  }`}
                />
              </button>
            ))}
          </div>
          <div className="flex flex-col items-center text-center max-w-[1194px] mx-auto mb-6 lg:mb-12">
            <h3 className="text-xl leading-none tracking-[-0.41px] font-Helvetica mb-[14px] lg:text-[32px] lg:mb-10">
              {activeItem?.bcms.meta.en?.author.name}
            </h3>
            <ContentManager
              item={activeItem?.bcms.meta.en?.content || []}
              className="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-500 lg:text-[32px]"
            />
          </div>
          <div className="flex items-center gap-2 lg:gap-6">
            {data.testimonialItem.nodes.map((_, index) => (
              <button
                key={index}
                className={`relative h-0.5 transition-all duration-300 after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-full after:h-5 lg:h-1 ${
                  activeItemIndex === index
                    ? 'flex-[3] bg-[#2B261E]'
                    : 'flex-1 bg-[#F0F0F0]'
                }`}
                onClick={() => setActiveItemIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export const query = graphql`
  query {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }
    page: bcmsTestimonialsPage {
      ...Testimonials
    }
    testimonialItem: allBcmsTestimonialItem {
      nodes {
        ...TestimonialItem
      }
    }
  }
`;

export default TestimonialsPage;
