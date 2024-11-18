<template>
    <section class="mb-4 lg:mb-6">
        <div class="container">
            <NuxtLink
                to="/services"
                class="flex items-center gap-1 text-appGray-300 transition-colors duration-300 mb-8 hover:text-appText lg:mb-6"
            >
                <span
                    class="font-Inter text-xs font-medium leading-none tracking-[-0.24px] lg:text-base lg:leading-none lg:tracking-[-0.32px]"
                >
                    {{ subtitle }}
                </span>
                <SvgoArrow />
            </NuxtLink>
            <div
                class="grid grid-cols-[37.5%,62.5%] min-h-[280px] rounded-2xl overflow-hidden"
                :style="{
                    boxShadow:
                        '0px 0px 0px 1px #EDEDED, 0px 1.5px 1px 0px rgba(15, 18, 35, 0.14)',
                }"
            >
                <BCMSImage
                    :media="cover"
                    :client="bcms"
                    class="size-full object-cover"
                />
                <div
                    class="flex flex-col justify-between bg-appAccent text-appText-light p-4 pr-8 lg:p-8"
                >
                    <h2
                        class="text-sm font-bold leading-tight tracking-[-0.28px] max-w-[540px] mb-14 lg:text-[32px] lg:font-bold lg:tracking-[-0.64px] lg:mb-[200px] xl:mb-[460px]"
                    >
                        {{ title }}
                    </h2>
                    <ContentManager
                        :items="description.nodes"
                        class="text-xs leading-tight tracking-[-0.24px] max-w-[428px] lg:text-base lg:leading-tight lg:tracking-[-0.32px]"
                    />
                </div>
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

defineProps({
    subtitle: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    cover: {
        type: Object as PropType<PropMediaDataParsed>,
        required: true,
    },
    description: {
        type: Object as PropType<PropRichTextDataParsed>,
        required: true,
    },
    bcms: {
        type: Object as PropType<ClientConfig>,
        required: true,
    },
});
</script>
