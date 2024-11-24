import { ClientConfig } from '@thebcms/client';
import { LegalPageEntry } from '../../../bcms/types/ts';

export interface LegalPageContent {
    entries: LegalPageEntry[];
    bcms: ClientConfig;
}
