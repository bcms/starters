import { bcms } from '@/bcms-client';
import 'swiper/css';
import {
    ReservationPageEntry,
    ReservationPageEntryMetaItem,
} from '@bcms-types/types/ts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ReservationForm from '@/components/reservation-page/Form';

export async function generateMetadata(): Promise<Metadata> {
    const reservationPage = (await bcms.entry.getBySlug(
        'reservation',
        'reservation-page',
    )) as ReservationPageEntry;

    if (!reservationPage) {
        return notFound();
    }

    const reservationPageMeta = reservationPage.meta
        .en as ReservationPageEntryMetaItem;
    const pageTitle = `${reservationPageMeta.seo?.title || reservationPageMeta.title} - Tastyyy`;

    return {
        title: pageTitle,
        openGraph: {
            title: pageTitle,
        },
        twitter: {
            title: pageTitle,
        },
    };
}

const ReservationPage: React.FC = async () => {
    const reservationPage = (await bcms.entry.getBySlug(
        'reservation',
        'reservation-page',
    )) as ReservationPageEntry;

    if (!reservationPage) {
        return notFound();
    }

    const reservationPageMeta = reservationPage.meta
        .en as ReservationPageEntryMetaItem;

    return (
        <div>
            <ReservationForm title={reservationPageMeta.title} />
        </div>
    );
};

export default ReservationPage;
