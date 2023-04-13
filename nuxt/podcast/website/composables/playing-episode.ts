import { EpisodeEntryMeta } from "~~/bcms/types";

export const usePlayingEpisode = () => {
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

  return {
    episode,
    setEpisode,
    isPlaying,
    setIsPlaying,
  };
};
