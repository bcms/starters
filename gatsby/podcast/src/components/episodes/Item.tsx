import React, { useEffect, useRef, MouseEvent, useState } from 'react';
import { Link } from 'gatsby';
import { BCMSImage } from 'gatsby-source-bcms/components';
import { bcmsMediaToUrl } from '@becomes/cms-most/frontend';
import { EpisodeEntryMeta, GuestEntryMeta } from '@/bcms/types';
import classnames from 'classnames';
import { dateUtil } from '@/utils/date';
import { usePlayer } from '@/src/context/PlayerContext';
import { ReactComponent as PauseIcon } from '@/src/assets/icons/pause.svg';
import { ReactComponent as PlayIcon } from '@/src/assets/icons/play.svg';
import { toLite } from '@/utils/toLite';

interface EpisodeItemProps {
  item: EpisodeEntryMeta;
  index: number;
  className?: string;
}

export const EpisodesItem: React.FC<EpisodeItemProps> = ({
  item,
  index,
  className,
}) => {
  const {
    episode,
    episodeDOM,
    setEpisode,
    setEpisodeDOM,
    settings,
    updateSettings,
    getFileLength,
  } = usePlayer();

  const audioDOM = useRef<HTMLAudioElement | null>(null);
  const [fileLength, setFileLength] = useState<string>('...');

  const handlePlayPause = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    if (!episode) {
      setEpisode(item);
      if (audioDOM) {
        setEpisodeDOM(audioDOM.current as HTMLAudioElement);
      }
    } else {
      if (episode.slug === item.slug) {
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
        setEpisode(item);
      }
    }
  };

  useEffect(() => {
    if (!episode || episode.slug !== item.slug) {
      updateSettings({ playing: true });
    }
  }, [episodeDOM]);

  useEffect(() => {
    const audio = new Audio(bcmsMediaToUrl(item.file));
    audio.preload = 'metadata';
    audio.src = `/api/bcms-media/${item.file.src}`;
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
  }, [item, episode]);

  const renderPlayButton: boolean = episode
    ? (episode.slug === item.slug && !settings.playing) ||
      episode.slug !== item.slug
    : true;

  const renderPauseButton: boolean = episode
    ? episode.slug === item.slug && settings.playing
    : false;

  const renderIndex: boolean = !episode || episode.slug !== item.slug;

  const guest = toLite<
    GuestEntryMeta,
    { guest: { meta: { en: GuestEntryMeta } } }
  >(item?.guest as any);

  return (
    <Link to={`/episode/${item.slug}`}>
      <a
        className={classnames(
          'group grid grid-cols-[16px,24px,1fr,70px] gap-[5px] items-center px-[14px] py-2.5 text-left lg:grid-cols-[32px,64px,1fr,125px] lg:gap-4 lg:px-5 lg:py-6',
          className,
        )}
      >
        <button
          className="flex items-center justify-center"
          onClick={(e) => handlePlayPause(e)}
        >
          {renderIndex && (
            <span className="text-xs leading-none font-medium tracking-[-0.8px] group-hover:hidden lg:text-xl lg:leading-none">
              {index}
            </span>
          )}

          {renderPlayButton && (
            <PlayIcon
              className={classnames(
                'w-4 text-appAccent group-hover:inline-block lg:w-8',
                {
                  hidden: !episode || episode.slug !== item.slug,
                },
              )}
            />
          )}
          {renderPauseButton && (
            <PauseIcon className="w-4 text-appAccent lg:w-8" />
          )}
        </button>
        <BCMSImage
          media={item.cover}
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
          className="w-6 h-6 rounded cover overflow-hidden lg:w-16 lg:h-16"
        />
        <div className="max-lg:pl-2.5">
          <div
            className={
              'text-sm leading-none font-medium tracking-[-0.8px] mb-1.5 line-clamp-1 lg:text-2xl lg:leading-none lg:mb-2.5'
            }
          >
            {item.title}
          </div>
          <div className="text-xs leading-none tracking-[-0.8px] text-appGray-400 lg:text-xl lg:leading-none">
            {guest?.title || 'N / A'}
          </div>
        </div>
        <div className="text-right">
          <div>
            <div className="text-sm leading-none font-medium tracking-[-0.8px] mb-1.5 lg:text-xl lg:leading-none lg:mb-2.5">
              {fileLength}
            </div>
            <div className="text-xs leading-none font-medium tracking-[-0.8px] text-appGray-400 lg:text-xl lg:leading-none">
              {dateUtil.format(item.date)}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};
