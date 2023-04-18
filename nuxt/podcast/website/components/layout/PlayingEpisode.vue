<template>
  <Transition name="fade">
    <div
      v-if="episode"
      class="fixed z-50 bottom-0 left-0 w-full bg-[#1F1F1F] py-2 lg:bg-appBody lg:border-t lg:border-appGray-600 lg:py-6"
    >
      <div class="container">
        <div class="flex items-center justify-between">
          <div class="flex items-center">
            <BCMSImage
              :media="episode.cover"
              :key="episode.cover.src"
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
              class="w-8 h-8 rounded cover overflow-hidden mr-2.5 lg:w-14 lg:h-14 lg:mr-4"
            />
            <div>
              <div
                class="text-sm leading-none font-medium tracking-[-0.8px] mb-1.5 line-clamp-1 lg:text-lg lg:leading-none lg:mb-2.5"
              >
                {{ episode.title }}
              </div>
              <div
                class="text-xs leading-none tracking-[-0.8px] text-appGray-400 lg:text-base lg:leading-none"
              >
                {{ episode.guest?.meta?.en?.title || "N / A" }}
              </div>
            </div>
          </div>
          <div class="flex flex-col items-center max-lg:hidden">
            <div class="flex items-center space-x-7 mb-2">
              <button
                class="text-xl leading-none tracking-[-0.8px] text-appGray-400"
              >
                Previous episode
              </button>
              <button class="flex">
                <BackwardIcon class="w-6 h-6" />
              </button>
              <button
                class="flex items-center justify-center w-8 h-8 bg-white rounded-full"
                @click="setIsPlaying(!isPlaying)"
              >
                <PauseIcon v-if="isPlaying" class="w-6 h-6" />
                <PlayIcon v-else class="w-6 h-6" />
              </button>
              <button class="flex">
                <ForwardIcon class="w-6 h-6" />
              </button>
              <button
                class="text-xl leading-none tracking-[-0.8px] text-appGray-400"
              >
                Next episode
              </button>
            </div>
            <div class="flex items-center space-x-2.5">
              <div class="leading-none tracking-[-0.8px] text-appGray-400">
                00:00
              </div>
              <div
                class="relative w-[128px] h-1 rounded overflow-hidden bg-[#2E2E2E]"
              >
                <div
                  class="absolute top-0 left-0 w-2/3 h-full bg-white rounded"
                />
              </div>
              <div class="leading-none tracking-[-0.8px] text-appGray-400">
                {{ fileLength }}
              </div>
            </div>
          </div>
          <div class="flex items-center max-lg:hidden">
            <VolumeIcon class="w-6 h-6 mr-4" />
            <label class="relative w-[128px]">
              <div class="relative h-1 rounded overflow-hidden bg-[#2E2E2E]">
                <div
                  class="absolute top-0 left-0 h-full bg-white rounded"
                  :style="{
                    width: volumeWidth,
                  }"
                />
              </div>
              <input
                v-model="volume"
                type="range"
                step="0.01"
                min="0"
                max="1"
                class="absolute top-1/2 -translate-y-1/2 left-0 w-full h-5 opacity-0"
              />
            </label>
          </div>
          <button
            class="flex lg:hidden"
            @click="isPlaying ? setIsPlaying(false) : setIsPlaying(true)"
          >
            <PauseIcon v-if="isPlaying" class="w-5 h-5" />
            <PlayIcon v-else class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { BCMSImage } from "~~/bcms-components";
import PlayIcon from "@/assets/icons/play.svg";
import PauseIcon from "@/assets/icons/pause.svg";
import VolumeIcon from "@/assets/icons/volume.svg";
import ForwardIcon from "@/assets/icons/forward.svg";
import BackwardIcon from "@/assets/icons/backward.svg";

const { episode, isPlaying, setIsPlaying, getPlayingEpisodeFileLength } =
  usePlayingEpisode();

const volume = ref(0.5);

const fileLength = ref("");

const volumeWidth = computed(() => {
  return `${volume.value * 100}%`;
});

watch(episode, () => {
  nextTick(() => {
    setFileLength();
  });
});

const setFileLength = () => {
  const { durationInMinutes } = getPlayingEpisodeFileLength.value;

  fileLength.value = `${durationInMinutes.toString().padStart(2, "0")}:00`;
};
</script>
