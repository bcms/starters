import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import {
    FoodItemEntry,
    FoodItemEntryMetaItem,
    MealTypeEntry,
    MealTypeEntryMetaItem,
    MenuPageEntry,
    MenuPageEntryMetaItem,
} from '~/bcms/types/ts';

export type ReservationPageResponse = {
    meta: MenuPageEntryMetaItem;
    mealTypes: MealTypeEntryMetaItem[];
    foodItems: FoodItemEntryMetaItem[];
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const menuPageEntries = (await bcms.entry.getBySlug(
        'menu',
        'menu-page',
    )) as MenuPageEntry;

    const menuPageMeta = menuPageEntries.meta.en as MenuPageEntryMetaItem;

    const mealTypes = (
        (await bcms.entry.getAll('meal-type')) as MealTypeEntry[]
    ).map((e) => e.meta.en as MealTypeEntryMetaItem);
    const foodItems = (
        (await bcms.entry.getAll('food-item')) as FoodItemEntry[]
    ).map((e) => e.meta.en as FoodItemEntryMetaItem);

    const res: ReservationPageResponse = {
        meta: menuPageMeta,
        mealTypes,
        foodItems,
        bcms: bcms.getConfig(),
    };

    return res;
});
