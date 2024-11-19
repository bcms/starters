<template>
    <section>
        <div class="container">
            <h2
                class="text-2xl leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] text-center mb-4 lg:text-5xl lg:leading-none lg:mb-5"
            >
                {{ title }}
            </h2>
            <ContentManager
                :items="description.nodes"
                class="text-sm leading-[1.4] font-medium tracking-[-0.41px] text-appGray-600 text-center max-w-[833px] mx-auto mb-10 lg:text-lg lg:leading-normal lg:mb-[105px]"
            />
            <div
                class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-12 xl:gap-y-14"
            >
                <div v-for="(member, index) in members" :key="index">
                    <div
                        class="relative rounded-xl overflow-hidden mb-[18px] lg:mb-6"
                    >
                        <BCMSImage
                            :media="member.image"
                            :client="bcms"
                            class="aspect-[1.69] object-cover xl:aspect-square"
                        />
                        <div
                            class="absolute top-0 left-0 w-full h-full bg-black/40"
                        />
                    </div>
                    <div
                        class="text-sm leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] mb-1.5 lg:text-2xl lg:leading-none lg:mb-[14px]"
                    >
                        {{ member.title }}
                    </div>
                    <div
                        class="text-xs leading-none font-medium tracking-[-0.41px] text-[#48465F] mb-3 lg:text-xl lg:leading-none lg:mb-5"
                    >
                        {{ member.role }}
                    </div>
                    <ContentManager
                        :items="member.description.nodes"
                        class="text-xs leading-[1.4] font-medium tracking-[-0.41px] text-appGray-600 lg:text-lg lg:leading-normal"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-vue';
import type { PropRichTextDataParsed } from '@thebcms/types';
import type { TeamMemberEntryMetaItem } from '~/bcms/types/ts';

defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: Object as PropType<PropRichTextDataParsed>,
        required: true,
    },
    members: {
        type: Array as PropType<TeamMemberEntryMetaItem[]>,
        required: true,
    },
    bcms: {
        type: Object as PropType<ClientConfig>,
        required: true,
    },
});
</script>
