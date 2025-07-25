import { EpisodeEntry, EpisodeEntryMetaItem } from '~/bcms/type/ts';

export type EpisodePageResponse = {
    meta: EpisodeEntryMetaItem;
    episodes: EpisodeEntryMetaItem[];
};

export default defineEventHandler(async (event) => {
    const bcms = useBcmsPrivate();
    const slug = getRouterParam(event, 'slug');

    const episodes = (await bcms.entry.getAll('episode')) as EpisodeEntry[];
    const episodesMeta = episodes.map(
        (episode) => episode.meta.en as EpisodeEntryMetaItem,
    );

    const entry = episodesMeta.find((e) => e.slug === slug);

    if (!entry) {
        throw new Error(`Blog "${slug}" not found`);
    }

    const res: EpisodePageResponse = {
        meta: entry,
        episodes: episodesMeta,
    };

    return res;
});
