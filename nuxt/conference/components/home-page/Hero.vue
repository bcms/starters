<template>
    <section class="overflow-hidden">
        <div class="container mb-10 lg:mb-16">
            <SvgoHeroSvg
                filled
                :font-controlled="false"
                class="w-auto h-10 relative left-1/2 -translate-x-1/2 mb-10 lg:h-[128px] lg:mb-[55px]"
            />
            <div
                class="lg:grid lg:grid-cols-[1fr,auto] lg:items-center lg:gap-x-[30px] lg:gap-y-[55px]"
            >
                <div
                    class="flex items-center gap-1 max-lg:mb-6 lg:gap-2.5 lg:col-start-1 lg:row-start-1"
                >
                    <BCMSImage
                        v-for="(image, index) in gallery"
                        :key="index"
                        :media="image"
                        :client="bcms"
                        :class="`w-10 h-10 object-cover lg:w-[128px] lg:h-[128px] ${[index % 2 !== 0 ? '-rotate-[9deg]' : '']}`"
                    />
                </div>
                <ContentManager
                    :items="description.nodes"
                    class="homeHero--description text-sm leading-[1.4] tracking-[-0.8px] text-appGray-500 max-lg:mb-8 lg:col-start-1 lg:row-start-2 lg:text-[26px] lg:leading-[1.4]"
                />
                <NuxtLink
                    to="#tickets"
                    class="flex items-center px-5 py-[13px] bg-black rounded-[48px] lg:col-start-2 lg:row-start-1 lg:px-[26px] lg:py-[19px]"
                >
                    <span
                        class="text-sm leading-none tracking-[-0.41px] font-semibold text-white uppercase mr-2 lg:text-lg lg:leading-none"
                    >
                        Get your ticket now
                    </span>
                    <SvgoArrow
                        filled
                        :font-controlled="false"
                        class="w-[14px] h-[14px] text-white lg:w-[18px] lg:h-[18px]"
                    />
                </NuxtLink>
                <div
                    class="text-2xl leading-none tracking-[-0.41px] text-appGray-500 font-medium text-center max-lg:hidden"
                >
                    (scroll)
                </div>
            </div>
        </div>
        <div class="relative bg-appGray-300 aspect-[1.74] lg:aspect-[1.8]">
            <div class="container h-full">
                <div
                    class="relative z-10 h-full flex flex-col items-center justify-center"
                >
                    <div
                        class="text-[32px] leading-none tracking-[-0.41px] font-medium text-white mb-3 lg:text-[100px] lg:leading-none lg:mb-8"
                    >
                        {{ timerOutput }}
                    </div>
                    <div
                        class="text-sm leading-none font-medium tracking-[-0.41px] text-appGray-400 lg:text-2xl lg:leading-none"
                    >
                        Until event
                    </div>
                </div>
                <BCMSImage
                    :media="cover"
                    :client="bcms"
                    class="absolute top-0 left-0 w-full h-full object-cover"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { BCMSImage } from '@thebcms/components-vue';
import type {
    PropMediaDataParsed,
    PropRichTextDataParsed,
} from '@thebcms/types';
import type { ClientConfig } from '@thebcms/client';

defineProps({
    gallery: {
        type: Array as PropType<PropMediaDataParsed[]>,
        required: true,
    },
    description: {
        type: Object as PropType<PropRichTextDataParsed>,
        required: true,
    },
    cover: {
        type: Object as PropType<PropMediaDataParsed>,
        required: true,
    },
    bcms: {
        type: Object as PropType<ClientConfig>,
        required: true,
    },
});

const timerOutput = ref('Loading');

onMounted(() => {
    const untilEvent = new Date(new Date().getTime() + 24 * 60 * 60 * 1000);

    const timer = setInterval(() => {
        const now = new Date().getTime();
        const distance = untilEvent.getTime() - now;

        const hours = (
            Math.floor((distance & (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) +
            ''
        ).padStart(2, '0');
        const minutes = (
            Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)) + ''
        ).padStart(2, '0');
        const seconds = (
            Math.floor((distance % (1000 * 60)) / 1000) + ''
        ).padStart(2, '0');

        timerOutput.value = `${hours}:${minutes}:${seconds}`;

        if (distance < 0) {
            clearInterval(timer);
            timerOutput.value = 'EXPIRED';
        }
    }, 1000);
});
</script>

<style lang="scss">
.homeHero--description {
    strong {
        @apply text-appText font-medium;
    }
}
</style>
