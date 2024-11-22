import { ClientConfig } from '@thebcms/client';
import { JobPostEntryMetaItem } from '../../../bcms/types/ts';
import { JobLite } from '../../utils/job';

export interface JobPageContent {
    meta: JobPostEntryMetaItem;
    jobs: JobLite[];
    bcms: ClientConfig;
}
