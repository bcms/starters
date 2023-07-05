import { createBcmsMostServerRoutes } from "@becomes/cms-most";
import {
  RecipeEntry,
  RecipeEntryMeta,
  RecipesPageEntry,
  RecipesPageEntryMeta,
} from "~~/bcms/types";
import { RecipeLight, RecipesPageData, RecipePageData } from "~~/types";
import { apiRoute } from "./_api-route";

export const recipeToLight = (recipes: RecipeEntry[]): RecipeLight[] => {
  return recipes.map((e) => {
    const meta = e.meta.en as RecipeEntryMeta;

    return {
      title: meta.title,
      slug: meta.slug,
      cover: meta.cover_image,
      categories: meta.categories.map((i) => i.meta.en?.title || ""),
      description: meta.description,
      popular: meta.popular,
    };
  });
};

export const RecipesApi = createBcmsMostServerRoutes({
  "/recipes/:slug/data.json": apiRoute<RecipePageData>({
    method: "get",
    async handler({ bcms, params }) {
      const entry = (await bcms.content.entry.findOne(
        "recipe",
        async (e) => e.meta.en.slug === params.slug
      )) as unknown as RecipeEntry;

      if (!entry) {
        throw new Error("Recipe page entry does not exist.");
      }

      const recipes = (await bcms.content.entry.find(
        "recipe",
        async () => true
      )) as unknown as RecipeEntry[];

      const similarRecipes = recipes.filter((e) => {
        const entryCategories =
          entry.meta.en?.categories.map((i) => i.meta.en?.title) || [];
        const categories =
          e.meta.en?.categories.map((i) => i.meta.en?.title) || [];

        for (let i = 0; i < categories.length; i++) {
          if (
            entryCategories.includes(categories[i]) &&
            entry.meta.en?.slug !== e.meta.en?.slug
          ) {
            return true;
          }
        }
        return false;
      });

      return {
        meta: entry.meta.en as RecipeEntryMeta,
        similarRecipes: recipeToLight(similarRecipes).slice(0, 6),
        popular:
          recipes
            .filter((e) => e.meta.en?.popular)
            .map((e) => e.meta.en?.title || "") || [],
        categories:
          recipes.reduce((acc, e) => {
            e.meta.en?.categories.forEach((category) => {
              const categoryTitle = category.meta.en?.title || "";

              if (!acc.includes(categoryTitle)) {
                acc.push(categoryTitle);
              }
            });
            return acc;
          }, [] as string[]) || [],
      };
    },
  }),
  "/recipes.json": apiRoute<RecipesPageData>({
    method: "get",
    async handler({ bcms }) {
      const entry = (await bcms.content.entry.findOne(
        "recipes_page",
        async () => true
      )) as unknown as RecipesPageEntry;

      const recipes = (await bcms.content.entry.find(
        "recipe",
        async () => true
      )) as unknown as RecipeEntry[];

      if (!entry) {
        throw new Error("Recipes page entry does not exist.");
      }

      return {
        meta: entry.meta.en as RecipesPageEntryMeta,
        recipes: recipeToLight(recipes),
      };
    },
  }),
});
