import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import {
  FoodItemEntry,
  FoodItemEntryMeta,
  HomePageEntry,
  HomePageEntryMeta,
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

      if (!entry) {
        throw new Error("Home page entry does not exist.");
      }

      const specials = (await bcms.content.entry.find(
        "food_item",
        async (e) => e.meta.en.special
      )) as unknown as FoodItemEntry[];

      return {
        meta: entry.meta.en as HomePageEntryMeta,
        specials: specials.map((e) => e.meta.en) as FoodItemEntryMeta[],
      };
    },
  }),
});
