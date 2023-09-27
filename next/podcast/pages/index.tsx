import { HomePageData, PageProps } from '@/types';
import { getBcmsClient } from 'next-plugin-bcms';
import { GetStaticProps } from 'next';
import { getHeaderAndFooter } from '@/utils/page-props';
import {
  EpisodeEntry,
  EpisodeEntryMeta,
  HomePageEntry,
  HomePageEntryMeta,
} from '@/bcms/types';
import { PageWrapper } from '@/components/PageWrapper';
import React, { useEffect } from 'react';
import { useEpisodes } from '@/context/EpisodeContext';
import HomePageHero from '@/components/home-page/Hero';
import HomePageEpisodes from '@/components/home-page/Episodes';
interface ExtendedProps extends PageProps<HomePageData> {
  episodes: EpisodeEntryMeta[];
}
const Homepage: React.FC<ExtendedProps> = ({
  header,
  page,
  footer,
  episodes,
}) => {
  const { setEpisodes } = useEpisodes();

  useEffect(() => {
    setEpisodes(episodes);
  }, [episodes]);

  return (
    <PageWrapper footer={footer} page={page} header={header}>
      <HomePageHero data={page.meta.hero} episodes={episodes?.slice(0, 3)} />
      <HomePageEpisodes data={page.meta.episodes} episodes={episodes} />
    </PageWrapper>
  );
};

export const getStaticProps: GetStaticProps<ExtendedProps> = async () => {
  const client = getBcmsClient();
  const { header, footer } = await getHeaderAndFooter(client);

  try {
    // Get Home Page entry
    const homePage = (await client.entry.get({
      // Template name or ID
      template: 'home_page',
      // Entry slug or ID
      entry: 'home',
    })) as HomePageEntry;

    const episodeItems = (await client.entry.getAll({
      template: 'episode',
    })) as EpisodeEntry[];

    const items = episodeItems
      ? episodeItems.map((e) => e.meta.en as EpisodeEntryMeta)
      : [];

    if (!homePage) {
      throw new Error('Home page entry does not exist.');
    }

    return {
      props: {
        header,
        footer,
        page: {
          meta: homePage.meta.en as HomePageEntryMeta,
        },
        episodes: items,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
export default Homepage;
