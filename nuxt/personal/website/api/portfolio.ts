import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { apiRoute } from "./_api-route";
import {
  PortfolioItemEntry,
  PortfolioItemEntryMeta,
  PortfolioPageEntry,
  PortfolioPageEntryMeta,
} from "~~/bcms/types";
import { PortfolioPageData } from "~~/types";

export const PortfolioApi = createBcmsMostServerRoutes({
  "/portfolio.json": apiRoute<PortfolioPageData>({
    method: "get",
    async handler({ bcms }) {
      const entry = (await bcms.content.entry.findOne(
        "portfolio_page",
        async () => true
      )) as unknown as PortfolioPageEntry;

      if (!entry) {
        throw new Error("Portfolio page entry does not exist.");
      }

      const portfolioItems = (await bcms.content.entry.find(
        "portfolio_item",
        async () => true
      )) as unknown as PortfolioItemEntry[];

      return {
        meta: entry.meta.en as PortfolioPageEntryMeta,
        items: portfolioItems.map((e) => e.meta.en as PortfolioItemEntryMeta),
      };
    },
  }),
});
