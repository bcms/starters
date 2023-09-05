<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]">
      <div class="container">
        <AnimatedTitle
          :title="data.page.meta.title"
          class="mb-10 md:mb-20 lg:mb-[124px]"
          title-class="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
        />
        <div
          class="flex flex-wrap justify-center gap-4 mb-12 max-w-[856px] mx-auto lg:gap-6 lg:mb-[170px]"
        >
          <button
            v-for="(item, index) in data.page.items"
            :key="index"
            class="flex"
            @click="activeItemIndex = index"
          >
            <BCMSImage
              :media="item.author.avatar"
              :options="{
                sizes: {
                  exec: [
                    {
                      width: 100,
                      height: 100,
                    },
                  ],
                },
              }"
              class="w-10 h-10 rounded-full overflow-hidden cover transition-all duration-300 lg:w-16 lg:h-16"
              :class="[activeItemIndex === index ? 'scale-125' : 'opacity-20']"
            />
          </button>
        </div>
        <div
          class="flex flex-col items-center text-center max-w-[1194px] mx-auto mb-6 lg:mb-12"
        >
          <h3
            class="text-xl leading-none tracking-[-0.41px] font-Helvetica mb-[14px] lg:text-[32px] lg:mb-10"
          >
            {{ activeItem?.author.name }}
          </h3>
          <ContentManager
            :item="activeItem?.content || []"
            class="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-500 lg:text-[32px]"
          />
        </div>
        <div class="flex items-center gap-2 lg:gap-6">
          <button
            v-for="(_, index) in data.page.items"
            :key="index"
            class="relative h-0.5 transition-all duration-300 after:absolute after:left-0 after:top-1/2 after:-translate-y-1/2 after:w-full after:h-5 lg:h-1"
            :class="[
              activeItemIndex === index
                ? 'flex-[3] bg-[#2B261E]'
                : 'flex-1 bg-[#F0F0F0]',
            ]"
            @click="activeItemIndex = index"
          />
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { BCMSImage } from '~~/bcms-components';
import { NuxtApp } from 'nuxt/app';
import { TestimonialItemEntry, TestimonialsPageEntry } from '@/bcms/types';
import { PageProps, TestimonialsPageData } from '~~/types';
import { getHeaderAndFooter } from '@/utils/page-props';

const { data, error } = useAsyncData<PageProps<TestimonialsPageData>>(
  async (ctx) => {
    const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
    const testimonialsPage = (await ctx?.$bcms.entry.get({
      // Template name or ID
      template: 'testimonials_page',
      // Entry slug or ID
      entry: 'testimonials',
    })) as TestimonialsPageEntry;
    if (!testimonialsPage) {
      throw new Error('Testimonials page entry does not exist.');
    }
    const testimonialItems = (await ctx?.$bcms.entry.getAll({
      // Template name or ID
      template: 'testimonial_item',
    })) as TestimonialItemEntry[];
    return {
      header,
      footer,
      page: {
        meta: testimonialsPage.meta.en,
        items: testimonialItems.map((item) => item.meta.en),
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

const activeItemIndex = ref(0);

const activeItem = computed(() => {
  return data.value?.page.items[activeItemIndex.value];
});

const { setOgHead } = useHeadTags();

useHead(() =>
  setOgHead({
    title: data.value?.page.meta.title,
  }),
);
</script>
