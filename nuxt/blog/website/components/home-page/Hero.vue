<template>
  <section class="relative pt-10 pb-8 md:py-[72px] lg:pb-[100px] xl:pb-[128px]">
    <div class="container">
      <div
        class="flex flex-col-reverse items-center text-center gap-2.5 mb-8 md:gap-4 md:mb-10 lg:gap-5 lg:mb-12"
      >
        <h1
          class="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none"
        >
          {{ data.title }}
        </h1>
        <h2
          class="text-sm leading-none tracking-[-0.41px] text-appGray-600 md:text-base md:leading-none lg:text-xl lg:leading-none"
        >
          {{ data.subtitle }}
        </h2>
      </div>
      <form
        @submit.prevent
        class="flex items-center border border-appGray-100 rounded-[48px] px-4 max-w-[848px] mx-auto mb-8 md:px-6 md:mb-16 lg:px-8 lg:mb-24"
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
      <div class="grid grid-cols-2 gap-4 auto-rows-fr md:gap-8 lg:gap-12">
        <NuxtLink
          v-for="(blog, index) in lightBlogs"
          :key="index"
          :to="`/blogs/${blog.slug}`"
          class="group relative rounded-lg overflow-hidden"
          :class="[
            index > 0 && index % 2 === 0
              ? 'col-span-2'
              : 'aspect-square lg:aspect-[1.17]',
          ]"
        >
          <div class="relative z-10 flex flex-col p-4 h-full md:p-7 lg:p-10">
            <h3
              class="text-sm leading-none font-medium tracking-[-0.41px] text-white group-hover:underline md:text-xl md:leading-none lg:text-[32px] lg:leading-none"
            >
              {{ blog.title }}
            </h3>
            <div class="flex items-end justify-between mt-auto">
              <ContentManager
                :item="blog.description"
                class="text-xs leading-[1.2] tracking-[-0.41px] text-white line-clamp-3 max-w-[150px] md:text-base md:leading-[1.2] md:max-w-[568px] lg:text-xl lg:leading-none"
              />
              <div
                v-if="index > 0 && index % 2 === 0"
                class="text-xs font-medium leading-none tracking-[-0.41px] text-appGray-200 md:text-base md:leading-none lg:text-xl lg:leading-none"
              >
                {{ dateUtil.format(blog.date) }}
              </div>
            </div>
          </div>
          <BCMSImage
            :media="blog.cover"
            class="absolute top-0 left-0 w-full h-full cover"
          />
          <div class="absolute top-0 left-0 w-full h-full bg-black/40" />
        </NuxtLink>
      </div>
    </div>
    <TopGradient class="max-md:hidden" />
  </section>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { BlogEntryMeta, HomeHeroGroup } from "~~/bcms/types";
import SearchIcon from "@/assets/icons/search.svg";
import { BlogLight } from "~~/types";
import { BCMSImage } from "~~/bcms-components";

const props = defineProps({
  data: {
    type: Object as PropType<HomeHeroGroup>,
    required: true,
  },
});

const searchVal = ref("");

const lightBlogs = computed<BlogLight[]>(() =>
  props.data.featured_blogs.map((e) => {
    const meta = e.meta.en as BlogEntryMeta;

    return {
      title: meta.title,
      slug: meta.slug,
      description: meta.description,
      cover: meta.cover,
      date: meta.date,
    };
  })
);
</script>
