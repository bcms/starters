import { ClientConfig } from '@thebcms/client';
import { LegalPageEntry } from '../../../bcms/types/ts';
import { Layout } from '../layout';

export interface LegalPageContent extends Layout {
    entries: LegalPageEntry[];
    bcms: ClientConfig;
}
