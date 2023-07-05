import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { EpisodeEntry, EpisodeEntryMeta } from "~~/bcms/types";

import { EpisodePageData } from "~~/types";
import { apiRoute } from "./_api-route";

export const EpisodeApi = createBcmsMostServerRoutes({
  "/episode/:slug/data.json": apiRoute<EpisodePageData>({
    method: "get",
    async handler({ bcms, params }) {
      const entry = (await bcms.content.entry.findOne(
        "episode",
        async (e) => e.meta.en.slug === params.slug
      )) as unknown as EpisodeEntry;

      if (!entry) {
        throw new Error("Episode page entry does not exist.");
      }

      return {
        meta: entry.meta.en as EpisodeEntryMeta,
      };
    },
  }),
  "/episode": apiRoute<EpisodeEntryMeta[]>({
    method: "get",
    async handler({ bcms }) {
      const entries = (await bcms.content.entry.find(
        "episode",
        async () => true
      )) as unknown as EpisodeEntry[];

      return entries.map((e) => e.meta.en as EpisodeEntryMeta);
    },
  }),
});
