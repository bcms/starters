import { BCMSPropRichTextDataParsed } from "@becomes/cms-client/types";

export interface JobLight {
  title: string;
  slug: string;
  location: string;
  description: BCMSPropRichTextDataParsed;
  type: string;
  featured: boolean;
}
