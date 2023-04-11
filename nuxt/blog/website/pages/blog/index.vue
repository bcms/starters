<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="relative pt-10 pb-8 md:py-[72px] lg:pb-[100px] xl:pb-[128px]">
      <div class="container">
        <div>
          <div
            class="flex flex-col-reverse items-center text-center mb-8 md:gap-4 md:mb-10 lg:mb-12"
          >
            <h1
              class="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none"
            >
              {{ data.data.meta.title }}
            </h1>
            <h2
              class="text-sm leading-none tracking-[-0.41px] text-appGray-600 mb-2.5 md:text-base md:leading-none lg:text-xl lg:leading-none lg:mb-5"
            >
              {{ data.data.meta.subtitle }}
            </h2>
          </div>
          <div class="max-w-[848px] mx-auto">
            <form
              @submit.prevent
              class="flex items-center border border-appGray-100 rounded-[48px] px-4 mb-3 md:px-6 lg:px-8 lg:mb-6"
            >
              <SearchIcon
                class="w-[14px] h-[14px] mr-1.5 md:w-6 md:h-6 md:mr-2.5 lg:w-8 lg:h-6 lg:mr-[14px]"
              />
              <label class="w-full">
                <input
                  v-model="searchVal"
                  type="search"
                  placeholder="Search"
                  class="placeholder:text-appText bg-transparent py-[11px] text-sm leading-none tracking-[-0.41px] w-full focus:outline-none md:text-lg md:leading-none md:py-4 lg:text-2xl lg:leading-none lg:py-[21px]"
                />
              </label>
            </form>
            <div
              class="grid grid-cols-2 gap-2.5 md:grid-cols-3 lg:grid-cols-5 lg:gap-[18px]"
            >
              <button
                v-for="(category, index) in categories"
                :key="index"
                class="flex items-center justify-center w-full px-6 py-2.5 rounded-[32px] border transition-colors duration-300 text-xs leading-none tracking-[-0.41px] capitalize md:text-lg md:leading-none md:py-3 lg:text-2xl lg:leading-none lg:px-6 lg:py-[14px]"
                :class="
                  category === selectedCategory
                    ? 'border-appText bg-appText text-white'
                    : 'border-[#E0E0E0]'
                "
                @click="selectedCategory = category"
              >
                {{ category.toLowerCase() }}
              </button>
              <button
                @click="selectedCategory = ''"
                class="col-span-2 flex items-center justify-center w-full px-6 py-2.5 rounded-[32px] border transition-colors duration-300 text-xs leading-none tracking-[-0.41px] md:col-span-1 md:col-start-1 md:row-start-1 md:text-lg md:leading-none md:py-3 lg:text-2xl lg:leading-none lg:px-6 lg:py-[14px]"
                :class="
                  selectedCategory === ''
                    ? 'border-appText bg-appText text-white'
                    : 'border-[#E0E0E0]'
                "
              >
                All
              </button>
            </div>
          </div>
        </div>
      </div>
      <TopGradient />
    </div>
    <div class="container mb-8 md:mb-20 lg:mb-[104px]">
      <div
        v-if="filteredBlogs.length > 0 && selectedCategory"
        class="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 md:mb-20 lg:grid-cols-3 xl:gap-10 lg:mb-[128px]"
      >
        <BlogsCard
          v-for="blog in filteredBlogs"
          :key="blog.slug"
          :blog="blog"
        />
      </div>
      <div
        v-else-if="!filteredBlogs.length && selectedCategory"
        class="leading-none tracking-[-0.41px] text-center mb-8 md:mb-20 lg:text-lg lg:mb-[128px]"
      >
        There are no blogs for the applied filter in "{{
          selectedCategory.toLowerCase()
        }}"
      </div>
      <div>
        <h2
          class="leading-none font-medium tracking-[-0.41px] mb-7 md:text-2xl md:leading-none md:mb-10 lg:text-[32px] lg:leading-none lg:mb-12"
        >
          All posts
        </h2>
        <div
          class="grid grid-cols-1 auto-rows-fr gap-6 p-4 border border-appGray-300 rounded-2xl md:grid-cols-2 lg:grid-cols-3 xl:gap-10 xl:p-8"
        >
          <BlogsCard
            v-for="(blog, index) in data.data.blogs"
            :key="index"
            :blog="blog"
          />
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { APIResponse, BlogsPageData } from "~~/types";
import SearchIcon from "@/assets/icons/search.svg";

const { data } = useAsyncData(async (ctx) => {
  return await ctx?.$bcms.request<APIResponse<BlogsPageData>>({
    url: "/blogs.json",
  });
});

const { setOgHead } = useHeadTags();

const searchVal = ref("");
const selectedCategory = ref("");

const categories = computed(() => {
  return data.value?.data.blogs.reduce((acc, e) => {
    if (e.category.selected && !acc.includes(e.category.selected)) {
      acc.push(e.category.selected);
    }

    return acc;
  }, [] as string[]);
});

const filteredBlogs = computed(() => {
  return (
    data.value?.data.blogs.filter((e) => {
      let show = true;

      if (searchVal.value) {
        show =
          show && e.title.toLowerCase().includes(searchVal.value.toLowerCase());
      }
      if (selectedCategory.value) {
        show = show && e.category.selected === selectedCategory.value;
      }

      return show;
    }) || []
  );
});

useHead(() =>
  setOgHead({
    title: data.value?.data.meta.title,
  })
);
</script>
