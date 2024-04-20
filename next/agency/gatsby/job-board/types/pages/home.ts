import { HomePageEntryMeta, TestimonialEntryMeta } from '../../bcms/types';
import { JobLite } from './job';

export interface HomePageData {
  meta: HomePageEntryMeta;
  jobs: JobLite[];
  testimonials: TestimonialEntryMeta[];
}
