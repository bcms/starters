import { ClientConfig } from '@thebcms/client';
import {
    TestimonialEntry,
    TestimonialsPageEntryMetaItem,
} from '../../../bcms/types/ts';

export interface TestimonialsPageContent {
    meta: TestimonialsPageEntryMetaItem;
    testimonials: TestimonialEntry[];
    bcms: ClientConfig;
}
