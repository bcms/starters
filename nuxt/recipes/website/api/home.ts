import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import {
  HomePageEntry,
  HomePageEntryMeta,
  RecipeEntry,
  RecipeEntryMeta,
} from "~~/bcms/types";
import { HomePageData } from "~~/types";
import { apiRoute } from "./_api-route";

export const HomeApi = createBcmsMostServerRoutes({
  "/home.json": apiRoute<HomePageData>({
    method: "get",
    async handler({ bcms }) {
      const entry = (await bcms.content.entry.findOne(
        "home_page",
        async () => true
      )) as unknown as HomePageEntry;

      const recipes = (await bcms.content.entry.find(
        "recipe",
        async () => true
      )) as unknown as RecipeEntry[];

      if (!entry) {
        throw new Error("Home page entry does not exist.");
      }

      return {
        meta: entry.meta.en as HomePageEntryMeta,
        recipes: recipes.map((e) => e.meta.en) as RecipeEntryMeta[],
      };
    },
  }),
});
