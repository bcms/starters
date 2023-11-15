import React from 'react';
import { PageData } from '@/types';
import { PageWrapper } from '@/src/components/PageWrapper';
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
const LegalPage: React.FC<LegalPageProps> = ({
  data: { header, page, footer, entries },
}) => {
  const updatedDate = (val: number) => {
    const date = new Date(val);

    const day = date.getDate();
    const month = date.toLocaleString('default', {
      month: 'long',
    });
    const year = date.getFullYear();

    return `${day} ${month} ${year}`;
  };
  return (
    <PageWrapper
      defaultTitle="Legal"
      header={header}
      page={page}
      footer={footer}
    >
      <div className="pt-24 pb-10 lg:pt-[104px] lg:pb-20 xl:pb-[120px]">
        <div className="container">
          <div className="grid grid-cols-1 gap-6 lg:gap-12">
            {entries.nodes.map((item, index) => (
              <div
                key={index}
                className="border border-[#E6E6E6] rounded-[10px] px-4 py-6 lg:rounded-2xl lg:px-8 lg:py-10"
              >
                <h2 className="leading-none font-semibold tracking-[-0.41px] text-appGray-700 mb-2 lg:text-[40px] lg:leading-none lg:mb-5">
                  {item.bcms.meta.en?.title}
                </h2>
                <div className="text-xs leading-none font-medium tracking-[-0.41px] text-appGray-600 mb-4 lg:text-base lg:leading-none lg:mb-6">
                  Last updated: {updatedDate(item.bcms.updatedAt)}
                </div>
                <ContentManager
                  items={item.bcms.content.en || []}
                  className="text-sm leading-normal font-medium tracking-[-0.41px] text-appGray-500 lg:text-base lg:leading-normal"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
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
