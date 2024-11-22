import { ClientConfig } from '@thebcms/client';
import { ContactPageEntryMetaItem } from '../../../bcms/types/ts';

export interface ContactPageContent {
    meta: ContactPageEntryMetaItem;
    bcms: ClientConfig;
}
