import type { ClientConfig } from "@thebcms/client";
import type { EpisodeEntryMetaItem } from "~/bcms/types/ts";

export const useEpisodes = () => {
  const bcmsConfig = useState<ClientConfig | undefined>('bcms-config', () => undefined);
  const episodes = useState<EpisodeEntryMetaItem[]>('episodes', () => []);

  const setEpisodes = (val: EpisodeEntryMetaItem[], bcms: ClientConfig) => {
    episodes.value = val;
    if(bcmsConfig.value) return;
    bcmsConfig.value = bcms;
  };

  return {
    episodes,
    bcmsConfig,
    setEpisodes,
  };
};
