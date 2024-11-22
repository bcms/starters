import { ClientConfig } from '@thebcms/client';
import { LegalPageEntryMetaItem } from '../../../bcms/types/ts';

export interface LegalPageContent {
    meta: LegalPageEntryMetaItem;
    bcms: ClientConfig;
}
