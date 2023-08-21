import { BCMSPropRichTextDataParsed } from "@becomes/cms-client/types";
import {
  AboutPageEntry,
  AboutPageEntryMeta,

} from "~~/bcms/types";
import {AboutPageData, APIResponse} from "~~/types";
import { GenericApi} from "./_api-route";
export class AboutApi extends GenericApi {
  public async getAboutPageData (): Promise<APIResponse<AboutPageData>> {
    try {
      const entry = (await this.bcms.content.entry.findOne(
          "about_page",
          async () => true
      )) as unknown as AboutPageEntry;

      if (!entry) {
        throw new Error("About page entry does not exist.");
      }

      const data = {
        meta: entry.meta.en as AboutPageEntryMeta,
        content: entry.content.en as BCMSPropRichTextDataParsed,
      }
      return await this.handler<AboutPageData>(data)

    } catch (error) {
      console.error(error)
      throw new Error('Failed to fetch about page data ')
    }

  }
}
