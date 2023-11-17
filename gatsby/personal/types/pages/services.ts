import {
  ServiceItemEntryMeta,
  ServicesPageEntryMeta,
} from '../../../bcms/types';

export interface ServicesPageData {
  meta: ServicesPageEntryMeta;
  services: ServiceItemEntryMeta[];
}
