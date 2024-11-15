import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import {
    ReservationPageEntry,
    ReservationPageEntryMetaItem,
} from '~/bcms/types/ts';

export type ReservationPageResponse = {
    meta: ReservationPageEntryMetaItem;
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const reservationPage = (await bcms.entry.getBySlug(
        'reservation',
        'reservation-page',
    )) as ReservationPageEntry;

    const reservationPageMeta = reservationPage.meta
        .en as ReservationPageEntryMetaItem;

    const res: ReservationPageResponse = {
        meta: reservationPageMeta,
        bcms: bcms.getConfig(),
    };

    return res;
});
