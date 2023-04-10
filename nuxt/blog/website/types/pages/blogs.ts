import {
  BCMSPropMediaDataParsed,
  BCMSPropRichTextDataParsed,
} from "@becomes/cms-client/types";

export interface BlogLight {
  title: string;
  slug: string;
  cover: BCMSPropMediaDataParsed;
  description: BCMSPropRichTextDataParsed;
  date: number;
}
