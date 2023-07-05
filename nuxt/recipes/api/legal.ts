import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { LegalPageEntry } from "~~/bcms/types";
import { LegalPageData } from "~~/types";
import { apiRoute } from "./_api-route";

export const LegalApi = createBcmsMostServerRoutes({
  "/legal.json": apiRoute<LegalPageData>({
    method: "get",
    async handler({ bcms }) {
      const entries = (await bcms.content.entry.find(
        "legal_page",
        async () => true
      )) as unknown as LegalPageEntry[];

      if (!entries) {
        throw new Error("Legal page entry does not exist.");
      }

      return {
        entries,
      };
    },
  }),
});
