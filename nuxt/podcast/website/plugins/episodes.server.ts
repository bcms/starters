import { BCMSNuxtPlugin } from "nuxt-plugin-bcms/types";
import { EpisodeEntryMeta } from "~~/bcms/types";
import { APIResponse } from "~~/types";

export default defineNuxtPlugin(async (nuxtApp) => {
  const { setEpisodes } = useEpisodes();

  const { data: episodes } = await (nuxtApp.$bcms as BCMSNuxtPlugin).request<
    APIResponse<EpisodeEntryMeta[]>
  >({
    url: "/episode",
  });

  setEpisodes(
    episodes
      .map((e) => {
        return {
          episode: e,
          settings: {
            currentTime: 0,
            isPlaying: false,
          },
        };
      })
      .sort((a, b) => b.episode.date - a.episode.date)
  );
});
