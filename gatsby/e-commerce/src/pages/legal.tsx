import { PageData } from '@/types';
import { LegalEntry } from '@/bcms/types';
import React from 'react';
import { PageWrapper } from '@/src/components/PageWrapper';
import { ContentManager } from '@/src/components/ContentManager';
import { graphql } from 'gatsby';

interface LegalPageProps {
  data: PageData<any> & {
    entries: {
      nodes: Array<{
        bcms: LegalEntry;
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
      <h1 className="sr-only">Legal page</h1>
      <div className="pt-2 pb-14 md:pb-20 lg:pb-[136px]">
        <div className="container">
          <div className="grid grid-cols-1 gap-6">
            {data.entries.nodes.map((item, index) => (
              <div key={index} className="border border-[#DBD9D5] p-6">
                <h2 className="text-[24px] leading-none tracking-[-1.4px] text-appGray-900 mb-5 md:text-[32px]">
                  {item.bcms?.meta?.en?.title}
                </h2>
                <ContentManager
                  items={item.bcms.content.en as any}
                  className="grid grid-cols-1 gap-4 leading-[1.5] tracking-[-4%] text-appGray-500 md:text-lg"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default LegalPage;

export const query = graphql`
  {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }
    page: bcmsLegal {
      ...LegalPage
    }
    entries: allBcmsLegal {
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
