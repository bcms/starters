<template>
    <section class="mb-8 md:mb-14 lg:mb-20 xl:mb-32">
        <div class="container">
            <div
                class="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-4 lg:gap-y-12"
            >
                <template v-for="(item, index) in items">
                    <div
                        v-if="item.meta.en"
                        :key="index"
                        class="flex flex-col gap-4"
                    >
                        <div
                            class="aspect-[0.76] rounded-2xl overflow-hidden lg:aspect-[1.39]"
                            :style="{
                                boxShadow:
                                    '0px 0px 0px 0.227px #EDEDED, 0px 0.34px 0.227px 0px rgba(15, 18, 35, 0.14)',
                            }"
                        >
                            <BCMSImage
                                v-if="item.meta.en"
                                :key="index"
                                :media="item.meta.en.image"
                                :client="bcms"
                                class="size-full object-cover"
                            />
                        </div>
                        <div class="flex flex-col gap-3">
                            <h3
                                class="font-Inter text-sm font-semibold leading-[1.2] tracking-[-0.28px] lg:text-base lg:leading-none lg:tracking-[-0.32px]"
                            >
                                {{ item.meta.en.title }}
                            </h3>
                            <ContentManager
                                :items="item.meta.en.description.nodes"
                                class="text-appGray-200 text-xs font-medium leading-[1.3] tracking-[-0.24px] lg:text-base lg:leading-[1.4] lg:tracking-[-0.32px] lg:max-w-[85%]"
                            />
                        </div>
                    </div>
                </template>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-vue';
import type { TeamMemberEntry } from '~/bcms/types/ts';

defineProps({
    items: {
        type: Array as PropType<TeamMemberEntry[]>,
        required: true,
    },
    bcms: {
        type: Object as PropType<ClientConfig>,
        required: true,
    },
});
</script>
