import { BlogEntry, HomePageEntry, HomePageEntryMeta } from "~~/bcms/types";
import {APIResponse, HomePageData} from "~~/types";
import { blogToLight } from "./blogs";
import {GenericApi} from "./_api-route";
export class HomeApi extends GenericApi{
  public async getHomePageData (): Promise<APIResponse<HomePageData>> {
    try {
      const entry = (await this.bcms.content.entry.findOne(
          "home_page",
          async () => true
      )) as unknown as HomePageEntry;

      if (!entry) {
        throw new Error("Home page entry does not exist.");
      }

      const blogs = (await this.bcms.content.entry.find("blog", async (e) =>
          entry.meta.en?.hero.featured_blogs.find(
              (i) => e.meta.en?.slug !== i.meta.en?.slug
          )
      )) as unknown as BlogEntry[];

      const data =  {
        meta: entry.meta.en as HomePageEntryMeta,
        blogs: blogToLight(
            blogs.sort((a, b) => (b.meta.en?.date || 0) - (a.meta.en?.date || 0))
        ).slice(0, 6),
      };

      return await this.handler<HomePageData>(data)

    } catch(error){
      console.error(error)
      throw new Error('Failed to fetch homepage data. something went wrong')
    }
  }
}
