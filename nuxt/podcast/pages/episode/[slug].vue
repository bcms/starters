<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <h1 class="sr-only">{{ data.page.meta.title }}</h1>
    <div
      class="container relative z-10 pt-20 pb-10 lg:pt-[104px] lg:pb-[128px]"
    >
      <div
        class="relative aspect-square rounded overflow-hidden mb-5 md:aspect-[2.47] lg:rounded-2xl lg:mb-10"
      >
        <div
          class="absolute z-10 bottom-10 left-10 text-[56px] leading-none tracking-[-2.41px] font-medium max-lg:hidden"
        >
          {{ data.page.meta.title }}
        </div>
        <div
          class="absolute z-10 bottom-6 right-6 leading-none tracking-[-0.8px] font-medium lg:hidden"
        >
          {{ fileLength }}
        </div>
        <button
          class="absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center w-12 h-12 bg-appText rounded-full lg:hidden"
        >
          <PlayIcon class="w-8 h-8 text-appBody" />
        </button>
        <BCMSImage
          :key="data.page.meta.slug"
          :media="data.page.meta.cover"
          class="absolute top-0 left-0 w-full h-full cover rounded overflow-hidden lg:rounded-2xl"
        />
        <div
          class="absolute top-0 left-0 w-full h-full bg-black/40 lg:bg-black/60"
        />
      </div>
      <div>
        <div class="mb-4 lg:hidden">
          <div class="leading-none font-medium tracking-[-0.8px] mb-2.5">
            {{ data.page.meta.title }}
          </div>
          <div class="text-sm leading-none tracking-[-0.8px] text-appGray-400">
            {{ data.page.meta.guest?.meta?.en?.title || 'N / A' }}
          </div>
        </div>
        <div class="flex items-center justify-between mb-8 lg:mb-14">
          <div class="flex items-center">
            <button
              class="flex items-center justify-center w-12 h-12 bg-appText rounded-full mr-4 max-lg:hidden"
              @click="handlePlayPause"
            >
              <PlayIcon
                v-if="
                  episode
                    ? (episode.slug === data.page.meta.slug &&
                        !settings.playing) ||
                      episode.slug !== data.page.meta.slug
                    : true
                "
                class="w-8 h-8 text-appBody"
              />
              <PauseIcon
                v-if="
                  episode
                    ? episode.slug === data.page.meta.slug && settings.playing
                    : false
                "
                class="w-8 h-8 text-appBody"
              />
            </button>
            <div class="flex flex-wrap gap-2.5">
              <div
                v-for="(tag, index) in data.page.meta.tags"
                :key="index"
                class="px-[14px] py-[9px] border border-appGray-700 rounded-[32px] text-sm leading-none tracking-[-0.41px] text-appGray-100 lg:px-6 lg:py-[15px] lg:text-2xl lg:leading-none"
              >
                {{ tag }}
              </div>
            </div>
          </div>
          <div
            class="text-2xl leading-none font-Inter tracking-[-0.8px] text-white max-lg:hidden"
          >
            {{ fileLength }}
          </div>
        </div>
        <ContentManager
          :item="data.page.meta.description"
          class="episodePage--description max-w-[672px] mb-8 lg:mb-12"
        />
        <div>
          <div
            class="text-sm leading-none font-medium tracking-[-0.8px] mb-3 lg:text-[32px] lg:leading-none lg:mb-5"
          >
            Guest
          </div>
          <div class="flex items-center">
            <BCMSImage
              v-if="data.page.meta.guest?.meta?.en"
              :media="data.page.meta.guest.meta.en.avatar"
              class="w-10 h-10 cover rounded-full overflow-hidden mr-[14px] lg:w-16 lg:h-16 lg:mr-4"
            />
            <div
              class="text-xs leading-none font-medium tracking-[-0.8px] text-appGray-200 lg:text-2xl lg:leading-none"
            >
              {{ data.page.meta.guest?.meta?.en?.title || 'N / A' }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { bcmsMediaToUrl } from '@becomes/cms-most/frontend';
import { BCMSImage } from '~~/bcms-components';
import { EpisodePageData, PageProps } from '~~/types';
import PlayIcon from '@/assets/icons/play.svg';
import PauseIcon from '@/assets/icons/pause.svg';
import { EpisodeEntry, EpisodeEntryMeta } from '~~/bcms/types';

const route = useRoute();

const { data, error } = useAsyncData<PageProps<EpisodePageData>>(
  async (ctx) => {
    const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
    const homePage = (await ctx?.$bcms.entry.get({
      // Template name or ID
      template: 'episode',
      // Entry slug or ID
      entry: route.params.slug,
    })) as EpisodeEntry;
    if (!homePage) {
      throw new Error('Episode entry does not exist.');
    }
    return {
      header,
      footer,
      page: {
        meta: homePage.meta.en as EpisodeEntryMeta,
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

const {
  episode,
  setEpisode,
  setEpisodeDOM,
  getFileLength,
  settings,
  setSettings,
} = usePlayingEpisode();

const audioDOM = ref<HTMLAudioElement>();
const fileLength = ref('...');

const handlePlayPause = () => {
  if (!episode.value && data.value?.page?.meta) {
    setEpisode(data.value.page.meta);
    if (audioDOM.value) {
      setEpisodeDOM(audioDOM.value);
    }
    setSettings({
      playing: true,
    });
  } else if (episode.value && data.value?.page?.meta) {
    if (episode.value.slug === data.value.page.meta.slug) {
      setSettings({
        playing: !settings.value.playing,
      });
    } else {
      if (audioDOM.value) {
        setSettings({
          playing: false,
        });
        setEpisodeDOM(audioDOM.value);
      }
      setEpisode(data.value.page.meta);
      setSettings({
        playing: true,
      });
    }
  }
};

watch(
  () => data.value?.page,
  (newVal) => {
    if (newVal) {
      const audio = new Audio(bcmsMediaToUrl(newVal.meta.file));
      audio.preload = 'metadata';

      audio.onloadedmetadata = () => {
        audioDOM.value = audio;
        const { durationInMinutes, durationInSeconds } = getFileLength(audio);

        fileLength.value = `${durationInMinutes.toString().padStart(2, '0')}:${(
          durationInSeconds % 60
        )
          .toFixed(0)
          .padStart(2, '0')}`;
      };
    }
  },
);

const { setOgHead } = useHeadTags();
useHead(() =>
  setOgHead({
    title: data.value?.page.meta.seo?.title || data.value?.page.meta.title,
    description: data.value?.page.meta.seo?.description,
  }),
);
</script>

<style lang="scss">
.episodePage--description {
  h2 {
    @apply text-sm leading-none font-medium tracking-[-0.8px] mb-3 lg:text-[32px] lg:leading-none lg:mb-4;
  }
  p {
    @apply text-xs leading-[1.3] tracking-[-0.41px] text-appGray-200 lg:text-2xl lg:leading-[1.3];
  }
}
</style>
