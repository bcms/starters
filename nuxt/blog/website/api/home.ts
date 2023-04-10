import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { BlogEntry, HomePageEntry, HomePageEntryMeta } from "~~/bcms/types";
import { HomePageData } from "~~/types";
import { blogToLight } from "./blogs";
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

      const blogs = (await bcms.content.entry.find("blog", async (e) =>
        entry.meta.en?.hero.featured_blogs.find(
          (i) => e.meta.en?.slug !== i.meta.en?.slug
        )
      )) as unknown as BlogEntry[];

      return {
        meta: entry.meta.en as HomePageEntryMeta,
        blogs: blogToLight(
          blogs.sort((a, b) => (b.meta.en?.date || 0) - (a.meta.en?.date || 0))
        ).slice(0, 6),
      };
    },
  }),
});
