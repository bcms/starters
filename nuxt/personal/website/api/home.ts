import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { apiRoute } from "./_api-route";

export const HomeApi = createBcmsMostServerRoutes({
  "/home.json": apiRoute({
    method: "get",
    async handler({ bcms }) {
      return {};
    },
  }),
});
