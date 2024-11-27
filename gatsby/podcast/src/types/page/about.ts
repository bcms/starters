import { ClientConfig } from '@thebcms/client';
import { AboutPageEntryMetaItem, EpisodeEntryMetaItem } from '../../../bcms/types/ts';

export interface AboutPageContent {
    meta: AboutPageEntryMetaItem;
    bcms: ClientConfig;
    episodes: EpisodeEntryMetaItem[]
}
