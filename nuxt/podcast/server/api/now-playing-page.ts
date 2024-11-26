import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import {  EpisodeEntry, EpisodeEntryMetaItem } from '~/bcms/types/ts';

export type NowPlayingPageResponse = {
    episodes: EpisodeEntryMetaItem[];
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const episodes = await bcms.entry.getAll('episode') as EpisodeEntry[];
    const episodeMeta = episodes.map((episode) => episode.meta.en as EpisodeEntryMetaItem);


    const res: NowPlayingPageResponse = {
        episodes: episodeMeta,
        bcms: bcms.getConfig(),
    };

    return res;
});
