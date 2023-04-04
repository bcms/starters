import { HomePageEntryMeta } from "~~/bcms/types/entry/home_page";
import { ServiceEntryMeta } from "~~/bcms/types/entry/service";

export interface HomePageData {
  meta: HomePageEntryMeta;
  services: ServiceEntryMeta[];
}
