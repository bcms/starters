import { HomePageEntryMeta} from "~~/bcms/types";
import { BlogLight } from "./blogs";

export interface HomePageData {

  meta: HomePageEntryMeta;
  blogs: BlogLight[];
}
