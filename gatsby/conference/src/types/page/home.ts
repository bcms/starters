import { ClientConfig } from '@thebcms/client';
import { HomePageEntryMetaItem, LegalEntry } from '../../../bcms/types/ts';

export interface HomePageContent {
    meta: HomePageEntryMetaItem;
    legalEntries: LegalEntry[];
    bcms: ClientConfig;
}
