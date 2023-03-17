import { HeaderEntryMeta } from "~~/bcms/types";

export interface APIResponse<Data = unknown> {
  data: Data;
  header: HeaderEntryMeta;
}
