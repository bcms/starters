<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="container pt-24 pb-8 md:pb-16 lg:pt-[104px] lg:pb-[120px]">
      <ContentManager
        :item="data.page.meta.headline"
        class="recipesPage--title text-xl leading-[1.2] font-medium text-center text-appGray-700 mb-8 md:text-3xl lg:text-[56px] lg:leading-[1.2] lg:mb-10"
      />
      <div
        class="relative z-10 grid grid-cols-2 gap-x-3 gap-y-[14px] mb-8 max-w-[608px] mx-auto lg:gap-6 lg:mb-24"
      >
        <RecipesSearch
          :value="searchValue"
          static
          size="lg"
          :show-results="false"
          class="col-span-2"
          @input="($event) => (searchValue = $event)"
        />
        <RecipesDropdown
          v-model="popularValue"
          :options="popularOptions"
          placeholder="Popular"
        />
        <RecipesDropdown
          v-model="categoriesValue"
          :options="categoriesOptions"
          placeholder="Categories"
        />
      </div>
      <div
        v-if="filteredRecipes.length > 0"
        ref="recipesListDOM"
        class="grid grid-cols-2 gap-x-5 gap-y-8 lg:grid-cols-3 xl:gap-x-12 xl:gap-y-16"
      >
        <RecipesCard
          v-for="(recipe, index) in filteredRecipes.slice(
            (paginationPage - 1) * recipesPerPage,
            (paginationPage - 1) * recipesPerPage + recipesPerPage,
          )"
          :key="recipe.slug + index"
          :card="recipe"
        />
      </div>
      <div
        v-else
        class="flex justify-center text-sm leading-none font-medium tracking-[-0.41px] text-appGray-500"
      >
        There are no recipes for the applied filters
      </div>
      <RecipesPagination
        :at-page="paginationPage"
        :page-count="totalPaginationPages"
        class="flex items-center justify-center gap-x-2 mt-6 lg:mt-10 lg:gap-x-4 xl:mt-[72px]"
        @page-change="($event) => (paginationPage = $event)"
      />
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import {
  RecipeEntry,
  RecipesPageEntry,
  RecipesPageEntryMeta,
} from '~~/bcms/types';
import { PageProps, RecipesPageData } from '~~/types';

const { setOgHead } = useHeadTags();
const route = useRoute();

const { data, error } = useAsyncData<PageProps<RecipesPageData>>(
  async (ctx) => {
    const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
    const recipesPage = (await ctx?.$bcms.entry.get({
      // Template name or ID
      template: 'recipes_page',
      // Entry slug or ID
      entry: 'recipes',
    })) as RecipesPageEntry;
    if (!recipesPage) {
      throw new Error('Recipes page entry does not exist.');
    }
    const recipes = (await ctx?.$bcms.entry.getAll({
      // Template name or ID
      template: 'recipe',
    })) as RecipeEntry[];

    return {
      header,
      footer,
      page: {
        meta: recipesPage.meta.en as RecipesPageEntryMeta,
        recipes: recipeToLight(recipes),
      },
    };
  },
);
if (error.value) {
  throw createError({
    statusCode: 500,
    statusMessage: error.value.message,
    stack: error.value.stack,
    fatal: true,
  });
}

const recipesListDOM = ref<HTMLElement>();

const searchValue = ref('');
const popularValue = ref('');
const categoriesValue = ref('');

const popularOptions = computed(() => {
  return (
    data.value?.page.recipes
      .filter((e) => e.popular)
      .reduce((acc, e) => {
        if (!acc.includes(e.title)) {
          acc.push(e.title);
        }
        return acc;
      }, [] as string[]) || []
  );
});

const categoriesOptions = computed(() => {
  return (
    data.value?.page.recipes.reduce((acc, e) => {
      e.categories.forEach((category) => {
        if (!acc.includes(category)) {
          acc.push(category);
        }
      });
      return acc;
    }, [] as string[]) || []
  );
});

const filteredRecipes = computed(() => {
  return (
    data.value?.page.recipes.filter((e) => {
      let show = true;

      if (searchValue.value) {
        show =
          show &&
          `${e.title} ${e.description}`
            .toLowerCase()
            .includes(searchValue.value.toLowerCase());
      }

      if (popularValue.value) {
        show = show && !!e.popular && e.title === popularValue.value;
      }

      if (categoriesValue.value) {
        show = show && !!e.categories.find((i) => i === categoriesValue.value);
      }

      return show;
    }) || []
  );
});

const paginationPage = ref(1);
const recipesPerPage = ref(8);

const totalPaginationPages = computed(() => {
  return Math.ceil((filteredRecipes.value.length || 0) / recipesPerPage.value);
});

const routeQueries = computed(() => {
  return route.query as {
    s?: string;
    p?: string;
    c?: string;
  };
});

watch(paginationPage, () => {
  if (recipesListDOM.value) {
    window.scrollTo({
      top: recipesListDOM.value.offsetTop - 50,
      behavior: 'smooth',
    });
  }
});

onMounted(() => {
  if (window.innerWidth >= 1024) {
    recipesPerPage.value = 12;
  }
  if (routeQueries.value.s) {
    searchValue.value = routeQueries.value.s;
  }
  if (routeQueries.value.p) {
    popularValue.value = routeQueries.value.p;
  }
  if (routeQueries.value.c) {
    categoriesValue.value = routeQueries.value.c;
  }
});

useHead(() =>
  setOgHead({
    title: data.value?.page.meta.title,
  }),
);
</script>

<style lang="scss">
.recipesPage--title {
  i {
    @apply font-PlayfairDisplay;
  }
}
</style>
