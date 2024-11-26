<template>
    <div v-if="data && episode">
        <div class="container relative z-10 py-20 lg:pt-[104px] lg:pb-[246px]">
            <div class="relative aspect-square rounded overflow-hidden mb-8 md:aspect-[2.47] lg:rounded-2xl lg:mb-16">
                <BCMSImage :media="episode.cover_image" :client="data.bcms"
                    class="absolute top-0 left-0 w-full h-full object-cover rounded overflow-hidden lg:rounded-2xl" />
                <div class="absolute top-0 left-0 w-full h-full bg-black/50 lg:bg-black/60" />
            </div>
            <div class="flex flex-col items-center text-center max-w-[672px] mx-auto">
                <h1
                    class="leading-none font-medium tracking-[-0.8px] mb-2.5 lg:text-[40px] lg:leading-none lg:tracking-[-2.41px] lg:text-white lg:mb-6">
                    {{ episode.title }}
                </h1>
                <div
                    class="text-sm leading-none tracking-[-0.8px] text-appGray-400 mb-[35px] lg:text-2xl lg:leading-none lg:text-appGray-300 lg:mb-10">
                    {{ episode.guest?.meta?.en?.title || 'N / A' }}
                </div>
                <div class="mb-6 w-full lg:mb-8">
                    <label class="block relative mb-2 lg:mb-5">
                        <div class="relative h-1 rounded-md overflow-hidden bg-appGray-800 lg:h-2">
                            <div class="absolute top-0 left-0 h-full bg-white rounded-md" :style="{
                                width: getEpisodeProgressBarWidth,
                            }" />
                        </div>
                        <div class="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2.5 h-2.5 bg-white rounded-full lg:w-[15px] lg:h-[15px]"
                            :style="{
                                left: getEpisodeProgressBarWidth,
                            }" />
                        <div class="absolute z-10 top-1/2 -translate-y-1/2 left-0 w-full h-5 cursor-pointer rounded-md"
                            @click="handleRewind" />
                        <input v-if="episodeDOM" :value="getEpisodeProgressBarWidth" type="range" step="1" min="0"
                            :max="episodeDOM.duration"
                            class="absolute top-1/2 -translate-y-1/2 left-0 w-full h-5 opacity-0" />
                    </label>
                    <div class="flex items-center justify-between">
                        <div
                            class="text-xs leading-none tracking-[-0.8px] text-appGray-400 lg:text-base lg:leading-none">
                            {{ getCurrentPlayTime }}
                        </div>
                        <div
                            class="text-xs leading-none tracking-[-0.8px] text-appGray-400 lg:text-base lg:leading-none">
                            {{ fileLength }}
                        </div>
                    </div>
                </div>
                <div class="flex items-center justify-center gap-8">
                    <button class="flex" @click="handlePrevEpisode">
                        <SvgoBackward filled :font-controlled="false" class="w-6 h-6" />
                    </button>
                    <button
                        class="flex items-center justify-center w-8 h-8 bg-white rounded-full lg:w-[60px] lg:h-[60px]"
                        @click="
                            setSettings({
                                playing: !settings.playing,
                            })
                            ">
                        <SvgoPause filled :font-controlled="false" v-if="settings.playing"
                            class="text-appBody w-6 h-6 lg:w-8 lg:h-8" />
                        <SvgoPlay filled :font-controlled="false" v-else class="text-appBody w-6 h-6 lg:w-8 lg:h-8" />
                    </button>
                    <button class="flex" @click="handleNextEpisode">
                        <SvgoForward filled :font-controlled="false" class="w-6 h-6" />
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { BCMSImage } from '@thebcms/components-vue';
import type { NowPlayingPageResponse } from '~/server/api/now-playing-page';

const { setOgHead } = useHeadTags();
const { setEpisodes } = useEpisodes()

const { data, error } = await useFetch<NowPlayingPageResponse>('/api/now-playing-page');

if (!data.value || error.value) {
    throw createError({
        statusCode: 404,
        statusMessage: 'Page Not Found',
    });
}

const {
    episode,
    episodeDOM,
    settings,
    setSettings,
    getCurrentPlayTime,
    getPlayingEpisodeFileLength,
    getEpisodeProgressBarWidth,
    handlePrevEpisode,
    handleNextEpisode,
    handleRewind,
} = usePlayingEpisode();

if (!episode.value) {
    navigateTo('/')
}

setEpisodes(
    data.value.episodes ? data.value.episodes.sort((a, b) => b.date.timestamp - a.date.timestamp) : [],
    data.value.bcms
);

const fileLength = ref('...');

onMounted(() => {
    if (!episode.value) {
        navigateTo('/');
    }
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

    fileLength.value = `${durationInMinutes.toString().padStart(2, '0')}:${(
        durationInSeconds % 60
    )
        .toFixed(0)
        .padStart(2, '0')}`;
};

useHead(() =>
    setOgHead({
        title: `Now Playing - The Podium`,
    }),
);
</script>
