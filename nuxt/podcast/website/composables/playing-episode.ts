import { bcmsMediaToUrl } from "@becomes/cms-most/frontend";
import { EpisodeEntryMeta } from "~~/bcms/types";
import { EpisodeWithSettings } from "~~/types";

export const usePlayingEpisode = () => {
  const { episodes } = useEpisodes();

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

    const durationInSeconds = +target.duration.toFixed(0);
    const durationInMinutes = Math.floor(durationInSeconds / 60);

    return {
      durationInSeconds,
      durationInMinutes,
    };
  };
  const getPlayingEpisodeFileLength = computed(() => {
    if (episodeDOM.value) {
      const target = episodeDOM.value;

      const durationInSeconds = +target.duration.toFixed(0);
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
  });

  const settings = useState("episode-settings", () => {
    return {
      volume: 0.4,
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
          episodeDOM.value.addEventListener("timeupdate", updateCurrentTime);
          episodeDOM.value.addEventListener("ended", () => {
            settings.value.playing = false;
            settings.value.currentTime = 0;
          });
        } else {
          episodeDOM.value.pause();
          episodeDOM.value.removeEventListener("timeupdate", updateCurrentTime);
        }
      }
    }
  };
  const updateCurrentTime = () => {
    settings.value.currentTime = episodeDOM.value?.currentTime || 0;
  };
  const handlePrevEpisode = () => {
    const { item, index } = episodes.value.reduce(
      (acc, e, i) => {
        if (!acc.item && e.episode.slug === episode.value?.slug) {
          acc.item = e;
          acc.index = i;
        }
        return acc;
      },
      { item: null as EpisodeWithSettings | null, index: -1 }
    );

    if (index > 0 && item) {
      setSettings({
        playing: false,
      });

      const audio = new Audio(
        bcmsMediaToUrl(episodes.value[index - 1].episode.file)
      );
      audio.preload = "metadata";
      audio.onloadedmetadata = () => {
        episodeDOM.value = audio;

        setEpisode(episodes.value[index - 1].episode);
        setSettings({
          playing: true,
        });
      };
    }
  };
  const handleNextEpisode = () => {
    const { item, index } = episodes.value.reduce(
      (acc, e, i) => {
        if (!acc.item && e.episode.slug === episode.value?.slug) {
          acc.item = e;
          acc.index = i;
        }
        return acc;
      },
      { item: null as EpisodeWithSettings | null, index: -1 }
    );

    if (index < episodes.value.length - 1 && item) {
      setSettings({
        playing: false,
      });

      const audio = new Audio(
        bcmsMediaToUrl(episodes.value[index + 1].episode.file)
      );
      audio.preload = "metadata";
      audio.onloadedmetadata = () => {
        episodeDOM.value = audio;

        setEpisode(episodes.value[index + 1].episode);
        setSettings({
          playing: true,
        });
      };
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
    handlePrevEpisode,
    handleNextEpisode,
  };
};
