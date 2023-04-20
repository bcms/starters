import { EpisodeWithSettings } from "~~/types";

export const useEpisodes = () => {
  const episodes = useState<EpisodeWithSettings[]>("episodes", () => []);

  const setEpisodes = (val: EpisodeWithSettings[]) => {
    episodes.value = val;
  };

  return {
    episodes,
    setEpisodes,
  };
};
