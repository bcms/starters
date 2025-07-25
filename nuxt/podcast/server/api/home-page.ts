import {
    EpisodeEntry,
    EpisodeEntryMetaItem,
    HomePageEntry,
    HomePageEntryMetaItem,
} from '~/bcms/type/ts';

export type HomePageResponse = {
    meta: HomePageEntryMetaItem;
    episodes: EpisodeEntryMetaItem[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const homePageEntry = (await bcms.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;

    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;

    const episodes = (await bcms.entry.getAll('episode')) as EpisodeEntry[];
    const episodeMeta = episodes.map(
        (episode) => episode.meta.en as EpisodeEntryMetaItem,
    );

    const res: HomePageResponse = {
        meta: homePageMeta,
        episodes: episodeMeta,
    };

    return res;
});
