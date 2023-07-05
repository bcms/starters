import { HomePageEntryMeta, RecipeEntryMeta } from "~~/bcms/types";
import { RecipeLight } from "./recipes";

export interface HomePageData {
  meta: HomePageEntryMeta;
  recipes: RecipeLight[];
}
