import { JobLite } from './job';
import { HomePageEntryMeta, TestimonialEntryMeta } from '@/bcms/types';

export interface HomePageData {
  meta: HomePageEntryMeta;
  jobs: JobLite[];
  testimonials: TestimonialEntryMeta[];
}
