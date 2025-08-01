import {
    FoodItemEntry,
    FoodItemEntryMetaItem,
    MealTypeEntry,
    MealTypeEntryMetaItem,
    MenuPageEntry,
    MenuPageEntryMetaItem,
} from '~/bcms/type/ts';

export type MenuPageResponse = {
    meta: MenuPageEntryMetaItem;
    mealTypes: MealTypeEntryMetaItem[];
    foodItems: FoodItemEntryMetaItem[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
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

    const res: MenuPageResponse = {
        meta: menuPageMeta,
        mealTypes,
        foodItems,
    };

    return res;
});
