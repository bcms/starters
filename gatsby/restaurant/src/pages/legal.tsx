import React from 'react';
import { PageData } from '@/types';
import { PageWrapper } from '@/src/components/PageWrapper';
import ArchWithStar from '@/src/components/ArchWithStar';
import { ContentManager } from '@/src/components/ContentManager';
import { graphql } from 'gatsby';
import { LegalPageEntry } from '@/bcms/types';
interface LegalPageProps {
  data: PageData<any> & {
    entries: {
      nodes: Array<{
        bcms: LegalPageEntry;
      }>;
    };
  };
}
const LegalPage: React.FC<LegalPageProps> = ({ data }) => {
  return (
    <PageWrapper
      defaultTitle="Legal"
      page={data.page}
      header={data.header}
      footer={data.footer}
    >
      <section className="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]">
        <div className="container max-w-[1198px]">
          <ArchWithStar />
          <div className="relative px-4 max-w-[400px] mx-auto lg:max-w-[850px] xl:px-0">
            <h1 className="text-xl leading-none font-Gloock uppercase text-center mb-12 lg:text-5xl lg:leading-none lg:mb-20">
              Legal
            </h1>
            <div className="grid grid-cols-1 gap-4 max-w-[850px] mx-auto lg:gap-6">
              {data.entries.nodes.map((item, index) => (
                <div
                  key={index}
                  className="border border-[#DBD9D5] rounded-[7px] p-6"
                >
                  <h2 className="leading-none tracking-[-0.41px] font-Gloock mb-[14px] lg:text-[32px] lg:leading-none lg:mb-5">
                    {item.bcms.meta.en?.title}
                  </h2>
                  <ContentManager
                    items={item.bcms.content.en || []}
                    className="text-sm leading-normal tracking-[-0.41px] text-appGray-200 lg:text-lg lg:leading-normal"
                  />
                </div>
              ))}
            </div>
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

    page: bcmsLegalPage {
      ...LegalPage
    }

    entries: allBcmsLegalPage {
      nodes {
        bcms {
          meta {
            en {
              title
              slug
            }
          }
          content {
            en {
              value
              type
              name
            }
          }
        }
      }
    }
  }
`;

export default LegalPage;
