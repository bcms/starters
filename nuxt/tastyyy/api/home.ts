import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import {
  FoodItemEntry,
  FoodItemEntryMeta,
  HomePageEntry,
  HomePageEntryMeta,
  TestimonialEntry,
  TestimonialEntryMeta,
} from "~~/bcms/types";
import { EventEntry, EventEntryMeta } from "~~/bcms/types/entry/event";
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

      const events = (await bcms.content.entry.find(
        "event",
        async () => true
      )) as unknown as EventEntry[];

      const testimonials = (await bcms.content.entry.find(
        "testimonial",
        async () => true
      )) as unknown as TestimonialEntry[];

      return {
        meta: entry.meta.en as HomePageEntryMeta,
        specials: specials.map((e) => e.meta.en) as FoodItemEntryMeta[],
        events: events.map((e) => e.meta.en) as EventEntryMeta[],
        testimonials: testimonials.map(
          (e) => e.meta.en
        ) as TestimonialEntryMeta[],
      };
    },
  }),
});
