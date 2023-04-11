<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="relative pt-10 pb-8 md:py-[72px] lg:pb-[100px] xl:pb-[128px]">
      <div class="container">
        <div
          class="flex flex-col-reverse items-center text-center gap-2.5 mb-8 md:gap-4 md:mb-10 lg:gap-5 lg:mb-12"
        >
          <h1
            class="leading-none font-medium tracking-[-0.41px] md:text-2xl md:leading-none lg:text-[56px] lg:leading-none"
          >
            {{ data.data.meta.title }}
          </h1>
          <h2
            class="text-sm leading-none tracking-[-0.41px] text-appGray-600 md:text-base md:leading-none lg:text-xl lg:leading-none"
          >
            {{ data.data.meta.subtitle }}
          </h2>
        </div>
      </div>
    </div>
    <ContactPageForm :email="data.data.meta.email" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { APIResponse, ContactPageData } from "~~/types";

const { data } = useAsyncData(async (ctx) => {
  return await ctx?.$bcms.request<APIResponse<ContactPageData>>({
    url: "/contact.json",
  });
});

const { setOgHead } = useHeadTags();

useHead(() =>
  setOgHead({
    title: data.value?.data.meta.title,
  })
);
</script>
