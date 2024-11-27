'use client';

import React, { MouseEvent, useEffect, useRef, useState } from 'react';
import { BCMSImage } from '@thebcms/components-react';
import { ClientConfig } from '@thebcms/client';
import { usePlayer } from '@/context/PlayerContext';
import PauseIcon from '@/assets/icons/pause.svg';
import PlayIcon from '@/assets/icons/play.svg';
import { EpisodeEntryMetaItem } from '@bcms-types/types/ts';
import { audioUtil } from '@/utils/audio';
import ContentManager from '@/components/ContentManager';

interface Props {
    meta: EpisodeEntryMetaItem;
    bcms: ClientConfig;
}

const Content: React.FC<Props> = ({ meta, bcms }) => {
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
        if (!episode && meta) {
            setEpisode(meta);
            if (audioDOM.current) {
                setEpisodeDOM(audioDOM.current as HTMLAudioElement);
            }
            updateSettings({ playing: true });
        } else if (episode && meta) {
            if (episode?.slug === meta.slug) {
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
                setEpisode(meta);
            }
        }
    };

    useEffect(() => {
        updateSettings({ playing: true });
    }, [episodeDOM]);

    useEffect(() => {
        const audio = audioUtil.createAudio(bcms, meta.media_file);
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
    }, [meta, episode]);

    return (
        <div>
            <h1 className="sr-only">{meta.title}</h1>
            <div className="container relative z-10 pt-20 pb-10 lg:pt-[104px] lg:pb-[128px]">
                <div className="relative aspect-square rounded overflow-hidden mb-5 md:aspect-[2.47] lg:rounded-2xl lg:mb-10">
                    <div className="absolute z-10 bottom-10 left-10 text-[56px] leading-none tracking-[-2.41px] font-medium max-lg:hidden">
                        {meta.title}
                    </div>
                    <div className="absolute z-10 bottom-6 right-6 leading-none tracking-[-0.8px] font-medium lg:hidden">
                        {fileLength}
                    </div>
                    <button className="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 bg-appText rounded-full lg:hidden">
                        <PlayIcon className="w-8 h-8 text-appBody" />
                    </button>
                    <BCMSImage
                        media={meta.cover_image}
                        clientConfig={bcms}
                        className="absolute top-0 left-0 w-full h-full object-cover rounded overflow-hidden lg:rounded-2xl"
                    />
                    <div className="absolute top-0 left-0 w-full h-full bg-black/40 lg:bg-black/60" />
                </div>
                <div>
                    <div className="mb-4 lg:hidden">
                        <div className="leading-none font-medium tracking-[-0.8px] mb-2.5">
                            {meta.title}
                        </div>
                        <div className="text-sm leading-none tracking-[-0.8px] text-appGray-400">
                            {meta.guest?.meta?.en?.title || 'N / A'}
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-8 lg:mb-14">
                        <div className="flex items-center">
                            <button
                                className="flex items-center justify-center w-12 h-12 bg-appText rounded-full mr-4 max-lg:hidden"
                                onClick={handlePlayPause}
                            >
                                {(episode
                                    ? (episode.slug === meta.slug) ===
                                          !settings.playing ||
                                      episode.slug !== meta.slug
                                    : true) && (
                                    <PlayIcon className="w-8 h-8 text-appBody" />
                                )}
                                {(episode
                                    ? episode.slug === meta.slug &&
                                      settings.playing
                                    : false) && (
                                    <PauseIcon className="w-8 h-8 text-appBody" />
                                )}
                            </button>
                            <div className="flex flex-wrap gap-2.5">
                                {meta.tags.map((tag, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="px-[14px] py-[9px] border border-appGray-700 rounded-[32px] text-sm leading-none tracking-[-0.41px] text-appGray-100 lg:px-6 lg:py-[15px] lg:text-2xl lg:leading-none"
                                        >
                                            {tag}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <div className="text-2xl leading-none font-Inter tracking-[-0.8px] text-white max-lg:hidden">
                            {fileLength}
                        </div>
                    </div>
                    <ContentManager
                        items={meta.description.nodes}
                        className="episodePage--description max-w-[672px] mb-8 lg:mb-12"
                    />
                    <div>
                        <div className="text-sm leading-none font-medium tracking-[-0.8px] mb-3 lg:text-[32px] lg:leading-none lg:mb-5">
                            Guest
                        </div>
                        <div className="flex items-center">
                            {meta.guest.meta.en && (
                                <BCMSImage
                                    media={meta.guest.meta.en.avatar_image}
                                    clientConfig={bcms}
                                    className="w-10 h-10 object-cover rounded-full overflow-hidden mr-[14px] lg:w-16 lg:h-16 lg:mr-4"
                                />
                            )}
                            <div className="text-xs leading-none font-medium tracking-[-0.8px] text-appGray-200 lg:text-2xl lg:leading-none">
                                {meta.guest?.meta?.en?.title || 'N / A'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Content;
