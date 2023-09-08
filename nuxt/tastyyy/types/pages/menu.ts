import {
  FoodItemEntryMeta,
  MealTypeEntryMeta,
  MenuPageEntryMeta,
} from '~~/bcms/types';

export interface MenuPageData {
  meta: MenuPageEntryMeta;
  mealTypes: MealTypeEntryMeta[];
  foodItems: FoodItemEntryMeta[];
}
