import { ClientConfig } from '@thebcms/client';
import { FoodItemEntry, HomePageEntryMetaItem } from '../../../bcms/types/ts';

export interface HomePageContent {
    meta: HomePageEntryMetaItem;
    foodItems: FoodItemEntry[];
    bcms: ClientConfig;
}
