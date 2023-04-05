import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { apiRoute } from "./_api-route";
import { ServicesPageData } from "~~/types";
import {
  ServiceItemEntry,
  ServiceItemEntryMeta,
  ServicesPageEntry,
  ServicesPageEntryMeta,
} from "~~/bcms/types";

export const ServicesApi = createBcmsMostServerRoutes({
  "/services.json": apiRoute<ServicesPageData>({
    method: "get",
    async handler({ bcms }) {
      const entry = (await bcms.content.entry.findOne(
        "services_page",
        async () => true
      )) as unknown as ServicesPageEntry;

      if (!entry) {
        throw new Error("Services page entry does not exist.");
      }

      const serviceItems = (await bcms.content.entry.find(
        "service_item",
        async () => true
      )) as unknown as ServiceItemEntry[];

      return {
        meta: entry.meta.en as ServicesPageEntryMeta,
        services: serviceItems.map((e) => e.meta.en) as ServiceItemEntryMeta[],
      };
    },
  }),
});
