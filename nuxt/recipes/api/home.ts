import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { HomePageData } from "~~/types";
import { apiRoute } from "./_api-route";

export const HomeApi = createBcmsMostServerRoutes({
  "/home.json": apiRoute<HomePageData>({
    method: "get",
    async handler({ bcms, lng }) {
      return {};
    },
  }),
});
