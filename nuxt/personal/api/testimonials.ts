import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { apiRoute } from "./_api-route";
import {
  TestimonialItemEntry,
  TestimonialItemEntryMeta,
  TestimonialsPageEntry,
  TestimonialsPageEntryMeta,
} from "~~/bcms/types";
import { TestimonialsPageData } from "~~/types";

export const TestimonialsApi = createBcmsMostServerRoutes({
  "/testimonials.json": apiRoute<TestimonialsPageData>({
    method: "get",
    async handler({ bcms }) {
      const entry = (await bcms.content.entry.findOne(
        "testimonials_page",
        async () => true
      )) as unknown as TestimonialsPageEntry;

      if (!entry) {
        throw new Error("Testimonials page entry does not exist.");
      }

      const testimonialItems = (await bcms.content.entry.find(
        "testimonial_item",
        async () => true
      )) as unknown as TestimonialItemEntry[];

      return {
        meta: entry.meta.en as TestimonialsPageEntryMeta,
        items: testimonialItems.map(
          (e) => e.meta.en as TestimonialItemEntryMeta
        ),
      };
    },
  }),
});
