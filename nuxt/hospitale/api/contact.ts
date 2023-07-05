import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import {
  ContactPageEntry,
  ContactPageEntryMeta,
} from "~~/bcms/types/entry/contact_page";
import { ContactPageData } from "~~/types";
import { apiRoute } from "./_api-route";

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
