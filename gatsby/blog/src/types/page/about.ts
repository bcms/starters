import { ClientConfig } from '@thebcms/client';
import { AboutPageEntryMetaItem } from '../../../bcms/types/ts';
import { EntryContentParsedItem } from '@thebcms/types';

export interface AboutPageContent {
    meta: AboutPageEntryMetaItem;
    content: EntryContentParsedItem[];
    bcms: ClientConfig;
}
