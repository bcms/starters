import {
  FoodItemEntryMeta,
  MealTypeEntryMeta,
  MenuPageEntryMeta,
} from '@/bcms/types';

export interface MenuPageData {
  meta: {
    en: MenuPageEntryMeta
  };
  mealTypes: MealTypeEntryMeta[];
  foodItems: FoodItemEntryMeta[];
}
