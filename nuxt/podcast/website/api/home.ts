import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import {
  HomePageEntry,
  HomePageEntryMeta,
  EpisodeEntry,
  EpisodeEntryMeta,
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

      const episodes = (await bcms.content.entry.find(
        "episode",
        async () => true
      )) as unknown as EpisodeEntry[];

      return {
        meta: entry.meta.en as HomePageEntryMeta,
        episodes: episodes
          .map((e) => e.meta.en as EpisodeEntryMeta)
          .sort((a, b) => b.date - a.date),
      };
    },
  }),
});
