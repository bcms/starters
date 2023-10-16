import { EventEntryMeta } from '@/bcms/types';
import { EventsPageEntryMeta } from '@/bcms/types/entry/events_page';

export interface EventsPageData {
  meta: EventsPageEntryMeta;
  events: EventEntryMeta[];
}
