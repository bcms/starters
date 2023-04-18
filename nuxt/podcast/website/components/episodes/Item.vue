<template>
  <NuxtLink
    :to="`/episode/${item.slug}`"
    class="group grid grid-cols-[16px,24px,1fr,70px] gap-[5px] items-center px-[14px] py-2.5 text-left lg:grid-cols-[32px,64px,1fr,125px] lg:gap-4 lg:px-5 lg:py-6"
  >
    <button
      class="flex items-center justify-center"
      @click.prevent="handlePlayPause"
    >
      <span
        v-if="!episode || episode.slug !== item.slug"
        class="text-xs leading-none font-medium tracking-[-0.8px] group-hover:hidden lg:text-xl lg:leading-none"
      >
        {{ index }}
      </span>
      <PlayIcon
        v-if="
          episode
            ? (episode.slug === item.slug && !isPlaying) ||
              episode.slug !== item.slug
            : true
        "
        class="w-4 text-appAccent group-hover:inline-block lg:w-8"
        :class="[!episode || episode.slug !== item.slug ? 'hidden' : '']"
      />
      <PauseIcon
        v-if="episode ? episode.slug === item.slug && isPlaying : false"
        class="w-4 text-appAccent lg:w-8"
      />
    </button>
    <BCMSImage
      :media="item.cover"
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
      class="w-6 h-6 rounded cover overflow-hidden lg:w-16 lg:h-16"
    />
    <div class="max-lg:pl-2.5">
      <div
        class="text-sm leading-none font-medium tracking-[-0.8px] mb-1.5 line-clamp-1 lg:text-2xl lg:leading-none lg:mb-2.5"
      >
        {{ item.title }}
      </div>
      <div
        class="text-xs leading-none tracking-[-0.8px] text-appGray-400 lg:text-xl lg:leading-none"
      >
        {{ item.guest?.meta?.en?.title || "N / A" }}
      </div>
    </div>
    <div class="text-right">
      <div>
        <div
          class="text-sm leading-none font-medium tracking-[-0.8px] mb-1.5 lg:text-xl lg:leading-none lg:mb-2.5"
        >
          {{ fileLength }}
        </div>
        <div
          class="text-xs leading-none font-medium tracking-[-0.8px] text-appGray-400 lg:text-xl lg:leading-none"
        >
          {{ dateUtil.format(item.date) }}
        </div>
      </div>
    </div>
    <audio
      ref="audioDOM"
      :src="bcmsMediaToUrl(item.file)"
      type="audio/mpeg"
      class="sr-only"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
import { bcmsMediaToUrl } from "@becomes/cms-most/frontend";
import { PropType } from "vue";
import { BCMSImage } from "~~/bcms-components";
import { EpisodeEntryMeta } from "~~/bcms/types";
import PlayIcon from "@/assets/icons/play.svg";
import PauseIcon from "@/assets/icons/pause.svg";

const props = defineProps({
  item: {
    type: Object as PropType<EpisodeEntryMeta>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
});

const audioDOM = ref<HTMLAudioElement>();
const {
  episode,
  setEpisode,
  isPlaying,
  setIsPlaying,
  getFileLength,
  setEpisodeDOM,
} = usePlayingEpisode();

const fileLength = ref("...");

const handlePlayPause = () => {
  if (!episode.value) {
    setEpisode(props.item);
    setIsPlaying(true);
    if (audioDOM.value) {
      setEpisodeDOM(audioDOM.value);
    }
  } else {
    if (episode.value.slug === props.item.slug) {
      setIsPlaying(!isPlaying.value);
    } else {
      setEpisode(props.item);
      setIsPlaying(true);
    }
  }
};

onMounted(() => {
  nextTick(() => {
    setFileLength();
  });
});

const setFileLength = () => {
  if (audioDOM.value) {
    const { durationInMinutes } = getFileLength(audioDOM.value);

    fileLength.value = `${durationInMinutes} min${
      durationInMinutes > 1 ? "s" : ""
    }`;
  }
};
</script>
