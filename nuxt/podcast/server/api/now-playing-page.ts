import { EpisodeEntry, EpisodeEntryMetaItem } from '~/bcms/type/ts';

export type NowPlayingPageResponse = {
    episodes: EpisodeEntryMetaItem[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const episodes = (await bcms.entry.getAll('episode')) as EpisodeEntry[];
    const episodeMeta = episodes.map(
        (episode) => episode.meta.en as EpisodeEntryMetaItem,
    );

    const res: NowPlayingPageResponse = {
        episodes: episodeMeta,
    };

    return res;
});
