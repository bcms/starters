import 'swiper/css';
import {
    FoodItemEntry,
    FoodItemEntryMetaItem,
    MealTypeEntry,
    MealTypeEntryMetaItem,
    MenuPageEntry,
    MenuPageEntryMetaItem,
} from '@bcms-types/types/ts';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MenuMeals from '@/components/menu-page/Meals';
import { Suspense } from 'react';
import { bcmsPrivate } from '@/bcms-private';
import { bcmsPublic } from '@/bcms-public';

export async function generateMetadata(): Promise<Metadata> {
    const menuPageEntries = (await bcmsPrivate.entry.getBySlug(
        'menu',
        'menu-page',
    )) as MenuPageEntry;

    if (!menuPageEntries) {
        return notFound();
    }

    const menuPageMeta = menuPageEntries.meta.en as MenuPageEntryMetaItem;
    const pageTitle = `${menuPageMeta.seo?.title || menuPageMeta.title} - Tastyyy`;

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

const MenuPage: React.FC = async () => {
    const menuPageEntries = (await bcmsPrivate.entry.getBySlug(
        'menu',
        'menu-page',
    )) as MenuPageEntry;

    if (!menuPageEntries) {
        return notFound();
    }

    const menuPageMeta = menuPageEntries.meta.en as MenuPageEntryMetaItem;

    const mealTypes = (
        (await bcmsPrivate.entry.getAll('meal-type')) as MealTypeEntry[]
    ).map((e) => e.meta.en as MealTypeEntryMetaItem);
    const foodItems = (
        (await bcmsPrivate.entry.getAll('food-item')) as FoodItemEntry[]
    ).map((e) => e.meta.en as FoodItemEntryMetaItem);

    return (
        <div>
            <Suspense>
                <MenuMeals
                    meta={menuPageMeta}
                    meals={mealTypes}
                    foodItems={foodItems}
                    bcmsConfig={bcmsPublic.getConfig()}
                />
            </Suspense>
        </div>
    );
};

export default MenuPage;
