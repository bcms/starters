import { ClientConfig } from '@thebcms/client';
import { HomePageEntryMetaItem } from '../../../bcms/types/ts';

export interface HomePageContent {
    meta: HomePageEntryMetaItem;
    bcms: ClientConfig;
}
