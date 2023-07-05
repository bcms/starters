import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { AboutPageEntry, AboutPageEntryMeta } from "~~/bcms/types";
import { AboutPageData } from "~~/types";
import { apiRoute } from "./_api-route";

export const AboutApi = createBcmsMostServerRoutes({
  "/about.json": apiRoute<AboutPageData>({
    method: "get",
    async handler({ bcms }) {
      const entry = (await bcms.content.entry.findOne(
        "about_page",
        async () => true
      )) as unknown as AboutPageEntry;

      if (!entry) {
        throw new Error("About page entry does not exist.");
      }

      return {
        meta: entry.meta.en as AboutPageEntryMeta,
      };
    },
  }),
});
