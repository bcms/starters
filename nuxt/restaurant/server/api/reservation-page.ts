import {
    ReservationPageEntry,
    ReservationPageEntryMetaItem,
} from '~/bcms/type/ts';

export type ReservationPageResponse = {
    meta: ReservationPageEntryMetaItem;
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const reservationPage = (await bcms.entry.getBySlug(
        'reservation',
        'reservation-page',
    )) as ReservationPageEntry;

    const reservationPageMeta = reservationPage.meta
        .en as ReservationPageEntryMetaItem;

    const res: ReservationPageResponse = {
        meta: reservationPageMeta,
    };

    return res;
});
