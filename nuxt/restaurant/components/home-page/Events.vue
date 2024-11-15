<template>
    <section class="overflow-hidden">
        <div class="container">
            <div class="flex flex-col items-center mb-8 lg:mb-20">
                <div
                    class="text-xs leading-none mb-2.5 lg:text-base lg:leading-none lg:mb-[14px]"
                >
                    [ 5 ]
                </div>
                <h2
                    class="text-lg leading-none uppercase font-Gloock mb-4 lg:text-5xl lg:leading-none lg:mb-6"
                >
                    {{ title }}
                </h2>
                <ContentManager
                    :items="description.nodes"
                    class="text-sm leading-[1.3] tracking-[-0.41px] text-appGray-700 uppercase max-w-[745px] mx-auto mb-8 lg:text-base lg:leading-[1.3] lg:mb-[45px]"
                />
            </div>
            <div
                v-if="items.length > 0"
                class="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-8"
            >
                <EventsPageEventCard
                    v-for="(item, index) in items"
                    :key="index"
                    :card="item"
                    :bcms="bcms"
                />
            </div>
            <div
                v-else
                class="text-sm leading-none tracking-[-0.41px] text-center text-appGray-700 my-20"
            >
                No events
            </div>
        </div>
        <HomePageDivider arc />
    </section>
</template>

<script setup lang="ts">
import type { ClientConfig } from '@thebcms/client';
import type { PropRichTextDataParsed } from '@thebcms/types';
import type { EventGroup } from '~/bcms/types/ts';

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
        type: Array as PropType<EventGroup[]>,
        required: true,
    },
    bcms: {
        type: Object as PropType<ClientConfig>,
        required: true,
    },
});
</script>
