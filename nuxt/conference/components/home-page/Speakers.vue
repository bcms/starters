<template>
    <section class="pb-16 lg:pb-[136px]">
        <div class="container">
            <div class="px-4 mb-[14px] lg:px-16 lg:mb-12">
                <div class="relative aspect-[1.6] lg:aspect-[1.67]">
                    <BCMSImage
                        :media="cover"
                        :client="bcms"
                        class="absolute z-10 top-0 left-0 w-full h-full object-cover"
                    />
                    <div
                        class="absolute -top-4 -left-4 w-[163px] aspect-square bg-[#7EE984] lg:w-[672px] lg:-top-16 lg:-left-16"
                    />
                    <div
                        class="absolute bottom-0 -right-4 w-[163px] aspect-square bg-appAccent lg:w-[672px] lg:-right-16"
                    />
                </div>
            </div>
            <div class="px-4 lg:px-16">
                <div
                    class="leading-none tracking-[-0.02em] font-semibold mb-3 lg:text-5xl lg:leading-none lg:mb-6"
                >
                    {{ title }}
                </div>
                <ContentManager
                    :items="description.nodes"
                    class="text-sm leading-[1.4] font-medium tracking-[-0.8px] text-appGray-500 mb-6 lg:text-[26px] lg:leading-[1.4] lg:mb-[88px]"
                />
                <Swiper
                    :modules="[A11y, Pagination]"
                    :slides-per-view="1"
                    watch-overflow
                    grab-cursor
                    :space-between="20"
                    :pagination="{
                        el: '.homeSpeakers--pagination',
                        clickable: true,
                    }"
                    class="mb-8 lg:mb-16"
                >
                    <SwiperSlide
                        v-for="(speaker, index) in speakers"
                        :key="index"
                    >
                        <div class="flex items-center mb-5 lg:mb-14">
                            <BCMSImage
                                :media="speaker.avatar_image"
                                :client="bcms"
                                class="w-8 h-8 object-cover rounded-full overflow-hidden mr-3 lg:w-24 lg:h-24 lg:mr-6"
                            />
                            <div>
                                <div
                                    class="text-sm leading-none tracking-[-0.04em] font-medium mb-1.5 lg:text-[32px] lg:leading-none lg:mb-[14px]"
                                >
                                    {{ speaker.name }}
                                </div>
                                <div
                                    class="text-xs leading-none tracking-[-0.05em] font-medium text-appGray-500 lg:text-2xl lg:leading-none"
                                >
                                    {{ speaker.role }}
                                </div>
                            </div>
                        </div>
                        <ContentManager
                            :items="speaker.biography.nodes"
                            class="homeSpeakers--rt mb-4 lg:mb-12"
                        />
                        <ContentManager
                            :items="speaker.topic.nodes"
                            class="homeSpeakers--rt"
                        />
                    </SwiperSlide>
                </Swiper>
                <div
                    class="homeSpeakers--pagination swiper--customPagination"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-vue';
import type {
    PropMediaDataParsed,
    PropRichTextDataParsed,
} from '@thebcms/types';
import { A11y, Pagination } from 'swiper/modules';
import type { SpeakerGroup } from '~/bcms/types/ts';

defineProps({
    cover: {
        type: Object as PropType<PropMediaDataParsed>,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: Object as PropType<PropRichTextDataParsed>,
        required: true,
    },
    speakers: {
        type: Array as PropType<SpeakerGroup[]>,
        required: true,
    },
    bcms: {
        type: Object as PropType<ClientConfig>,
        required: true,
    },
});
</script>

<style lang="scss">
.homeSpeakers {
    &--rt {
        h3 {
            @apply leading-none tracking-[-0.04em] font-semibold mb-3 lg:text-[32px] lg:leading-none lg:mb-5;
        }
        p {
            @apply text-sm leading-[1.4] tracking-[-0.8px] font-medium text-appGray-500 lg:text-[26px] lg:leading-[1.4];
            strong {
                @apply text-appText font-medium;
            }
        }
    }
}
</style>
