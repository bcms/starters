import { HomePageEntryMeta, TestimonialEntryMeta } from "~~/bcms/types";
import { JobLight } from "./job";

export interface HomePageData {
  meta: HomePageEntryMeta;
  jobs: JobLight[];
  testimonials: TestimonialEntryMeta[];
}
