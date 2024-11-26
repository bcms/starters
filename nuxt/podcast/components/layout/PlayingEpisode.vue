<template>
  <Transition name="fade">
    <div v-if="episode"
      class="fixed z-50 bottom-0 left-0 w-full bg-[#1F1F1F] py-2 lg:bg-appBody lg:border-t lg:border-appGray-600 lg:py-6">
      <div class="container">
        <div class="flex items-center justify-between xl:gap-10">
          <NuxtLink to="/now-playing" class="flex items-center lg:flex-1">
            <BCMSImage v-if="episode.cover_image" :key="episode.cover_image.src" :media="episode.cover_image"
              :client="bcms" class="w-8 h-8 rounded object-cover overflow-hidden mr-2.5 lg:w-14 lg:h-14 lg:mr-4" />
            <div>
              <div
                class="text-sm leading-none font-medium tracking-[-0.8px] mb-1.5 line-clamp-1 lg:text-lg lg:leading-none lg:mb-2.5">
                {{ episode.title }}
              </div>
              <div class="text-xs leading-none tracking-[-0.8px] text-appGray-400 lg:text-base lg:leading-none">
                {{ episode.guest.meta?.en?.title || 'N / A' }}
              </div>
            </div>
          </NuxtLink>
          <div class="flex flex-col items-center justify-center flex-1 max-lg:hidden">
            <div class="flex items-center space-x-7 mb-2">
              <button class="text-xl leading-none tracking-[-0.8px] text-appGray-400 min-w-max max-xl:hidden"
                @click="handlePrevEpisode">
                Previous episode
              </button>
              <button class="flex" @click="handlePrevEpisode">
                <SvgoBackward filled :font-controlled="false" class="w-6 h-6" />
              </button>
              <button class="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-white rounded-full" @click="
                setSettings({
                  playing: !settings.playing,
                })
                ">
                <SvgoPause filled :font-controlled="false" v-if="settings.playing" class="text-appAccent w-6 h-6" />
                <SvgoPlay filled :font-controlled="false" v-else class="text-appAccent w-6 h-6" />
              </button>
              <button class="flex" @click="handleNextEpisode">
                <SvgoForward filled :font-controlled="false" class="w-6 h-6" />
              </button>
              <button class="text-xl leading-none tracking-[-0.8px] text-appGray-400 min-w-max max-xl:hidden"
                @click="handleNextEpisode">
                Next episode
              </button>
            </div>
            <div class="flex items-center space-x-2.5 xl:w-full">
              <div class="leading-none tracking-[-0.8px] text-appGray-400">
                {{ getCurrentPlayTime }}
              </div>
              <div class="relative flex-1">
                <div class="relative w-[128px] h-1 rounded overflow-hidden bg-appGray-800 xl:w-full">
                  <div class="absolute top-0 left-0 h-full bg-white rounded" :style="{
                    width: getEpisodeProgressBarWidth,
                  }" />
                </div>
                <div class="absolute top-1/2 -translate-y-1/2 left-0 w-full h-5 rounded cursor-pointer"
                  @click="handleRewind" />
              </div>
              <div class="leading-none tracking-[-0.8px] text-appGray-400">
                {{ fileLength }}
              </div>
            </div>
          </div>
          <div class="flex items-center justify-end flex-1 max-lg:hidden">
            <SvgoVolume filled :font-controlled="false" class="w-6 h-6 mr-4" />
            <label class="relative w-[128px]">
              <div class="relative h-1 rounded overflow-hidden bg-appGray-800">
                <div class="absolute top-0 left-0 h-full bg-white rounded" :style="{
                  width: volumeWidth,
                }" />
              </div>
              <input :value="settings.volume" type="range" step="0.01" min="0" max="1"
                class="absolute top-1/2 -translate-y-1/2 left-0 w-full h-5 opacity-0 cursor-pointer"
                @change="handleVolumeChange" />
            </label>
          </div>
          <button class="flex lg:hidden" @click="
            settings.playing
              ? setSettings({
                playing: false,
              })
              : setSettings({
                playing: true,
              })
            ">
            <SvgoPause filled :font-controlled="false" v-if="settings.playing" class="w-5 h-5" />
            <SvgoPlay filled :font-controlled="false" v-else class="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import type { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-vue';

defineProps({
  bcms: {
    type: Object as PropType<ClientConfig>,
    required: true,
  }
})

const {
  episode,
  settings,
  setSettings,
  getPlayingEpisodeFileLength,
  getCurrentPlayTime,
  getEpisodeProgressBarWidth,
  handlePrevEpisode,
  handleNextEpisode,
  handleRewind,
} = usePlayingEpisode();

const fileLength = ref('...');

const volumeWidth = computed(() => {
  return `${settings.value.volume * 100}%`;
});

const handleVolumeChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  setSettings({
    volume: +target.value,
  });
};

onMounted(() => {
  nextTick(() => {
    setFileLength();
  });
});
watch(episode, () => {
  nextTick(() => {
    setFileLength();
  });
});

const setFileLength = () => {
  const { durationInMinutes, durationInSeconds } =
    getPlayingEpisodeFileLength.value;

  fileLength.value = `${String(durationInMinutes).padStart(2, '0')}:${(
    durationInSeconds % 60
  )
    .toFixed(0)
    .padStart(2, '0')}`;
};
</script>
