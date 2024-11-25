import { ClientConfig } from '@thebcms/client';
import { EventsPageEntryMetaItem } from '../../../bcms/types/ts';

export interface EventsPageContent {
    meta: EventsPageEntryMetaItem;
    bcms: ClientConfig;
}
