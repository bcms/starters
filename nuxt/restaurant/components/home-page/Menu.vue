<template>
    <section>
        <div class="container">
            <div class="flex flex-col items-center mb-8 lg:mb-[88px]">
                <div
                    class="text-xs leading-none mb-2.5 lg:text-base lg:leading-none lg:mb-[14px]"
                >
                    [ 1 ]
                </div>
                <h2
                    class="text-lg leading-none uppercase font-Gloock mb-4 lg:text-5xl lg:leading-none lg:mb-6"
                >
                    {{ title }}
                </h2>
                <ContentManager
                    :items="description.nodes"
                    class="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-700 uppercase max-w-[745px] mx-auto lg:text-base lg:leading-[1.3]"
                />
            </div>
        </div>
        <NuxtLink
            v-for="(meal, index) in meals"
            :key="index"
            :to="`/menu?s=${meal.meta.en?.title.toLowerCase()}`"
            class="flex relative"
        >
            <div v-if="meal.meta.en" class="container">
                <div
                    class="relative z-10 flex flex-col items-center text-center py-12 max-w-[765px] mx-auto lg:py-[150px]"
                >
                    <h3
                        class="text-sm leading-none font-Gloock text-white uppercase mb-3 lg:text-[32px] lg:leading-none lg:mb-[18px]"
                    >
                        {{ meal.meta.en.title }}
                    </h3>
                    <ContentManager
                        :items="meal.meta.en.description.nodes"
                        class="text-xs leading-[1.3] tracking-[-0.41px] uppercase text-appGray-100 lg:text-lg lg:leading-[1.3]"
                    />
                </div>
                <BCMSImage
                    :media="meal.meta.en?.cover_image"
                    :client="bcms"
                    class="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div class="absolute top-0 left-0 w-full h-full bg-black/50" />
            </div>
        </NuxtLink>
        <HomePageDivider />
    </section>
</template>

<script setup lang="ts">
import type { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-vue';
import type { PropRichTextDataParsed } from '@thebcms/types';
import type { MealTypeEntry } from '~/bcms/types/ts';

defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: Object as PropType<PropRichTextDataParsed>,
        required: true,
    },
    meals: {
        type: Array as PropType<MealTypeEntry[]>,
        required: true,
    },
    bcms: {
        type: Object as PropType<ClientConfig>,
        required: true,
    },
});
</script>
