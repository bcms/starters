import { ClientConfig } from '@thebcms/client';
import {
    ServiceEntry,
    ServicesPageEntryMetaItem,
} from '../../../bcms/types/ts';

export interface ServicesPageContent {
    meta: ServicesPageEntryMetaItem;
    entries: ServiceEntry[];
    bcms: ClientConfig;
}
