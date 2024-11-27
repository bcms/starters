'use client';

import React, { useState, useEffect, ChangeEvent } from 'react';
import VolumeIcon from '@/assets/icons/volume.svg';
import ForwardIcon from '@/assets/icons/forward.svg';
import BackwardIcon from '@/assets/icons/backward.svg';
import PauseIcon from '@/assets/icons/pause.svg';
import PlayIcon from '@/assets/icons/play.svg';
import { usePlayer } from '../../context/PlayerContext';
import { BCMSImage } from '@thebcms/components-react';
import { useEpisodes } from '../../context/EpisodeContext';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const PlayingEpisode = () => {
    const {
        episode,
        settings,
        updateSettings,
        getPlayingEpisodeFileLength,
        getCurrentPlayTime,
        getEpisodeProgressBarWidth,
        handlePrevEpisode,
        handleNextEpisode,
        handleRewind,
    } = usePlayer();

    const { bcms } = useEpisodes();

    const pathname = usePathname();
    const [fileLength, setFileLength] = useState('...');
    const volumeWidth = `${settings.volume * 100}%`;

    const handleVolumeChange = (event: ChangeEvent<HTMLInputElement>) => {
        const target = event.target;
        updateSettings({
            volume: +target.value,
        });
    };

    useEffect(() => {
        const { durationInMinutes, durationInSeconds } =
            getPlayingEpisodeFileLength();
        setFileLength(
            `${String(durationInMinutes).padStart(2, '0')}:${(
                durationInSeconds % 60
            )
                .toFixed(0)
                .padStart(2, '0')}`,
        );
    }, [episode]);

    if (!episode) {
        return <></>;
    }
    return (
        pathname !== 'now-playing' && (
            <div className="fixed z-50 bottom-0 left-0 w-full bg-[#1F1F1F] py-2 lg:bg-appBody lg:border-t lg:border-appGray-600 lg:py-6">
                <div className="container">
                    <div className="flex items-center justify-between xl:gap-10">
                        <Link
                            className="flex items-center lg:flex-1"
                            href="/now-playing"
                        >
                            {episode && (
                                <BCMSImage
                                    media={episode?.cover_image}
                                    clientConfig={bcms}
                                    className="w-8 h-8 rounded object-cover overflow-hidden mr-2.5 lg:w-14 lg:h-14 lg:mr-4"
                                />
                            )}
                            <div>
                                <div className="text-sm leading-none font-medium tracking-[-0.8px] mb-1.5 line-clamp-1 lg:text-lg lg:leading-none lg:mb-2.5">
                                    {episode?.title ?? ''}
                                </div>
                                <div className="text-xs leading-none tracking-[-0.8px] text-appGray-400 lg:text-base lg:leading-none">
                                    {episode.guest.meta.en?.title ?? 'N / A'}
                                </div>
                            </div>
                        </Link>
                        <div className="flex flex-col items-center justify-center flex-1 max-lg:hidden">
                            <div className="flex items-center space-x-7 mb-2">
                                <button
                                    className="text-xl leading-none tracking-[-0.8px] text-appGray-400 min-w-max max-xl:hidden"
                                    onClick={handlePrevEpisode}
                                >
                                    Previous episode
                                </button>
                                <button
                                    className="flex"
                                    onClick={handlePrevEpisode}
                                >
                                    <BackwardIcon className="w-6 h-6" />
                                </button>
                                <button
                                    className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-white rounded-full"
                                    onClick={() =>
                                        updateSettings({
                                            playing: !settings.playing,
                                        })
                                    }
                                >
                                    {settings.playing ? (
                                        <PauseIcon className="text-appAccent w-6 h-6" />
                                    ) : (
                                        <PlayIcon className="text-appAccent w-6 h-6" />
                                    )}
                                </button>
                                <button
                                    className="flex"
                                    onClick={handleNextEpisode}
                                >
                                    <ForwardIcon className="w-6 h-6" />
                                </button>
                                <button
                                    className="text-xl leading-none tracking-[-0.8px] text-appGray-400 min-w-max max-xl:hidden"
                                    onClick={handleNextEpisode}
                                >
                                    Next episode
                                </button>
                            </div>
                            <div className="flex items-center space-x-2.5 xl:w-full">
                                <div className="leading-none tracking-[-0.8px] text-appGray-400">
                                    {getCurrentPlayTime()}
                                </div>
                                <div className="relative flex-1">
                                    <div className="relative w-[128px] h-1 rounded overflow-hidden bg-appGray-800 xl:w-full">
                                        <div
                                            className="absolute top-0 left-0 h-full bg-white rounded"
                                            style={{
                                                width: getEpisodeProgressBarWidth(),
                                            }}
                                        />
                                    </div>
                                    <div
                                        className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-5 rounded cursor-pointer"
                                        onClick={handleRewind}
                                    />
                                </div>
                                <div className="leading-none tracking-[-0.8px] text-appGray-400">
                                    {fileLength}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end flex-1 max-lg:hidden">
                            <VolumeIcon className="w-6 h-6 mr-4" />
                            <label className="relative w-[128px]">
                                <div className="relative h-1 rounded overflow-hidden bg-appGray-800">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-white rounded"
                                        style={{ width: volumeWidth }}
                                    />
                                </div>
                                <input
                                    value={settings.volume}
                                    type="range"
                                    step="0.01"
                                    min="0"
                                    max="1"
                                    className="absolute top-1/2 -translate-y-1/2 left-0 w-full h-5 opacity-0 cursor-pointer"
                                    onChange={handleVolumeChange}
                                />
                            </label>
                        </div>
                        <button
                            className="flex lg:hidden"
                            onClick={() =>
                                updateSettings({
                                    playing: !settings.playing,
                                })
                            }
                        >
                            {settings.playing ? (
                                <PauseIcon className="w-5 h-5" />
                            ) : (
                                <PlayIcon className="w-5 h-5" />
                            )}
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};
