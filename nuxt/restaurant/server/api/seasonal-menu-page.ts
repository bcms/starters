import { ClientConfig } from '@thebcms/client';
import { bcms } from '~/bcms-client';
import {
    FoodItemEntry,
    FoodItemEntryMetaItem,
    SeasonEntry,
    SeasonEntryMetaItem,
} from '~/bcms/types/ts';

export type SeasonalMenuPageResponse = {
    seasons: SeasonEntryMetaItem[];
    foodItems: FoodItemEntryMetaItem[];
    bcms: ClientConfig;
};

export default defineEventHandler(async () => {
    const seasons = ((await bcms.entry.getAll('season')) as SeasonEntry[]).map(
        (e) => e.meta.en as SeasonEntryMetaItem,
    );

    const foodItems = (
        (await bcms.entry.getAll('food-item')) as FoodItemEntry[]
    ).map((e) => e.meta.en as FoodItemEntryMetaItem);

    const res: SeasonalMenuPageResponse = {
        seasons,
        foodItems,
        bcms: bcms.getConfig(),
    };

    return res;
});
