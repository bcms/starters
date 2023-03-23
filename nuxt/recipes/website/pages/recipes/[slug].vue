<template>
  <PageWrapper
    v-if="data && recipeMeta"
    :header="data.header"
    :footer="data.footer"
  >
    <div class="pb-10 md:pb-16 lg:pb-[120px]">
      <div
        class="pt-24 mb-8 md:pt-6 lg:pb-6 lg:border-b lg:border-[#F0F0F0] lg:mb-14"
      >
        <div class="container">
          <div
            class="relative z-10 grid grid-cols-2 gap-x-3 gap-y-[14px] lg:grid-cols-4 lg:gap-x-4"
          >
            <RecipesSearch
              static
              size="lg"
              :show-results="false"
              class="col-span-2"
              @enter="($event) => (searchValue = $event)"
            />
            <RecipesDropdown
              v-model="popularValue"
              :options="data.data.popular"
              placeholder="Popular"
              dropdown-position="left"
            />
            <RecipesDropdown
              v-model="categoriesValue"
              :options="data.data.categories"
              placeholder="Categories"
              dropdown-position="left"
            />
          </div>
        </div>
      </div>
      <div class="container">
        <BCMSImage
          :media="recipeMeta.cover_image"
          :options="{
            sizes: {
              exec: [
                {
                  width: 768,
                  height: 768,
                },
                {
                  width: 1600,
                  height: 830,
                },
              ],
            },
          }"
          class="aspect-square rounded-2xl overflow-hidden cover mb-5 md:aspect-[1.93] lg:mb-10"
        />
        <h1
          class="leading-none font-medium tracking-[-0.41px] text-appGray-700 mb-[14px] lg:text-[40px] lg:leading-none lg:mb-6"
        >
          {{ recipeMeta.title }}
        </h1>
        <!-- :item="truncatedDescription(recipeMeta.extended_description)" -->
        <ContentManager
          :item="recipeMeta.extended_description"
          class="recipePage--description text-sm leading-[1.55] font-medium tracking-[-0.41px] text-[#86838C] mb-6 lg:text-lg lg:mb-8"
        />
        <div class="flex flex-wrap gap-3 mb-8 lg:gap-4">
          <div
            class="bg-[#F7F7F7] rounded-[40px] px-5 py-[13px] text-sm leading-none font-medium tracking-[-0.41px]"
          >
            <span class="text-appGray-700">Total: </span>
            <span class="text-[#9C9C9C]">{{ recipeMeta.cook_time }}</span>
          </div>
          <div
            class="bg-[#F7F7F7] rounded-[40px] px-5 py-[13px] text-sm leading-none font-medium tracking-[-0.41px]"
          >
            <span class="text-appGray-700">Ingredients: </span>
            <span class="text-[#9C9C9C]">
              {{ recipeMeta.ingredients.length }} items
            </span>
          </div>
          <div
            class="bg-[#F7F7F7] rounded-[40px] px-5 py-[13px] text-sm leading-none font-medium tracking-[-0.41px]"
          >
            <span class="text-appGray-700">Steps: </span>
            <span class="text-[#9C9C9C]">
              {{ recipeMeta.steps.length }} steps
            </span>
          </div>
        </div>
        <div class="grid grid-cols-1 gap-2 mb-8 lg:mb-16">
          <RecipesQAItem
            v-for="(item, index) in recipeMeta.qa"
            :key="index"
            :item="item"
          />
        </div>
        <RecipesIngredients :ingredients="recipeMeta.ingredients" />
        <RecipesSteps :steps="recipeMeta.steps" />
        <div v-if="similarRecipes.length > 0">
          <div
            class="flex items-center justify-between leading-none font-medium tracking-[-0.41px] text-appGray-700 mb-8 lg:text-2xl lg:leading-none lg:mb-12"
          >
            <h2>Other recipes you may like</h2>
            <NuxtLink to="/recipes"> Show all </NuxtLink>
          </div>
          <div
            class="grid grid-cols-2 gap-x-5 gap-y-8 lg:gap-x-16 lg:gap-y-[72px]"
          >
            <RecipesCard
              v-for="(card, index) in similarRecipes"
              :key="index"
              :card="card"
              showTitleLayer
            />
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { BCMSImage } from "~~/bcms-components";
import { APIResponse, RecipePageData } from "~~/types";

const route = useRoute();
const router = useRouter();

const recipeSlug = route.params.slug as string;

const { data } = useAsyncData(async (ctx) => {
  return await ctx?.$bcms.request<APIResponse<RecipePageData>>({
    url: `/recipes/${recipeSlug}/data.json`,
  });
});

const searchValue = ref("");
const popularValue = ref("");
const categoriesValue = ref("");

// const expandDescription = ref(false);

const recipeMeta = computed(() => {
  return data.value?.data.meta;
});

const similarRecipes = computed(() => {
  return data.value?.data.similarRecipes || [];
});

// const truncatedDescription = (description: BCMSPropRichTextDataParsed) => {
//   const content = description.reduce((acc, e) => {
//     acc += e.value;

//     return acc;
//   }, "");
//   return description;
// };

const filterRedirect = (key: string, val: string) => {
  if (val) {
    router.push({
      name: "recipes",
      query: {
        [key]: val,
      },
    });
  }
};

watch(searchValue, (newVal) => {
  filterRedirect("s", newVal);
});
watch(popularValue, (newVal) => {
  filterRedirect("p", newVal);
});
watch(categoriesValue, (newVal) => {
  filterRedirect("c", newVal);
});

useHead({
  title: data.value?.data.meta.title,
});
</script>

<style lang="scss">
.recipePage--description {
  u {
    @apply font-semibold text-appGray-700;
  }
}
</style>
