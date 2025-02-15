<template>
  <NuxtLink :to="`/episode/${item.slug}`"
    class="group grid grid-cols-[16px,24px,1fr,70px] gap-[5px] items-center px-[14px] py-2.5 text-left lg:grid-cols-[32px,64px,1fr,125px] lg:gap-4 lg:px-5 lg:py-6">
    <button class="flex items-center justify-center" @click.prevent="handlePlayPause">
      <span v-if="!episode || episode?.slug !== item.slug"
        class="text-xs leading-none font-medium tracking-[-0.8px] group-hover:hidden lg:text-xl lg:leading-none">
        {{ index }}
      </span>
      <SvgoPlay filled :font-controlled="false" v-if="
        episode
          ? (episode?.slug === item.slug && !settings.playing) ||
          episode?.slug !== item.slug
          : true
      " class="w-4 text-appAccent group-hover:inline-block lg:w-8"
        :class="[!episode || episode?.slug !== item.slug ? 'hidden' : '']" />
      <SvgoPause filled :font-controlled="false"
        v-if="episode ? episode?.slug === item.slug && settings.playing : false" class="w-4 text-appAccent lg:w-8" />
    </button>
    <BCMSImage :media="item.cover_image" :client="bcms"
      class="w-6 h-6 rounded object-cover overflow-hidden lg:w-16 lg:h-16" />
    <div class="max-lg:pl-2.5">
      <div
        class="text-sm leading-none font-medium tracking-[-0.8px] mb-1.5 line-clamp-1 lg:text-2xl lg:leading-none lg:mb-2.5">
        {{ item.title }}
      </div>
      <div class="text-xs leading-none tracking-[-0.8px] text-appGray-400 lg:text-xl lg:leading-none">
        {{ item.guest?.meta?.en?.title || 'N / A' }}
      </div>
    </div>
    <div class="text-right">
      <div>
        <div class="text-sm leading-none font-medium tracking-[-0.8px] mb-1.5 lg:text-xl lg:leading-none lg:mb-2.5">
          {{ fileLength }}
        </div>
        <div class="text-xs leading-none font-medium tracking-[-0.8px] text-appGray-400 lg:text-xl lg:leading-none">
          {{ dateUtil.format(item.date.timestamp) }}
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<script setup lang="ts">
import type { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-vue';
import type { EpisodeEntryMetaItem } from '~/bcms/types/ts';

const props = defineProps({
  item: {
    type: Object as PropType<EpisodeEntryMetaItem>,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  bcms: {
    type: Object as PropType<ClientConfig>,
    required: true,
  }
});

const audioDOM = ref<HTMLAudioElement>();
const {
  episode,
  setEpisode,
  setEpisodeDOM,
  settings,
  setSettings,
  getFileLength,
} = usePlayingEpisode();

const fileLength = ref('...');

const handlePlayPause = () => {
  if (!episode.value) {
    setEpisode(props.item);
    if (audioDOM.value) {
      setEpisodeDOM(audioDOM.value);
    }
    setSettings({
      playing: true,
    });
  } else {
    // eslint-disable-next-line no-lonely-if
    if (episode.value.slug === props.item.slug) {
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
      setEpisode(props.item);
      setSettings({
        playing: true,
      });
    }
  }
};

onMounted(() => {
  nextTick(() => {
    const audio = audioUtil.createAudio(props.bcms, props.item.media_file);
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
  });
});
</script>
