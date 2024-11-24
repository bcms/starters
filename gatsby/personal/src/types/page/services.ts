import { ClientConfig } from '@thebcms/client';
import {
    ServiceEntry,
    ServicesPageEntryMetaItem,
} from '../../../bcms/types/ts';

export interface ServicesPageContent {
    meta: ServicesPageEntryMetaItem;
    services: ServiceEntry[];
    bcms: ClientConfig;
}
