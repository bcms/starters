import { bcms } from '@/bcms-client';
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
    const seasons = ((await bcms.entry.getAll('season')) as SeasonEntry[]).map(
        (e) => e.meta.en as SeasonEntryMetaItem,
    );

    const foodItems = (
        (await bcms.entry.getAll('food-item')) as FoodItemEntry[]
    ).map((e) => e.meta.en as FoodItemEntryMetaItem);

    return (
        <div>
            <Suspense>
                <Seasons
                    seasons={seasons}
                    foodItems={foodItems}
                    bcmsConfig={bcms.getConfig()}
                />
            </Suspense>
        </div>
    );
};

export default SeasonalMenuPage;
