import { BCMSPropRichTextDataParsed } from "@becomes/cms-client/types";
import { JobEntryMeta } from "~~/bcms/types";

export interface JobLight {
  title: string;
  slug: string;
  location: string;
  description: BCMSPropRichTextDataParsed;
  type: string;
  featured: boolean;
}

export interface JobPageData {
  meta: JobEntryMeta;
  jobs: JobLight[];
}
