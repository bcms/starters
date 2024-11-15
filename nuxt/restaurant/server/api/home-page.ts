import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import {
    FoodItemEntry,
    HomePageEntry,
    HomePageEntryMetaItem,
} from '~/bcms/types/ts';

export type HomePageResponse = {
    meta: HomePageEntryMetaItem;
    foodItems: FoodItemEntry[];
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const homePageEntry = (await bcms.entry.getBySlug(
        'home',
        'home-page',
    )) as HomePageEntry;

    const homePageMeta = homePageEntry.meta.en as HomePageEntryMetaItem;

    const foodItems = (await bcms.entry.getAll('food-item')) as FoodItemEntry[];

    const res: HomePageResponse = {
        meta: homePageMeta,
        foodItems,
        bcms: bcms.getConfig(),
    };

    return res;
});
