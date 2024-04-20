import { EpisodeEntry, EpisodeEntryMeta } from '~~/bcms/types';

export default defineNuxtPlugin(async () => {
  const { setEpisodes } = useEpisodes();

  const { data: episodes } = await useAsyncData<EpisodeEntryMeta[]>(
    async (ctx) => {
      const episodeItems = (await ctx?.$bcms.entry.getAll({
        template: 'episode',
      })) as EpisodeEntry[];

      return episodeItems
        ? episodeItems.map((e) => e.meta.en as EpisodeEntryMeta)
        : [];
    },
  );

  setEpisodes(
    episodes.value ? episodes.value.sort((a, b) => b.date - a.date) : [],
  );
});
