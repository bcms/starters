import { ClientConfig } from '@thebcms/client';
import { AboutPageEntryMetaItem } from '../../../bcms/types/ts';

export interface AboutPageContent {
    meta: AboutPageEntryMetaItem;
    bcms: ClientConfig;
}
