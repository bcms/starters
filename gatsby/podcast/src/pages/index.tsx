import React, { useEffect, useMemo } from 'react';
import { graphql } from 'gatsby';
import { HomePageData, PageData } from '@/types';
import { EpisodeEntry, EpisodeEntryMeta } from '@/bcms/types';
import { PageWrapper } from '@/src/components/PageWrapper';
import { HomePageEpisodes } from '@/src/components/home-page/Episodes';
import { HomePageHero } from '@/src/components/home-page/Hero';
import { useEpisodes } from '@/src/context/EpisodeContext';
interface HomepageIndexProps {
  data: PageData<HomePageData> & {
    episodes: {
      nodes: Array<{
        bcms: EpisodeEntry;
      }>;
    };
  };
}
const HomeIndexPage: React.FC<HomepageIndexProps> = ({ data }) => {
  const { setEpisodes } = useEpisodes();

  const episodes = useMemo<EpisodeEntryMeta[]>(() => {
    return data.episodes.nodes.map(
      (episode) => episode.bcms.meta.en,
    ) as unknown as EpisodeEntryMeta[];
  }, [data.episodes]);

  useEffect(() => {
    setEpisodes(episodes);
  }, [episodes]);
  return (
    <PageWrapper page={data.page} header={data.header} footer={data.footer}>
      <HomePageHero
        data={data.page.bcms.meta.en.hero}
        episodes={episodes?.slice(0, 3)}
      />
      <HomePageEpisodes
        data={data.page.bcms.meta.en.episodes}
        episodes={episodes}
      />
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
    page: bcmsHomePage {
      ...HomePage
    }

    episodes: allBcmsEpisode {
      nodes {
        bcms {
          meta {
            en {
              title
              slug
              seo {
                title
                description
              }
              file {
                _id
                caption
                alt_text
                height
                name
                src
                svg
                width
              }
              cover {
                _id
                caption
                alt_text
                height
                name
                src
                svg
                width
              }
              description {
                type
                name
                value
              }
              date
              tags
              guest {
                guest {
                  meta {
                    en {
                      title
                      slug
                      avatar {
                        _id
                        caption
                        alt_text
                        height
                        name
                        src
                        svg
                        width
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`;
export default HomeIndexPage;
