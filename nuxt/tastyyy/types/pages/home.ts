import {
  FoodItemEntryMeta,
  HomePageEntryMeta,
  TestimonialEntryMeta,
} from '~~/bcms/types';
import { EventEntryMeta } from '~~/bcms/types/entry/event';

export interface HomePageData {
  meta: HomePageEntryMeta;
  specials: FoodItemEntryMeta[];
  events: EventEntryMeta[];
  testimonials: TestimonialEntryMeta[];
}
