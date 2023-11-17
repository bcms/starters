import {
  TestimonialItemEntryMeta,
  TestimonialsPageEntryMeta,
} from '../../../bcms/types';

export interface TestimonialsPageData {
  meta: TestimonialsPageEntryMeta;
  items: TestimonialItemEntryMeta[];
}
