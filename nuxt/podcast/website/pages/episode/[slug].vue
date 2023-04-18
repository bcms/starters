<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <h1 class="sr-only">{{ data.data.meta.title }}</h1>
    <div
      class="container relative z-10 pt-20 pb-10 lg:pt-[104px] lg:pb-[128px]"
    >
      <div
        class="relative aspect-square rounded overflow-hidden mb-5 md:aspect-[2.47] lg:rounded-2xl lg:mb-10"
      >
        <div
          class="absolute z-10 bottom-10 left-10 text-[56px] leading-none tracking-[-2.41px] font-medium max-lg:hidden"
        >
          {{ data.data.meta.title }}
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
          :media="data.data.meta.cover"
          class="absolute top-0 left-0 w-full h-full cover rounded overflow-hidden lg:rounded-2xl"
        />
        <div
          class="absolute top-0 left-0 w-full h-full bg-black/40 lg:bg-black/60"
        />
      </div>
      <div>
        <div class="mb-4 lg:hidden">
          <div class="leading-none font-medium tracking-[-0.8px] mb-2.5">
            {{ data.data.meta.title }}
          </div>
          <div class="text-sm leading-none tracking-[-0.8px] text-appGray-400">
            {{ data.data.meta.guest?.meta?.en?.title || "N / A" }}
          </div>
        </div>
        <div class="flex items-center justify-between mb-8 lg:mb-14">
          <div class="flex items-center">
            <button
              class="flex items-center justify-center w-12 h-12 bg-appText rounded-full mr-4 max-lg:hidden"
              @click="handlePlayPause"
            >
              <!-- TODO: Check if slug of the playing episode is same as route.params -->
              <PauseIcon v-if="isPlaying" class="w-8 h-8 text-appBody" />
              <PlayIcon v-else class="w-8 h-8 text-appBody" />
            </button>
            <div class="flex flex-wrap gap-2.5">
              <div
                v-for="(tag, index) in data.data.meta.tags"
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
          :item="data.data.meta.description"
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
              v-if="data.data.meta.guest?.meta?.en"
              :media="data.data.meta.guest.meta.en.avatar"
              class="w-10 h-10 cover rounded-full overflow-hidden mr-[14px] lg:w-16 lg:h-16 lg:mr-4"
            />
            <div
              class="text-xs leading-none font-medium tracking-[-0.8px] text-appGray-200 lg:text-2xl lg:leading-none"
            >
              {{ data.data.meta.guest?.meta?.en?.title || "N / A" }}
            </div>
          </div>
        </div>
      </div>
      <audio
        ref="audioDOM"
        :src="bcmsMediaToUrl(data.data.meta.file)"
        type="audio/mpeg"
        class="sr-only"
      />
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { bcmsMediaToUrl } from "@becomes/cms-most/frontend";
import { BCMSImage } from "~~/bcms-components";
import { APIResponse, EpisodePageData } from "~~/types";
import PlayIcon from "@/assets/icons/play.svg";
import PauseIcon from "@/assets/icons/pause.svg";

const route = useRoute();

const { data } = useAsyncData(async (ctx) => {
  return await ctx?.$bcms.request<APIResponse<EpisodePageData>>({
    url: `/episode/${route.params.slug}/data.json`,
  });
});

const {
  episode,
  setEpisode,
  setEpisodeDOM,
  getFileLength,
  isPlaying,
  setIsPlaying,
} = usePlayingEpisode();

const audioDOM = ref<HTMLAudioElement>();
const fileLength = ref("...");

const setFileLength = () => {
  if (audioDOM.value) {
    const { durationInMinutes } = getFileLength(audioDOM.value);

    fileLength.value = `${durationInMinutes.toString().padStart(2, "0")}:00`;
  }
};

const handlePlayPause = () => {
  if (!episode.value && data.value?.data?.meta) {
    setEpisode(data.value.data.meta);
    setIsPlaying(true);
    if (audioDOM.value) {
      setEpisodeDOM(audioDOM.value);
    }
  } else if (episode.value && data.value?.data?.meta) {
    if (episode.value.slug === data.value.data.meta.slug) {
      setIsPlaying(!isPlaying.value);
    } else {
      setEpisode(data.value.data.meta);
      setIsPlaying(true);
    }
  }
};

onMounted(() => {
  nextTick(() => {
    setFileLength();
  });
});

const { setOgHead } = useHeadTags();
useHead(() =>
  setOgHead({
    title: data.value?.data.meta.title,
  })
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
