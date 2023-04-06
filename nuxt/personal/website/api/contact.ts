import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import { apiRoute } from "./_api-route";
import { ContactPageEntry, ContactPageEntryMeta } from "~~/bcms/types";
import { ContactPageData } from "~~/types";

export const ContactApi = createBcmsMostServerRoutes({
  "/contact.json": apiRoute<ContactPageData>({
    method: "get",
    async handler({ bcms }) {
      const entry = (await bcms.content.entry.findOne(
        "contact_page",
        async () => true
      )) as unknown as ContactPageEntry;

      if (!entry) {
        throw new Error("Contact page entry does not exist.");
      }

      return {
        meta: entry.meta.en as ContactPageEntryMeta,
      };
    },
  }),
});
