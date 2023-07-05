import { HeaderEntryMeta } from "~~/bcms/types";
import { FooterEntryMeta } from "~~/bcms/types/entry/footer";

export interface APIResponse<Data = unknown> {
  data: Data;
  header: HeaderEntryMeta;
  footer: FooterEntryMeta;
}
