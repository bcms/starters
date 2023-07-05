import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { ReservationPageEntry, ReservationPageEntryMeta } from "~~/bcms/types";
import { ReservationPageData } from "~~/types";
import { apiRoute } from "./_api-route";

export const ReservationApi = createBcmsMostServerRoutes({
  "/reservation.json": apiRoute<ReservationPageData>({
    method: "get",
    async handler({ bcms }) {
      const entry = (await bcms.content.entry.findOne(
        "reservation_page",
        async () => true
      )) as unknown as ReservationPageEntry;

      if (!entry) {
        throw new Error("Reservation page entry does not exist.");
      }

      return {
        meta: entry.meta.en as ReservationPageEntryMeta,
      };
    },
  }),
});
