import { FoodItemEntryMeta, HomePageEntryMeta } from "~~/bcms/types";
import { EventEntryMeta } from "~~/bcms/types/entry/event";

export interface HomePageData {
  meta: HomePageEntryMeta;
  specials: FoodItemEntryMeta[];
  events: EventEntryMeta[];
}
