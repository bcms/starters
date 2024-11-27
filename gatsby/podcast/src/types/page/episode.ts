import { ClientConfig } from '@thebcms/client';
import { EpisodeEntryMetaItem } from '../../../bcms/types/ts';

export interface EpisodePageContent {
    meta: EpisodeEntryMetaItem;
    bcms: ClientConfig;
    episodes: EpisodeEntryMetaItem[]
}
