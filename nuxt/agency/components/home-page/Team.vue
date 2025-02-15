<template>
    <section class="mb-8 lg:mb-20 xl:mb-32">
        <div class="container">
            <div
                class="grid grid-cols-[62.5%,37.5%] min-h-[280px] rounded-2xl overflow-hidden mb-4 lg:grid-cols-[51%,49%] lg:mb-6"
                :style="{
                    boxShadow:
                        '0px 0px 0px 1px #EDEDED, 0px 1.5px 1px 0px rgba(15, 18, 35, 0.14)',
                }"
            >
                <div
                    class="flex flex-col justify-between bg-appAccent2 text-appText-light p-4 pr-8 lg:p-8"
                >
                    <h2
                        class="text-sm font-bold leading-tight tracking-[-0.28px] max-w-[540px] mb-14 lg:text-[32px] lg:font-bold lg:tracking-[-0.64px] lg:mb-[200px] xl:mb-[520px]"
                    >
                        {{ title }}
                    </h2>
                    <ContentManager
                        :items="description.nodes"
                        class="text-xs leading-tight tracking-[-0.24px] max-w-[483px] lg:text-base lg:leading-tight lg:tracking-[-0.32px]"
                    />
                </div>
                <BCMSImage
                    :media="cover"
                    :client="bcms"
                    class="size-full object-cover"
                />
            </div>
            <div
                class="flex flex-col gap-6 mb-8 lg:flex-row lg:justify-between lg:mb-[72px]"
            >
                <div
                    class="text-appGray-300 font-Inter text-xs font-medium leading-none tracking-[-0.24px] lg:text-base lg:leading-none lg:tracking-[-0.32px] lg:flex-shrink-0"
                >
                    {{ subtitle }}
                </div>
                <div class="lg:max-w-[50%]">
                    <h2
                        class="font-bold leading-[1.2] tracking-[-0.32px] max-w-[52%] mb-2 lg:text-[32px] lg:tracking-[-0.64px] lg:max-w-[66%] xl:max-w-[60%]"
                    >
                        {{ members_title }}
                    </h2>
                    <ContentManager
                        :items="members_description.nodes"
                        class="text-appGray-200 text-xs font-medium leading-[1.3] tracking-[-0.24px] max-w-[66%] lg:text-base lg:leading-[1.3] lg:tracking-[-0.32px]"
                    />
                </div>
            </div>
            <div class="flex flex-col gap-2.5 lg:gap-6">
                <div class="grid grid-cols-3 gap-2 lg:gap-6">
                    <template v-for="(item, index) in members">
                        <div
                            v-if="item.meta.en"
                            class="aspect-[0.48] rounded overflow-hidden lg:rounded-2xl lg:aspect-[0.9]"
                            :style="{
                                boxShadow:
                                    '0px 0px 0px 0.227px #EDEDED, 0px 0.34px 0.227px 0px rgba(15, 18, 35, 0.14)',
                            }"
                        >
                            <BCMSImage
                                :key="index"
                                :media="item.meta.en.image"
                                :client="bcms"
                                class="size-full object-cover"
                            />
                        </div>
                    </template>
                </div>
                <NuxtLink
                    to="/team"
                    class="flex items-center gap-1 text-appGray-300 transition-colors duration-300 mb-8 hover:text-appText lg:mb-6"
                >
                    <span
                        class="font-Inter text-xs font-medium leading-none tracking-[-0.24px] lg:text-base lg:leading-none lg:tracking-[-0.32px]"
                    >
                        See our team
                    </span>
                    <SvgoArrow />
                </NuxtLink>
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
import type { TeamMemberEntry } from '~/bcms/types/ts';

defineProps({
    title: {
        type: String,
        required: true,
    },
    subtitle: {
        type: String,
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
    members_title: {
        type: String,
        required: true,
    },
    members_description: {
        type: Object as PropType<PropRichTextDataParsed>,
        required: true,
    },
    members: {
        type: Array as PropType<TeamMemberEntry[]>,
        required: true,
    },
    bcms: {
        type: Object as PropType<ClientConfig>,
        required: true,
    },
});
</script>
