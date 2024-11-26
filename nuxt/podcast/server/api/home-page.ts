import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import {  EpisodeEntry, EpisodeEntryMetaItem, HomePageEntry, HomePageEntryMetaItem } from '~/bcms/types/ts';

export type HomePageResponse = {
    meta: HomePageEntryMetaItem;
    episodes: EpisodeEntryMetaItem[];
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const homePageEntry = (await bcms.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;

    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;

    const episodes = await bcms.entry.getAll('episode') as EpisodeEntry[];
    const episodeMeta = episodes.map((episode) => episode.meta.en as EpisodeEntryMetaItem);


    const res: HomePageResponse = {
        meta: homePageMeta,
        episodes: episodeMeta,
        bcms: bcms.getConfig(),
    };

    return res;
});
