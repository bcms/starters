import {
    AboutPageEntry,
    AboutPageEntryMetaItem,
    EpisodeEntry,
    EpisodeEntryMetaItem,
} from '~/bcms/type/ts';

export type AboutPageResponse = {
    meta: AboutPageEntryMetaItem;
    episodes: EpisodeEntryMetaItem[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const aboutPageEntry = (await bcms.entry.getBySlug(
        'about-us',
        'about-page',
    )) as AboutPageEntry;

    const aboutPageMeta = aboutPageEntry.meta.en as AboutPageEntryMetaItem;

    const episodes = (await bcms.entry.getAll('episode')) as EpisodeEntry[];
    const episodeMeta = episodes.map(
        (episode) => episode.meta.en as EpisodeEntryMetaItem,
    );

    const res: AboutPageResponse = {
        meta: aboutPageMeta,
        episodes: episodeMeta,
    };

    return res;
});
