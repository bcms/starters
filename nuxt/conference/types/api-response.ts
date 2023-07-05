import { HeaderEntryMeta } from "~~/bcms/types";
import { FooterPageData } from "./footer";

export interface APIResponse<Data = unknown> {
  data: Data;
  header: HeaderEntryMeta;
  footer: FooterPageData;
}
