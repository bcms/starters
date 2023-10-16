<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <section
      class="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]"
    >
      <div class="container max-w-[1198px]">
        <ArchWithStar />
        <div
          class="relative px-4 max-w-[400px] mx-auto lg:max-w-[560px] xl:px-0"
        >
          <h1
            class="text-xl leading-none font-Gloock uppercase text-center mb-8 lg:text-5xl lg:leading-none lg:mb-20"
          >
            {{ data.page.meta.title }}
          </h1>
          <ContentManager
            :item="data.page.meta.description"
            class="contactPage--description text-sm leading-[1.3] tracking-[-0.41px] uppercase text-center text-appGray-700 mb-8 lg:text-base lg:leading-[1.3] lg:mb-12"
          />
          <div class="bg-[#E5E4DA] rounded-2xl p-4 mb-8 lg:mb-10">
            <BCMSImage
              :media="data.page.meta.map"
              :options="{
                sizes: {
                  exec: [
                    {
                      width: 1078,
                      height: 678,
                    },
                  ],
                },
              }"
              class="w-full h-auto cover rounded-[10px] overflow-hidden pointer-events-auto"
            />
          </div>
          <Btn
            to="https://www.google.com/maps"
            target="_blank"
            class="uppercase max-w-max mx-auto"
          >
            <span>Open maps</span>
          </Btn>
        </div>
      </div>
    </section>
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { BCMSImage } from '~~/bcms-components';
import { ContactPageEntry, ContactPageEntryMeta } from '~~/bcms/types';
import { ContactPageData } from '~~/types';
import { PageProps } from '~~/types/page-props';

const { data, error } = useAsyncData<PageProps<ContactPageData>>(
  async (ctx) => {
    const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
    const contactPage = (await ctx?.$bcms.entry.get({
      // Template name or ID
      template: 'contact_page',
      // Entry slug or ID
      entry: 'contact-us',
    })) as ContactPageEntry;
    if (!contactPage) {
      throw new Error('Contact page entry does not exist.');
    }
    return {
      header,
      footer,
      page: {
        meta: contactPage.meta.en as ContactPageEntryMeta,
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

const { setOgHead } = useHeadTags();

useHead(() =>
  setOgHead({
    title: data.value?.page.meta.seo?.title || data.value?.page.meta.title,
    description: data.value?.page.meta.seo?.description,
  }),
);
</script>

<style lang="scss">
.contactPage--description {
  a {
    @apply lowercase;
  }
}
</style>
