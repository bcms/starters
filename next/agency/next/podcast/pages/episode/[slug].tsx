import { PageWrapper } from '@/components/PageWrapper';
import { EpisodePageData, PageProps } from '@/types';
import PlayIcon from '@/assets/icons/play.svg';
import PauseIcon from '@/assets/icons/pause.svg';
import { BCMSImage } from 'next-plugin-bcms/components';
import ContentManager from '@/components/ContentManager';
import { usePlayer } from '@/context/PlayerContext';
import { MouseEvent, useEffect, useRef, useState } from 'react';
import { bcmsMediaToUrl } from '@becomes/cms-most/frontend';
import { GetStaticPaths, GetStaticProps } from 'next';
import { getBcmsClient } from 'next-plugin-bcms';
import { EpisodeEntry, EpisodeEntryMeta } from '@/bcms/types';
import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { getHeaderAndFooter } from '@/utils/page-props';
const EpisodePage: React.FC<PageProps<EpisodePageData>> = ({
  header,
  page,
  footer,
}) => {
  const {
    episode,
    setEpisode,
    setEpisodeDOM,
    getFileLength,
    settings,
    episodeDOM,
    updateSettings,
  } = usePlayer();

  const audioDOM = useRef<HTMLAudioElement | null>(null);
  const [fileLength, setFileLength] = useState<string>('...');

  const handlePlayPause = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!episode && page?.meta) {
      setEpisode(page.meta);
      if (audioDOM.current) {
        setEpisodeDOM(audioDOM.current as HTMLAudioElement);
      }
      updateSettings({ playing: true });
    } else if (episode && page?.meta) {
      if (episode?.slug === page.meta.slug) {
        updateSettings({
          playing: !settings.playing,
        });
      } else {
        if (episodeDOM) {
          updateSettings({
            playing: false,
          });
          setEpisodeDOM(audioDOM.current as HTMLAudioElement);
        }
        setEpisode(page.meta);
      }
    }
  };

  useEffect(() => {
    updateSettings({ playing: true });
  }, [episodeDOM]);

  useEffect(() => {
    const audio = new Audio(bcmsMediaToUrl(page.meta.file));
    audio.preload = 'metadata';
    audio.addEventListener('loadedmetadata', () => {
      audioDOM.current = audio;
      const { durationInMinutes, durationInSeconds } = getFileLength(audio);

      setFileLength(
        `${durationInMinutes.toString().padStart(2, '0')}:${(
          durationInSeconds % 60
        )
          .toFixed(0)
          .padStart(2, '0')}`,
      );
    });
  }, [page?.meta, episode]);

  const renderPlayButton: boolean = episode
    ? (episode.slug === page.meta.slug && !settings.playing) ||
      episode.slug !== page.meta.slug
    : true;

  const renderPauseButton: boolean = episode
    ? episode.slug === page.meta.slug && settings.playing
    : false;
  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <h1 className="sr-only">{page.meta.title}</h1>
      <div className="container relative z-10 pt-20 pb-10 lg:pt-[104px] lg:pb-[128px]">
        <div className="relative aspect-square rounded overflow-hidden mb-5 md:aspect-[2.47] lg:rounded-2xl lg:mb-10">
          <div className="absolute z-10 bottom-10 left-10 text-[56px] leading-none tracking-[-2.41px] font-medium max-lg:hidden">
            {page.meta.title}
          </div>
          <div className="absolute z-10 bottom-6 right-6 leading-none tracking-[-0.8px] font-medium lg:hidden">
            {fileLength}
          </div>
          <button className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 bg-appText rounded-full lg:hidden">
            <PlayIcon className="w-8 h-8 text-appBody" />
          </button>
          <BCMSImage
            key={page.meta.slug}
            media={page.meta.cover}
            options={{
              sizes: {
                exec: [
                  {
                    width: 654,
                    height: 654,
                  },
                  {
                    width: 768,
                    height: 291,
                  },
                  {
                    width: 1344,
                    height: 544,
                  },
                ],
              },
            }}
            className="absolute top-0 left-0 w-full h-full cover rounded overflow-hidden lg:rounded-2xl"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-black/40 lg:bg-black/60" />
        </div>
        <div>
          <div className="mb-4 lg:hidden">
            <div className="leading-none font-medium tracking-[-0.8px] mb-2.5">
              {page.meta.title}
            </div>
            <div className="text-sm leading-none tracking-[-0.8px] text-appGray-400">
              {page.meta.guest?.meta?.en?.title || 'N / A'}
            </div>
          </div>
          <div className="flex items-center justify-between mb-8 lg:mb-14">
            <div className="flex items-center">
              <button
                className="flex items-center justify-center w-12 h-12 bg-appText rounded-full mr-4 max-lg:hidden"
                onClick={handlePlayPause}
              >
                {renderPlayButton && (
                  <PlayIcon className="w-8 h-8 text-appBody" />
                )}
                {renderPauseButton && (
                  <PauseIcon className="w-8 h-8 text-appBody" />
                )}
              </button>
              <div className="flex flex-wrap gap-2.5">
                {page.meta.tags.map((tag, index) => (
                  <div
                    key={index}
                    className="px-[14px] py-[9px] border border-appGray-700 rounded-[32px] text-sm leading-none tracking-[-0.41px] text-appGray-100 lg:px-6 lg:py-[15px] lg:text-2xl lg:leading-none"
                  >
                    {tag}
                  </div>
                ))}
              </div>
            </div>
            <div className="text-2xl leading-none font-Inter tracking-[-0.8px] text-white max-lg:hidden">
              {fileLength}
            </div>
          </div>
          <ContentManager
            item={page.meta.description}
            className="episodePage--description max-w-[672px] mb-8 lg:mb-12"
          />
          <div>
            <div className="text-sm leading-none font-medium tracking-[-0.8px] mb-3 lg:text-[32px] lg:leading-none lg:mb-5">
              Guest
            </div>
            <div className="flex items-center">
              {page.meta.guest?.meta?.en && (
                <BCMSImage
                  media={page.meta.guest.meta.en.avatar}
                  options={{
                    sizes: {
                      exec: [
                        {
                          width: 128,
                          height: 128,
                        },
                      ],
                    },
                  }}
                  className="w-10 h-10 cover rounded-full overflow-hidden mr-[14px] lg:w-16 lg:h-16 lg:mr-4"
                />
              )}

              <div className="text-xs leading-none font-medium tracking-[-0.8px] text-appGray-200 lg:text-2xl lg:leading-none">
                {page.meta.guest?.meta?.en?.title || 'N / A'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

interface ParamsI extends NextParsedUrlQuery {
  slug: string;
}

export const getStaticPaths: GetStaticPaths<ParamsI> = async () => {
  const client = getBcmsClient();
  const episodes = (await client.entry.getAll({
    template: 'episode',
  })) as EpisodeEntry[];
  const paths = episodes.map((episode) => {
    const meta = episode.meta.en as EpisodeEntryMeta;
    return {
      params: {
        slug: meta.slug,
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<
  PageProps<EpisodePageData>
> = async ({ params }) => {
  try {
    const client = getBcmsClient();
    const { header, footer } = await getHeaderAndFooter(client);
    const homePage = (await client.entry.get({
      // Template name or ID
      template: 'episode',
      // Entry slug or ID
      entry: params?.slug as string,
    })) as EpisodeEntry;
    if (!homePage) {
      throw new Error('Episode entry does not exist.');
    }
    return {
      props: {
        header,
        footer,
        page: {
          meta: homePage.meta.en as EpisodeEntryMeta,
        },
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
export default EpisodePage;
