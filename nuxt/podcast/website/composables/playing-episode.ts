import { EpisodeEntryMeta } from "~~/bcms/types";

export const usePlayingEpisode = () => {
  const episodeDOM = useState<HTMLAudioElement | undefined>(
    "playing-episode-dom",
    () => undefined
  );
  const setEpisodeDOM = (val: HTMLAudioElement) => {
    episodeDOM.value = val;
  };

  const episode = useState<EpisodeEntryMeta | undefined>(
    "playing-episode",
    () => undefined
  );
  const setEpisode = (val: EpisodeEntryMeta) => {
    episode.value = val;
  };

  const isPlaying = useState("is-playing", () => false);
  const setIsPlaying = (val: boolean) => {
    isPlaying.value = val;
  };

  const getFileLength = (el: HTMLAudioElement) => {
    const target = el;

    const durationInSeconds = target.duration;
    const durationInMinutes = +(durationInSeconds / 60).toFixed(0);

    return {
      durationInSeconds,
      durationInMinutes,
    };
  };
  const getPlayingEpisodeFileLength = computed(() => {
    if (episodeDOM.value) {
      const target = episodeDOM.value;

      const durationInSeconds = target.duration;
      const durationInMinutes = +(durationInSeconds / 60).toFixed(0);

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
  });

  return {
    episode,
    episodeDOM,
    setEpisode,
    setEpisodeDOM,
    isPlaying,
    setIsPlaying,
    getFileLength,
    getPlayingEpisodeFileLength,
  };
};
