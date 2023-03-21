import { RecipeEntryMeta, RecipesPageEntryMeta } from "~~/bcms/types";

export interface RecipesPageData {
  meta: RecipesPageEntryMeta;
  recipes: RecipeEntryMeta[];
}
