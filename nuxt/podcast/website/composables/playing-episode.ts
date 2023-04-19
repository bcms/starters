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

  const settings = useState("episode-settings", () => {
    return {
      volume: 0.1,
      currentTime: 0,
      playing: false,
    };
  });
  const setSettings = (obj: {
    volume?: number;
    currentTime?: number;
    playing?: boolean;
  }) => {
    if (typeof obj.volume === "number") {
      settings.value.volume = obj.volume;
      if (episodeDOM.value) {
        episodeDOM.value.volume = obj.volume;
      }
    }
    if (typeof obj.currentTime === "number") {
      settings.value.currentTime = obj.currentTime;
      if (episodeDOM.value) {
        episodeDOM.value.currentTime = obj.currentTime;
      }
    }
    if (typeof obj.playing === "boolean") {
      settings.value.playing = obj.playing;
      if (episodeDOM.value) {
        if (obj.playing) {
          episodeDOM.value.play();
        } else {
          episodeDOM.value.pause();
        }
      }
    }
  };

  watch(settings.value, (newVal) => {
    if (newVal.playing && episodeDOM.value) {
      episodeDOM.value.volume = newVal.volume;
    }
  });

  watch(episode, (newVal, oldVal) => {
    if (newVal?.slug !== oldVal?.slug) {
      setSettings({
        currentTime: 0,
      });
    }
  });

  return {
    episode,
    episodeDOM,
    setEpisode,
    setEpisodeDOM,
    getFileLength,
    getPlayingEpisodeFileLength,
    settings,
    setSettings,
  };
};
