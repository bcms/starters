import { ClientConfig } from '@thebcms/client';
import { EpisodeEntryMetaItem, HomePageEntryMetaItem } from '../../../bcms/types/ts';

export interface HomePageContent {
    meta: HomePageEntryMetaItem;
    bcms: ClientConfig;
    episodes: EpisodeEntryMetaItem[]
}
