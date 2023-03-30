import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { HomePageEntry, HomePageEntryMeta } from "~~/bcms/types";
import { apiRoute } from "./_api-route";

export const HomeApi = createBcmsMostServerRoutes({
  "/home.json": apiRoute({
    method: "get",
    async handler({ bcms }) {
      const entry = (await bcms.content.entry.findOne(
        "home_page",
        async () => true
      )) as unknown as HomePageEntry;

      if (!entry) {
        throw new Error("Home page entry does not exist.");
      }

      return {
        meta: entry.meta.en as HomePageEntryMeta,
      };
    },
  }),
});
