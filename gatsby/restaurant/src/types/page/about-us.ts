import { ClientConfig } from '@thebcms/client';
import { AboutPageEntryMetaItem } from '../../../bcms/types/ts';

export interface AboutUsPageContent {
    meta: AboutPageEntryMetaItem;
    bcms: ClientConfig;
}
