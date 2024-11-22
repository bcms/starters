import { ClientConfig } from '@thebcms/client';
import {
    HomePageEntryMetaItem,
    TestimonialEntryMetaItem,
} from '../../../bcms/types/ts';
import { JobLite } from '../../utils/job';

export interface HomePageContent {
    meta: HomePageEntryMetaItem;
    jobs: JobLite[];
    testimonials: TestimonialEntryMetaItem[];
    bcms: ClientConfig;
}
