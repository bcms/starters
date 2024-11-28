import {
    createContext,
    type MouseEvent,
    type PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import { useEpisodes } from './EpisodeContext';
import { audioUtil } from '../utils/audio';
import type { EpisodeEntryMetaItem } from '../../bcms/types/ts';

interface PlayerContextValue {
    episode: EpisodeEntryMetaItem | undefined;
    episodeDOM: HTMLAudioElement | undefined;
    setEpisode: (episode: EpisodeEntryMetaItem | undefined) => void;
    setEpisodeDOM: (episodeDOM: HTMLAudioElement | undefined) => void;
    getFileLength: (el: HTMLAudioElement) => {
        durationInSeconds: number;
        durationInMinutes: number;
    };
    getPlayingEpisodeFileLength: () => {
        durationInSeconds: number;
        durationInMinutes: number;
    };
    getCurrentPlayTime: () => string;
    handlePrevEpisode: () => void;
    handleNextEpisode: () => void;
    getEpisodeProgressBarWidth: () => string;
    handleRewind: (event: MouseEvent<never>) => void;
    settings: {
        volume: number;
        currentTime: number;
        playing: boolean;
    };
    updateSettings: (obj: {
        volume?: number;
        currentTime?: number;
        playing?: boolean;
    }) => void;
}

const PlayerContext = createContext<PlayerContextValue>(
    undefined as unknown as PlayerContextValue,
);

export function usePlayer(): PlayerContextValue {
    const context = useContext(PlayerContext);

    if (!context) {
        throw new Error('usePlayer must be used within an PlayerProvider');
    }

    return context;
}

export function PlayerProvider(
    props: PropsWithChildren<unknown>,
): JSX.Element | null {
    const { episodes, bcms } = useEpisodes();

    const [episodeDOM, setEpisodeDOM] = useState<HTMLAudioElement | undefined>(
        undefined,
    );

    const [episode, setEpisode] = useState<EpisodeEntryMetaItem | undefined>(
        undefined,
    );

    const oldEpisodeSlugRef = useRef<string | undefined>();

    const getFileLength = useCallback((el: HTMLAudioElement) => {
        const durationInSeconds = +el.duration.toFixed(0);
        const durationInMinutes = Math.floor(durationInSeconds / 60);

        return {
            durationInSeconds,
            durationInMinutes,
        };
    }, []);

    const [settings, setSettings] = useState({
        volume: 0.4,
        currentTime: 0,
        playing: false,
    });

    const updateSettings = useCallback(
        (obj: { volume?: number; currentTime?: number; playing?: boolean }) => {
            setSettings((prevSettings) => ({
                ...prevSettings,
                ...obj,
            }));

            if (episodeDOM) {
                if (obj.volume !== undefined) {
                    episodeDOM.volume = obj.volume;
                }
                if (obj.currentTime !== undefined) {
                    episodeDOM.currentTime = obj.currentTime;
                }
                if (obj.playing !== undefined) {
                    if (obj.playing) {
                        void episodeDOM.play();
                        episodeDOM.addEventListener(
                            'timeupdate',
                            updateCurrentTime,
                        );
                        episodeDOM.addEventListener('ended', () => {
                            setSettings((prevSettings) => ({
                                ...prevSettings,
                                currentTime: 0,
                                playing: false,
                            }));
                        });
                    } else {
                        episodeDOM.pause();
                        episodeDOM.removeEventListener(
                            'timeupdate',
                            updateCurrentTime,
                        );
                    }
                }
            }
        },
        [episodeDOM],
    );

    const updateCurrentTime = () => {
        if (episodeDOM) {
            const currentTime = episodeDOM.currentTime;
            setSettings((prevSettings) => ({
                ...prevSettings,
                currentTime,
            }));
        }
    };

    const handlePrevEpisode = useCallback(() => {
        const { item, index } = episodes.reduce(
            (acc, e, i) => {
                if (!acc.item && e.slug === episode?.slug) {
                    acc.item = e;
                    acc.index = i;
                }
                return acc;
            },
            { item: null as EpisodeEntryMetaItem | null, index: -1 },
        );

        if (index > 0 && item) {
            updateSettings({
                playing: false,
            });

            const audio = audioUtil.createAudio(
                bcms,
                episodes[index - 1].media_file,
            );
            audio.preload = 'metadata';
            audio.onloadedmetadata = () => {
                setEpisodeDOM(audio);
                setEpisode(episodes[index - 1]);
            };
        }
    }, [episodes, episode, updateSettings, setEpisode, setEpisodeDOM]);

    const handleNextEpisode = useCallback(() => {
        const { item, index } = episodes.reduce(
            (acc, e, i) => {
                if (!acc.item && e.slug === episode?.slug) {
                    acc.item = e;
                    acc.index = i;
                }
                return acc;
            },
            { item: null as EpisodeEntryMetaItem | null, index: -1 },
        );

        if (index < episodes.length - 1 && item) {
            updateSettings({
                playing: false,
            });

            const audio = audioUtil.createAudio(
                bcms,
                episodes[index + 1].media_file,
            );
            audio.preload = 'metadata';
            audio.onloadedmetadata = () => {
                setEpisodeDOM(audio);
                setEpisode(episodes[index + 1]);
            };
        }
    }, [episodes, episode, setSettings, setEpisode, setEpisodeDOM]);

    const getPlayingEpisodeFileLength = useCallback(() => {
        if (episodeDOM) {
            const durationInSeconds = +episodeDOM.duration.toFixed(0);
            const durationInMinutes = Math.floor(durationInSeconds / 60);

            return {
                durationInSeconds,
                durationInMinutes,
            };
        } else {
            return {
                durationInSeconds: 0,
                durationInMinutes: 0,
            };
        }
    }, [episodeDOM]);

    const handleRewind = (event: MouseEvent<never>) => {
        const target = event.currentTarget as HTMLElement;
        const videoDuration = getPlayingEpisodeFileLength().durationInSeconds;
        const bcr = target.getBoundingClientRect();
        const clickedXPositionPercentage =
            ((event.clientX - bcr.left) / bcr.width) * 100;

        updateSettings({
            currentTime: (videoDuration / 100) * clickedXPositionPercentage,
        });
    };

    useEffect(() => {
        if (settings.playing && episodeDOM) {
            episodeDOM.volume = settings.volume;
        }
    }, [settings, episodeDOM]);

    useEffect(() => {
        if (episode && episode.slug !== oldEpisodeSlugRef.current) {
            updateSettings({
                currentTime: 0,
            });

            oldEpisodeSlugRef.current = episode.slug;
        }
    }, [episode, episodeDOM, updateSettings]);

    const getCurrentPlayTime = (): string => {
        const currentTime = settings.currentTime;
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);

        return `${minutes}:${seconds < 10 ? '0' + seconds : seconds}`;
    };

    const getEpisodeProgressBarWidth = useCallback((): string => {
        return `${(settings.currentTime /
            getPlayingEpisodeFileLength().durationInSeconds) *
            100
            }%`;
    }, [settings.currentTime]);
    return (
        <PlayerContext.Provider
            value={{
                episode,
                episodeDOM,
                setEpisode,
                setEpisodeDOM,
                getFileLength,
                getPlayingEpisodeFileLength,
                getCurrentPlayTime,
                handlePrevEpisode,
                handleNextEpisode,
                getEpisodeProgressBarWidth,
                handleRewind,
                settings,
                updateSettings,
            }}
        >
            {props.children}
        </PlayerContext.Provider>
    );
}
