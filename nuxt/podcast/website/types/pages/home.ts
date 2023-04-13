import { EpisodeEntryMeta, HomePageEntryMeta } from "~~/bcms/types";

export interface HomePageData {
  meta: HomePageEntryMeta;
  episodes: EpisodeEntryMeta[];
}
