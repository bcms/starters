/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { PageWrapper } from '@/src/components/PageWrapper';
import { EpisodePageData, PageData } from '@/types';
// @ts-ignore
import { ReactComponent as PlayIcon } from '@/src/assets/icons/play.svg';
// @ts-ignore
import { ReactComponent as PauseIcon } from '@/src/assets/icons/pause.svg';
import { BCMSImage } from 'gatsby-source-bcms/components';
import { ContentManager } from '@/src/components/ContentManager';
import { usePlayer } from '@/src/context/PlayerContext';
import { bcmsMediaToUrl } from '@becomes/cms-most/frontend';
import { graphql } from 'gatsby';
import { toLite } from '@/utils/toLite';
import { GuestEntryMeta } from '@/bcms/types';

interface EpisodePageProps {
  data: PageData<EpisodePageData>;
}
const EpisodePage: React.FC<EpisodePageProps> = ({
  data: { header, page, footer },
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

  const guest = toLite<
    GuestEntryMeta,
    { guest: { meta: { en: GuestEntryMeta } } }
  >(page.bcms.meta.en.guest as any);

  const handlePlayPause = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!episode && page?.bcms?.meta?.en) {
      setEpisode(page.bcms.meta.en);
      if (audioDOM.current) {
        setEpisodeDOM(audioDOM.current as HTMLAudioElement);
      }
      updateSettings({ playing: true });
    } else if (episode && page?.bcms.meta) {
      if (episode?.slug === page.bcms.meta.en.slug) {
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
        setEpisode(page.bcms.meta.en);
      }
    }
  };

  useEffect(() => {
    updateSettings({ playing: true });
  }, [episodeDOM]);

  useEffect(() => {
    const audio = new Audio(bcmsMediaToUrl(page.bcms.meta.en.file));
    audio.preload = 'metadata';
    audio.src = `/api/bcms-media/${page.bcms.meta.en.file.src}`;
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
  }, [page?.bcms.meta, episode]);

  const renderPlayButton: boolean = episode
    ? (episode.slug === page.bcms.meta.en.slug && !settings.playing) ||
      episode.slug !== page.bcms.meta.en.slug
    : true;

  const renderPauseButton: boolean = episode
    ? episode.slug === page.bcms.meta.en.slug && settings.playing
    : false;
  return (
    <PageWrapper page={page} header={header} footer={footer}>
      <h1 className="sr-only">{page.bcms.meta.en.title}</h1>
      <div className="container relative z-10 pt-20 pb-10 lg:pt-[104px] lg:pb-[128px]">
        <div className="relative aspect-square rounded overflow-hidden mb-5 md:aspect-[2.47] lg:rounded-2xl lg:mb-10">
          <div className="absolute z-10 bottom-10 left-10 text-[56px] leading-none tracking-[-2.41px] font-medium max-lg:hidden">
            {page.bcms.meta.en.title}
          </div>
          <div className="absolute z-10 bottom-6 right-6 leading-none tracking-[-0.8px] font-medium lg:hidden">
            {fileLength}
          </div>
          <button className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 bg-appText rounded-full lg:hidden">
            <PlayIcon className="w-8 h-8 text-appBody" />
          </button>
          <BCMSImage
            key={page.bcms.meta.en.slug}
            media={page.bcms.meta.en.cover}
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
              {page.bcms.meta.en.title}
            </div>
            <div className="text-sm leading-none tracking-[-0.8px] text-appGray-400">
              {page.bcms.meta.en.guest?.meta?.en?.title || 'N / A'}
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
                {page.bcms.meta.en.tags.map((tag, index) => (
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
            items={page.bcms.meta.en.description}
            className="episodePage--description max-w-[672px] mb-8 lg:mb-12"
          />
          <div>
            <div className="text-sm leading-none font-medium tracking-[-0.8px] mb-3 lg:text-[32px] lg:leading-none lg:mb-5">
              Guest
            </div>
            <div className="flex items-center">
              {guest && (
                <BCMSImage
                  media={guest.avatar}
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
                {guest?.title || 'N / A'}
              </div>
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export const query = graphql`
  query ($id: String!) {
    header: bcmsHeader {
      ...Header
    }
    footer: bcmsFooter {
      ...Footer
    }
    page: bcmsEpisode(bcms: { _id: { eq: $id } }) {
      bcms {
        content {
          en {
            type
            name
            value
          }
        }
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
`;

export default EpisodePage;
