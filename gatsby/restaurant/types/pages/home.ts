import {
  FoodItemEntryMeta,
  HomePageEntryMeta,
  TestimonialEntryMeta,
} from '@/bcms/types';
import { EventEntryMeta } from '@/bcms/types/entry/event';

export interface HomePageData {
  meta: {
    en: HomePageEntryMeta
  };
  specials:{
      nodes: Array<{
        bcms: {
          meta: {
           en: FoodItemEntryMeta
}
        };
      }>;
  };
  events: EventEntryMeta[];
  testimonials: TestimonialEntryMeta[];
}
