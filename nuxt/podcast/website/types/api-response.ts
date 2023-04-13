import { FooterEntryMeta } from "~~/bcms/types/entry/footer";
import { HeaderEntryMeta } from "~~/bcms/types/entry/header";

export interface APIResponse<Data = unknown> {
  data: Data;
  header: HeaderEntryMeta;
  footer: FooterEntryMeta;
}
