import { ClientConfig } from '@thebcms/client';
import {
    FoodItemEntryMetaItem,
    SeasonEntryMetaItem,
} from '../../../bcms/types/ts';

export interface SeasonalMenuPageContent {
    seasons: SeasonEntryMetaItem[];
    foodItems: FoodItemEntryMetaItem[];
    bcms: ClientConfig;
}
