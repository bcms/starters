/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useEffect, useRef, MouseEvent, useState } from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames';
import PauseIcon from '../../../src/assets/icons/pause.inline.svg';
import PlayIcon from '../../../src/assets/icons/play.inline.svg';
import { EpisodeEntryMetaItem } from '../../../bcms/types/ts';
import { ClientConfig } from '@thebcms/client';
import { usePlayer } from '../../context/PlayerContext';
import { BCMSImage } from '@thebcms/components-react';
import { dateUtil } from '../../utils/date';
import { audioUtil } from '../../utils/audio';

interface EpisodeItemProps {
    item: EpisodeEntryMetaItem;
    index: number;
    className?: string;
    bcms: ClientConfig;
}

export const EpisodesItem: React.FC<EpisodeItemProps> = ({
    item,
    index,
    className,
    bcms,
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
        const audio = audioUtil.createAudio(bcms, item.media_file);
        audio.preload = 'metadata';
        audio.addEventListener('loadedmetadata', () => {
            audioDOM.current = audio;
            const { durationInMinutes, durationInSeconds } =
                getFileLength(audio);
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

    return (
        <Link
            to={`/episode/${item.slug}`}
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
                media={item.cover_image}
                clientConfig={bcms}
                className="w-6 h-6 rounded object-cover overflow-hidden lg:w-16 lg:h-16"
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
                    {item.guest.meta.en?.title || 'N / A'}
                </div>
            </div>
            <div className="text-right">
                <div>
                    <div className="text-sm leading-none font-medium tracking-[-0.8px] mb-1.5 lg:text-xl lg:leading-none lg:mb-2.5">
                        {fileLength}
                    </div>
                    <div className="text-xs leading-none font-medium tracking-[-0.8px] text-appGray-400 lg:text-xl lg:leading-none">
                        {dateUtil.format(item.date.timestamp)}
                    </div>
                </div>
            </div>
        </Link>
    );
};
