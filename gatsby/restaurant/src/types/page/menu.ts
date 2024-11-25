import { ClientConfig } from '@thebcms/client';
import {
    FoodItemEntryMetaItem,
    MealTypeEntryMetaItem,
    MenuPageEntryMetaItem,
} from '../../../bcms/types/ts';

export interface MenuPageContent {
    meta: MenuPageEntryMetaItem;
    mealTypes: MealTypeEntryMetaItem[];
    foodItems: FoodItemEntryMetaItem[];
    bcms: ClientConfig;
}
