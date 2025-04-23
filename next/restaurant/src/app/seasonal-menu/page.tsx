import 'swiper/css';
import {
    FoodItemEntry,
    FoodItemEntryMetaItem,
    SeasonEntry,
    SeasonEntryMetaItem,
} from '@bcms-types/types/ts';
import { Metadata } from 'next';
import { Seasons } from '@/components/seasonal-menu-page/Seasons';
import { Suspense } from 'react';
import { bcmsPrivate } from '@/bcms-private';
import { bcmsPublic } from '@/bcms-public';

export async function generateMetadata(): Promise<Metadata> {
    const pageTitle = `Seasonal Menu - Tastyyy`;

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

const SeasonalMenuPage: React.FC = async () => {
    const seasons = (
        (await bcmsPrivate.entry.getAll('season')) as SeasonEntry[]
    ).map((e) => e.meta.en as SeasonEntryMetaItem);

    const foodItems = (
        (await bcmsPrivate.entry.getAll('food-item')) as FoodItemEntry[]
    ).map((e) => e.meta.en as FoodItemEntryMetaItem);

    return (
        <div>
            <Suspense>
                <Seasons
                    seasons={seasons}
                    foodItems={foodItems}
                    bcmsConfig={bcmsPublic.getConfig()}
                />
            </Suspense>
        </div>
    );
};

export default SeasonalMenuPage;
