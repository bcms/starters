import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import {
  FoodItemEntry,
  FoodItemEntryMeta,
  MealTypeEntry,
  MealTypeEntryMeta,
  MenuPageEntry,
  MenuPageEntryMeta,
  SeasonEntry,
  SeasonEntryMeta,
} from "~~/bcms/types";
import { MenuPageData, SeasonalMenuPageData } from "~~/types";
import { apiRoute } from "./_api-route";

export const MenuApi = createBcmsMostServerRoutes({
  "/menu.json": apiRoute<MenuPageData>({
    method: "get",
    async handler({ bcms }) {
      const entry = (await bcms.content.entry.findOne(
        "menu_page",
        async () => true
      )) as unknown as MenuPageEntry;

      if (!entry) {
        throw new Error("Menu page entry does not exist.");
      }

      const mealTypes = (await bcms.content.entry.find(
        "meal_type",
        async () => true
      )) as unknown as MealTypeEntry[];

      const foodItems = (await bcms.content.entry.find(
        "food_item",
        async () => true
      )) as unknown as FoodItemEntry[];

      return {
        meta: entry.meta.en as MenuPageEntryMeta,
        mealTypes: mealTypes.map((e) => e.meta.en) as MealTypeEntryMeta[],
        foodItems: foodItems.map((e) => e.meta.en) as FoodItemEntryMeta[],
      };
    },
  }),
  "/seasonal-menu.json": apiRoute<SeasonalMenuPageData>({
    method: "get",
    async handler({ bcms }) {
      const entry = (await bcms.content.entry.findOne(
        "menu_page",
        async () => true
      )) as unknown as MenuPageEntry;

      if (!entry) {
        throw new Error("Seasonal menu page entry does not exist.");
      }

      const seasons = (await bcms.content.entry.find(
        "season",
        async () => true
      )) as unknown as SeasonEntry[];

      const foodItems = (await bcms.content.entry.find(
        "food_item",
        async () => true
      )) as unknown as FoodItemEntry[];

      return {
        meta: entry.meta.en as MenuPageEntryMeta,
        seasons: seasons.map((e) => e.meta.en) as SeasonEntryMeta[],
        foodItems: foodItems.map((e) => e.meta.en) as FoodItemEntryMeta[],
      };
    },
  }),
});
