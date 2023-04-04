import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import {
  HomePageEntry,
  HomePageEntryMeta,
} from "~~/bcms/types/entry/home_page";
import { apiRoute } from "./_api-route";
import { HomePageData } from "~~/types";
import { ServiceEntry, ServiceEntryMeta } from "~~/bcms/types/entry/service";

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

      const services = (await bcms.content.entry.find(
        "service",
        async () => true
      )) as unknown as ServiceEntry[];

      return {
        meta: entry.meta.en as HomePageEntryMeta,
        services: services.map((s) => s.meta.en) as ServiceEntryMeta[],
      };
    },
  }),
});
