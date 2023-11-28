import React from 'react';
import {
  AboutPageEntryMeta,
  AboutTeamGroup,
  FooterEntryMeta,
  HeaderEntryMeta,
  TeamMemberEntry,
} from '../../bcms/types';
import { BCMSImage } from 'gatsby-source-bcms/components';
import ContentManager from '@/components/ContentManager';
import AboutPageTeam from '@/components/about-page/Team';
import { PageWrapper } from '@/components/PageWrapper';

import classnames from 'classnames';
import {
  BCMSPropMediaDataParsed,
  BCMSPropRichTextDataParsed,
} from '@becomes/cms-client/types';
import { graphql } from 'gatsby';

const AboutUsPage: React.FC<{
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
          en: AboutPageEntryMeta;
        };
        content: {
          en: BCMSPropRichTextDataParsed;
        };
      };
    };
    team: {
      nodes: Array<{
        bcms: TeamMemberEntry;
      }>;
    };
  };
}> = ({ data }) => {
  const meta = data.page.bcms.meta;
  console.log("about", data.page.bcms?.content.en)
  return (
    <PageWrapper
      header={data.header}
      footer={data.footer}
      page={data.page}
      location="/about-us"
    >
      <div className="pt-8 pb-14 md:pb-20 lg:pt-0 lg:pb-[120px]">
        <BCMSImage
          media={meta?.en?.cover as BCMSPropMediaDataParsed}
          className={classnames(
            'w-full aspect-[2.76] cover object-top mb-8 md:mb-20 lg:aspect-[3.1] lg:mb-[120px]',
          )}
        />
        <div className="container">
          <h1 className="text-2xl leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] text-center mb-6 lg:text-5xl lg:leading-none lg:mb-16">
            {meta.en?.title}
          </h1>
          <div
            className={classnames(
              'aboutUs--content text-center',
              'mb-12 md:mb-20 lg:mb-[120px]',
            )}
          >
            {meta.en?.content.map((item: any, index: number) => (
              <div key={index}>
                {item.text && item.text.length > 0 && (
                  <ContentManager
                    item={item.text}
                    className={classnames(
                      'leading-normal font-medium tracking-[-0.41px] text-appGray-600',
                      'lg:text-[32px] lg:leading-normal',
                    )}
                  />
                )}
                {item.image && (
                  <BCMSImage
                    key={index}
                    media={item.image}
                    options={{
                      sizes: {
                        exec: [
                          {
                            width: 112,
                            height: 48,
                          },
                          {
                            width: 224,
                            height: 96,
                          },
                        ],
                      },
                    }}
                    className={classnames(
                      'image cover w-[37px] h-4 flex-shrink-0 mx-1 translate-y-0.5 bg-center bg-cover',
                      'lg:w-[112px] lg:h-12 lg:mx-3 lg:translate-y-3',
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <AboutPageTeam
          data={meta.en?.team as AboutTeamGroup}
          members={data.team.nodes}
        />
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
    page: bcmsAboutPage {
      ...AboutPage
    }
    team: allBcmsTeamMember {
      nodes {
        ...TeamMember
      }
    }
  }
`;

export default AboutUsPage;
