import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import {
  HomePageEntry,
  HomePageEntryMeta,
  TestimonialEntry,
  TestimonialEntryMeta,
} from "~~/bcms/types";
import { JobEntry } from "~~/bcms/types/entry/job";
import { HomePageData } from "~~/types";
import { jobToLight } from "./job";
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

      const jobs = (await bcms.content.entry.find(
        "job",
        async () => true
      )) as unknown as JobEntry[];

      const testimonials = (await bcms.content.entry.find(
        "testimonial",
        async () => true
      )) as unknown as TestimonialEntry[];

      return {
        meta: entry.meta.en as HomePageEntryMeta,
        jobs: jobToLight(jobs),
        testimonials: testimonials.map(
          (e) => e.meta.en
        ) as TestimonialEntryMeta[],
      };
    },
  }),
});
