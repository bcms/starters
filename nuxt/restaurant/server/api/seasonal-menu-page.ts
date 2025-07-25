import {
    FoodItemEntry,
    FoodItemEntryMetaItem,
    SeasonEntry,
    SeasonEntryMetaItem,
} from '~/bcms/type/ts';

export type SeasonalMenuPageResponse = {
    seasons: SeasonEntryMetaItem[];
    foodItems: FoodItemEntryMetaItem[];
};

export default defineEventHandler(async () => {
    const bcms = useBcmsPrivate();
    const seasons = ((await bcms.entry.getAll('season')) as SeasonEntry[]).map(
        (e) => e.meta.en as SeasonEntryMetaItem,
    );

    const foodItems = (
        (await bcms.entry.getAll('food-item')) as FoodItemEntry[]
    ).map((e) => e.meta.en as FoodItemEntryMetaItem);

    const res: SeasonalMenuPageResponse = {
        seasons,
        foodItems,
    };

    return res;
});
