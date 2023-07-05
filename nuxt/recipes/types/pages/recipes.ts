import {
  BCMSPropMediaDataParsed,
  BCMSPropRichTextDataParsed,
} from "@becomes/cms-client/types";
import { RecipeEntryMeta, RecipesPageEntryMeta } from "~~/bcms/types";

export interface RecipeLight {
  title: string;
  slug: string;
  cover: BCMSPropMediaDataParsed;
  description: BCMSPropRichTextDataParsed;
  categories: string[];
  popular?: boolean;
}

export interface RecipesPageData {
  meta: RecipesPageEntryMeta;
  recipes: RecipeLight[];
}

export interface RecipePageData {
  meta: RecipeEntryMeta;
  similarRecipes: RecipeLight[];
  popular: string[];
  categories: string[];
}
