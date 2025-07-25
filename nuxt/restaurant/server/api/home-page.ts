import {
    FoodItemEntry,
    HomePageEntry,
    HomePageEntryMetaItem,
} from '~/bcms/type/ts';

export type HomePageResponse = {
    meta: HomePageEntryMetaItem;
    foodItems: FoodItemEntry[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const homePageEntry = (await bcms.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;

    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;

    const foodItems = (await bcms.entry.getAll('food-item')) as FoodItemEntry[];

    const res: HomePageResponse = {
        meta: homePageMeta,
        foodItems,
    };

    return res;
});
