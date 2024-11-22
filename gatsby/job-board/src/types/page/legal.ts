import { ClientConfig } from '@thebcms/client';
import { LegalEntry } from '../../../bcms/types/ts';

export interface LegalPageContent {
    entries: LegalEntry[];
    bcms: ClientConfig;
}
