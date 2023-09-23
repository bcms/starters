import {
  FoodItemEntryMeta,
  MenuPageEntryMeta,
  SeasonEntryMeta,
} from '~~/bcms/types';

export interface SeasonalMenuPageData {
  meta: MenuPageEntryMeta;
  seasons: SeasonEntryMeta[];
  foodItems: FoodItemEntryMeta[];
}
