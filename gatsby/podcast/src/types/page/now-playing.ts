import { ClientConfig } from '@thebcms/client';
import { EpisodeEntryMetaItem } from '../../../bcms/types/ts';

export interface NowPlayingPageContent {
    bcms: ClientConfig;
    episodes: EpisodeEntryMetaItem[]
}
