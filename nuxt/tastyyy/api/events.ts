import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { EventEntryMeta, MealTypeEntry } from "~~/bcms/types";
import {
  EventsPageEntry,
  EventsPageEntryMeta,
} from "~~/bcms/types/entry/events_page";
import { EventsPageData } from "~~/types";
import { apiRoute } from "./_api-route";

export const EventsApi = createBcmsMostServerRoutes({
  "/events.json": apiRoute<EventsPageData>({
    method: "get",
    async handler({ bcms }) {
      const entry = (await bcms.content.entry.findOne(
        "events_page",
        async () => true
      )) as unknown as EventsPageEntry;

      if (!entry) {
        throw new Error("Events page entry does not exist.");
      }

      const events = (await bcms.content.entry.find(
        "event",
        async () => true
      )) as unknown as MealTypeEntry[];

      return {
        meta: entry.meta.en as EventsPageEntryMeta,
        events: events.map((e) => e.meta.en) as EventEntryMeta[],
      };
    },
  }),
});
