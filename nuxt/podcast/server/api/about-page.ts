import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import {  AboutPageEntry, AboutPageEntryMetaItem, EpisodeEntry, EpisodeEntryMetaItem } from '~/bcms/types/ts';

export type AboutPageResponse = {
    meta: AboutPageEntryMetaItem;
    episodes: EpisodeEntryMetaItem[];
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const aboutPageEntry = (await bcms.entry.getBySlug(
        'about-us',
        'about-page',
    )) as AboutPageEntry;

    const aboutPageMeta = aboutPageEntry.meta.en as AboutPageEntryMetaItem;

    const episodes = await bcms.entry.getAll('episode') as EpisodeEntry[];
    const episodeMeta = episodes.map((episode) => episode.meta.en as EpisodeEntryMetaItem);


    const res: AboutPageResponse = {
        meta: aboutPageMeta,
        episodes: episodeMeta,
        bcms: bcms.getConfig(),
    };

    return res;
});
