import { ClientConfig } from '@thebcms/client';
import { ReservationPageEntryMetaItem } from '../../../bcms/types/ts';

export interface ReservationPageContent {
    meta: ReservationPageEntryMetaItem;
    bcms: ClientConfig;
}
