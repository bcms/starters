import { ContactPageEntry, ContactPageEntryMeta } from "~~/bcms/types";
import {APIResponse, ContactPageData} from "~~/types";
import { GenericApi} from "./_api-route";

export class ContactApi extends GenericApi {
  public async getContactPage (): Promise<APIResponse<ContactPageData>> {
    const entry = (await this.bcms.content.entry.findOne(
        "contact_page",
        async () => true
    )) as unknown as ContactPageEntry;

    if (!entry) {
      throw new Error("Contact page entry does not exist.");
    }

    const data = {
      meta: entry.meta.en as ContactPageEntryMeta,
    };

    return this.handler<ContactPageData>(data)
  }
}
