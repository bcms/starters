import { EpisodeEntryMeta } from "~~/bcms/types";

export const useEpisodes = () => {
  const episodes = useState<EpisodeEntryMeta[]>("episodes", () => []);

  const setEpisodes = (val: EpisodeEntryMeta[]) => {
    episodes.value = val;
  };

  return {
    episodes,
    setEpisodes,
  };
};
