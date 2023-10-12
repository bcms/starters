<template>
  <PageWrapper v-if="data && meta" :header="data.header" :footer="data.footer">
    <div class="pt-8 pb-14 md:pb-20 lg:pt-0 lg:pb-[120px]">
      <BCMSImage
        :media="meta.cover"
        class="w-full aspect-[2.76] cover object-top mb-8 md:mb-20 lg:aspect-[3.1] lg:mb-[120px]"
      />
      <div class="container">
        <h1
          class="text-2xl leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] text-center mb-6 lg:text-5xl lg:leading-none lg:mb-16"
        >
          {{ meta.title }}
        </h1>
        <div class="aboutUs--content text-center mb-12 md:mb-20 lg:mb-[120px]">
          <template v-for="(item, index) in meta.content" :key="index">
            <ContentManager
              v-if="item.text && item.text.length > 0"
              :key="index"
              :item="item.text"
              class="leading-normal font-medium tracking-[-0.41px] text-appGray-600 lg:text-[32px] lg:leading-normal"
            />
            <BCMSImage
              v-if="item.image"
              :key="index"
              :options="{
                sizes: {
                  exec: [
                    {
                      width: 112,
                      height: 48,
                    },
                    {
                      width: 224,
                      height: 96,
                    },
                  ],
                },
              }"
              :media="item.image"
              class="image cover w-[37px] h-4 flex-shrink-0 mx-1 translate-y-0.5 bg-center bg-cover lg:w-[112px] lg:h-12 lg:mx-3 lg:translate-y-3"
            />
          </template>
        </div>
      </div>
      <AboutPageTeam :data="meta.team" :members="data.page.team" />
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { BCMSImage } from '@/bcms-components';
import { AboutPageData, PageProps } from '@/types';
import {
  AboutPageEntry,
  AboutPageEntryMeta,
  TeamMemberEntry,
  TeamMemberEntryMeta,
} from '@/bcms/types';

const { data, error } = useAsyncData<PageProps<AboutPageData>>(async (ctx) => {
  const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
  const aboutPage = (await ctx?.$bcms.entry.get({
    template: 'about_page',
    entry: 'about-us',
  })) as AboutPageEntry;
  if (!aboutPage) {
    throw new Error('About page entry does not exist.');
  }
  const teamMembers = (await ctx?.$bcms.entry.getAll({
    template: 'team_member',
  })) as TeamMemberEntry[];
  return {
    header,
    footer,
    page: {
      meta: aboutPage.meta.en as AboutPageEntryMeta,
      team: teamMembers.map(
        (teamMember) => teamMember.meta.en as TeamMemberEntryMeta,
      ),
    },
  };
});
if (error.value) {
  throw createError({
    statusCode: 500,
    statusMessage: error.value.message,
    stack: error.value.stack,
    fatal: true,
  });
}

const { setOgHead } = useHeadTags();

const meta = computed(() => {
  return data.value?.page.meta;
});

useHead(() =>
  setOgHead({
    title: data.value?.page.meta.seo?.title || data.value?.page.meta.title,
    description: data.value?.page.meta.seo?.description,
  }),
);
</script>

<style lang="scss">
.aboutUs--content {
  * {
    @apply inline;
  }
  .image {
    @apply inline-block;
    picture {
      @apply flex;
    }
  }
  strong {
    @apply text-[#48465F];
  }
  u {
    @apply text-appText;
  }
}
</style>
