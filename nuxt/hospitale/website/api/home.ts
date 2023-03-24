import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { HomePageEntry, HomePageEntryMeta } from "~~/bcms/types";
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

      return {
        meta: entry.meta.en as HomePageEntryMeta,
      };
    },
  }),
});
