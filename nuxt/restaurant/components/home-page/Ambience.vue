<template>
    <section>
        <div class="container">
            <div class="flex flex-col items-center">
                <div
                    class="text-xs leading-none mb-2.5 lg:text-base lg:leading-none lg:mb-[14px]"
                >
                    [ 3 ]
                </div>
                <h2
                    class="text-lg leading-none uppercase font-Gloock mb-4 lg:text-5xl lg:leading-none lg:mb-6"
                >
                    {{ title }}
                </h2>
                <ContentManager
                    :items="description.nodes"
                    class="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-700 uppercase max-w-[745px] mx-auto mb-8 lg:text-base lg:leading-[1.3] lg:mb-[88px]"
                />
            </div>
            <div class="grid grid-cols-2 gap-4 auto-rows-fr lg:gap-6">
                <div
                    v-for="(item, index) in items"
                    :key="index"
                    class="homeAmbience--gridItem w-full h-full relative lg:min-h-[360px]"
                >
                    <div
                        class="flex absolute z-10 top-5 left-5 bg-appBody rounded-[32px] px-[14px] py-2.5 max-w-[calc(100%-28px)] lg:top-8 lg:left-8 lg:px-6 lg:py-4"
                    >
                        <ContentManager
                            :items="item.text.nodes"
                            class="text-xs leading-none uppercase truncate lg:text-base lg:leading-none"
                        />
                    </div>
                    <BCMSImage
                        :media="item.image"
                        :client="bcms"
                        class="absolute top-0 left-0 w-full h-full object-cover"
                    />
                    <div
                        class="absolute top-0 left-0 w-full h-full bg-black/30"
                    />
                </div>
            </div>
        </div>
        <HomePageDivider />
    </section>
</template>

<script setup lang="ts">
import type { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-vue';
import type { PropRichTextDataParsed } from '@thebcms/types';
import type { TextWithImageGroup } from '~/bcms/types/ts';

defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: Object as PropType<PropRichTextDataParsed>,
        required: true,
    },
    items: {
        type: Array as PropType<TextWithImageGroup[]>,
        required: true,
    },
    bcms: {
        type: Object as PropType<ClientConfig>,
        required: true,
    },
});
</script>

<style lang="scss">
.homeAmbience--gridItem {
    &:nth-of-type(5n + 1) {
        @apply col-span-2 row-span-2 aspect-[1.49] lg:row-span-1 lg:aspect-[3.82];
    }
    &:nth-of-type(5n + 3) {
        @apply row-span-2;
    }
    &:nth-of-type(5n + 4) {
        @apply row-span-2;
    }
}
</style>
