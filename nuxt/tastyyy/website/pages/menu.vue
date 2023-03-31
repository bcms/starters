<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <section
      class="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]"
    >
      <div class="container max-w-[1198px]">
        <ArchWithStar />
        <div
          class="relative px-4 max-w-[400px] mx-auto lg:max-w-[745px] xl:px-0"
        >
          <h1
            class="text-xl leading-none font-Gloock uppercase text-center mb-8 lg:text-5xl lg:leading-none"
          >
            {{ data.data.meta.title }}
          </h1>
          <div class="mb-10 lg:mb-20">
            <div
              class="grid grid-cols-2 gap-x-3 gap-y-4 mb-8 md:flex md:items-center md:justify-center lg:gap-4 lg:mb-10"
            >
              <button
                v-for="(mealType, index) in data.data.mealTypes"
                :key="index"
                class="flex justify-center w-full px-[18px] py-3 border rounded-[32px] transition-colors duration-300 lg:max-w-max"
                :class="[
                  mealType.title.toLowerCase() === activeMealType
                    ? 'border-appAccent bg-appAccent text-appBody'
                    : 'border-appText',
                ]"
                @click="activeMealType = mealType.title.toLowerCase()"
              >
                <span
                  class="text-xs leading-none tracking-[-0.41px] lg:text-base lg:leading-none"
                >
                  {{ mealType.title }}
                </span>
              </button>
            </div>
            <ContentManager
              :item="activeMealTypeDescription"
              class="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-700 lg:text-base lg:leading-[1.3]"
            />
          </div>
        </div>
      </div>
      <div v-if="filteredFoodItems.length > 0" class="grid grid-cols-1">
        <div
          v-for="item in filteredFoodItems"
          :key="item.slug"
          class="relative px-6 py-[42px] md:py-20 lg:py-[130px]"
        >
          <div
            class="relative z-10 flex flex-col items-center justify-center text-center h-full"
          >
            <h3
              class="text-sm leading-none uppercase text-white font-Gloock max-w-[480px] mb-[14px] lg:text-[32px] lg:leading-none lg:mb-[18px]"
            >
              {{ item.title }}
            </h3>
            <ContentManager
              :item="item.description"
              class="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-100 max-w-[480px] mb-4 lg:text-base lg:leading-[1.3] lg:mb-6"
            />
            <div
              class="px-6 py-[13px] flex max-w-max bg-[#9BA58F] rounded-[32px] text-sm leading-none text-white tracking-[-0.41px] lg:px-[18px] lg:py-3 lg:text-sm lg:leading-none"
            >
              ${{ item.price }}
            </div>
          </div>
          <BCMSImage
            :media="item.cover"
            class="absolute top-0 left-0 w-full h-full cover"
          />
          <div class="absolute top-0 left-0 w-full h-full bg-black/40" />
        </div>
      </div>
      <div
        v-else
        class="text-sm leading-none tracking-[-0.41px] text-center text-appGray-700 my-20"
      >
        No menu item found
      </div>
    </section>
  </PageWrapper>
</template>

<script setup lang="ts">
import { BCMSImage } from "~~/bcms-components";
import { APIResponse, MenuPageData } from "~~/types";

const { data } = useAsyncData(async (ctx) => {
  return await ctx?.$bcms.request<APIResponse<MenuPageData>>({
    url: "/menu.json",
  });
});

const { setOgHead } = useHeadTags();

const activeMealType = ref("breakfast");

const activeMealTypeDescription = computed(() => {
  return (
    data.value?.data.mealTypes.find(
      (mealType) => mealType.title.toLowerCase() === activeMealType.value
    )?.description || []
  );
});

const filteredFoodItems = computed(() => {
  return (
    data.value?.data.foodItems.filter((item) => {
      return item.type.find(
        (e) => e.meta.en?.title.toLowerCase() === activeMealType.value
      );
    }) || []
  );
});

useHead(() =>
  setOgHead({
    title: data.value?.data.meta.title,
  })
);
</script>
