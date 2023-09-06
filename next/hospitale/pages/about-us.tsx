import React from 'react';
import { AboutPageData, PageProps } from '@/types';
import {
  AboutPageEntry,
  AboutPageEntryMeta,
  TeamMemberEntry,
  TeamMemberEntryMeta,
} from '@/bcms/types';
import { getHeaderAndFooter } from '@/utils/page-data';
import { BCMSImage } from 'next-plugin-bcms/components';
import ContentManager from '@/components/ContentManager';
import AboutPageTeam from '@/components/about-page/Team';
import { PageWrapper } from '@/components/PageWrapper';

import classnames from 'classnames';
import { GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';

const AboutUsPage: React.FC<PageProps<AboutPageData>> = ({
  header,
  page,
  footer,
}) => {
  const meta = page.meta;

  return (
    <PageWrapper header={header} footer={footer} page={page}>
      <div className="pt-8 pb-14 md:pb-20 lg:pt-0 lg:pb-[120px]">
        <BCMSImage
          media={meta?.cover}
          className={classnames(
            'w-full aspect-[2.76] cover object-top mb-8 md:mb-20 lg:aspect-[3.1] lg:mb-[120px]',
          )}
        />
        <div className="container">
          <h1 className="text-2xl leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] text-center mb-6 lg:text-5xl lg:leading-none lg:mb-16">
            {meta?.title}
          </h1>
          <div
            className={classnames(
              'aboutUs--content text-center',
              'mb-12 md:mb-20 lg:mb-[120px]',
            )}
          >
            {meta?.content.map((item, index) => (
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
                  <span
                    key={index}
                    style={{
                      backgroundImage: `url(/api/bcms-media${item.image.src})`,
                    }}
                    className={classnames(
                      'image w-[37px] h-4 flex-shrink-0 mx-1 translate-y-0.5 bg-center bg-cover',
                      'lg:w-[112px] lg:h-12 lg:mx-3 lg:translate-y-3',
                    )}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
        <AboutPageTeam data={meta?.team} members={page.team} />
      </div>
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<
  PageProps<AboutPageData>
> = async () => {
  try {
    const client = getBcmsClient();

    const { header, footer } = await getHeaderAndFooter(client);

    const aboutPage = (await client.entry.get({
      template: 'about_page',
      entry: 'about-us',
    })) as AboutPageEntry;

    if (!aboutPage) {
      throw new Error('About page entry does not exist.');
    }
    const teamMembers = (await client.entry.getAll({
      template: 'team_member',
    })) as TeamMemberEntry[];

    return {
      props: {
        header,
        footer,
        page: {
          meta: aboutPage.meta.en as AboutPageEntryMeta,
          team: teamMembers.map(
            (teamMember) => teamMember.meta.en as TeamMemberEntryMeta,
          ),
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
export default AboutUsPage;
