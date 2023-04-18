import { createBcmsMostServerRoutes } from "@becomes/cms-most";

import { NowPlayingPageData } from "~~/types";
import { apiRoute } from "./_api-route";

export const NowPlayingApi = createBcmsMostServerRoutes({
  "/now-playing.json": apiRoute<NowPlayingPageData>({
    method: "get",
    async handler() {
      return {};
    },
  }),
});
