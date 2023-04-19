<template>
  <PageWrapper
    v-if="data && episode"
    :header="data.header"
    :footer="data.footer"
  >
    <div class="container relative z-10 py-20 lg:pt-[104px] lg:pb-[246px]">
      <div
        class="relative aspect-square rounded overflow-hidden mb-8 md:aspect-[2.47] lg:rounded-2xl lg:mb-16"
      >
        <BCMSImage
          :media="episode?.cover"
          class="absolute top-0 left-0 w-full h-full cover rounded overflow-hidden lg:rounded-2xl"
        />
        <div
          class="absolute top-0 left-0 w-full h-full bg-black/50 lg:bg-black/60"
        />
      </div>
      <div class="flex flex-col items-center text-center max-w-[672px] mx-auto">
        <h1
          class="leading-none font-medium tracking-[-0.8px] mb-2.5 lg:text-[40px] lg:leading-none lg:tracking-[-2.41px] lg:text-white lg:mb-6"
        >
          {{ episode.title }}
        </h1>
        <div
          class="text-sm leading-none tracking-[-0.8px] text-appGray-400 mb-[35px] lg:text-2xl lg:leading-none lg:text-appGray-300 lg:mb-10"
        >
          {{ episode.guest?.meta?.en?.title || "N / A" }}
        </div>
        <div class="mb-6 w-full lg:mb-8">
          <label class="block relative mb-2 lg:mb-5">
            <div
              class="relative h-1 rounded-md overflow-hidden bg-appGray-800 lg:h-2"
            >
              <div
                class="absolute top-0 left-0 h-full bg-white rounded-md"
                :style="{
                  width: episodeTime,
                }"
              />
            </div>
            <div
              class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white rounded-full lg:w-[15px] lg:h-[15px]"
              :style="{
                left: episodeTime,
              }"
            />
            <!-- TODO: Handle on Change -->
            <input
              v-if="episodeDOM"
              :value="episodeTime"
              type="range"
              step="1"
              min="0"
              :max="episodeDOM.duration"
              class="absolute top-1/2 -translate-y-1/2 left-0 w-full h-5 opacity-0"
            />
          </label>
          <div class="flex items-center justify-between">
            <div
              class="text-xs leading-none tracking-[-0.8px] text-appGray-400 lg:text-base lg:leading-none"
            >
              00:00
            </div>
            <div
              class="text-xs leading-none tracking-[-0.8px] text-appGray-400 lg:text-base lg:leading-none"
            >
              00:00
            </div>
          </div>
        </div>
        <div class="flex items-center justify-center gap-8">
          <button class="flex">
            <BackwardIcon class="w-6 h-6" />
          </button>
          <button
            class="flex items-center justify-center w-8 h-8 bg-white rounded-full lg:w-[60px] lg:h-[60px]"
            @click="
              setSettings({
                playing: !settings.playing,
              })
            "
          >
            <PauseIcon
              v-if="settings.playing"
              class="text-appBody w-6 h-6 lg:w-8 lg:h-8"
            />
            <PlayIcon v-else class="text-appBody w-6 h-6 lg:w-8 lg:h-8" />
          </button>
          <button class="flex">
            <ForwardIcon class="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { BCMSImage } from "~~/bcms-components";
import { APIResponse, NowPlayingPageData } from "~~/types";
import PlayIcon from "@/assets/icons/play.svg";
import PauseIcon from "@/assets/icons/pause.svg";
import ForwardIcon from "@/assets/icons/forward.svg";
import BackwardIcon from "@/assets/icons/backward.svg";

const {
  episode,
  episodeDOM,
  settings,
  setSettings,
  getPlayingEpisodeFileLength,
} = usePlayingEpisode();

const { data } = useAsyncData(async (ctx) => {
  return await ctx?.$bcms.request<APIResponse<NowPlayingPageData>>({
    url: "/now-playing.json",
  });
});

const { setOgHead } = useHeadTags();

const episodeTime = computed(() => {
  return `${
    (settings.value.currentTime /
      getPlayingEpisodeFileLength.value.durationInSeconds) *
    100
  }%`;
});

onMounted(() => {
  if (!episode.value) {
    navigateTo("/");
  }
});

useHead(() =>
  setOgHead({
    title: "Now Playing",
  })
);
</script>
