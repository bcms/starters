<template>
    <div
        v-if="res"
        class="flex flex-col gap-6 mb-6 md:mb-8 lg:gap-8 lg:items-start lg:mb-12"
        :class="[
            data.image_alignment === 'LEFT'
                ? 'lg:flex-row-reverse'
                : 'lg:flex-row',
        ]"
    >
        <ContentManager
            v-if="data.text && hasText"
            :items="data.text.nodes"
            class="prose"
        />
        <BCMSImage
            v-if="data.image"
            :media="data.image"
            :client="res.bcms"
            :className="`aspect-[2.07] rounded-lg overflow-hidden w-full cover flex-shrink-0 lg:rounded-2xl ${
                hasText
                    ? 'lg:aspect-[1.14] lg:w-[500px] lg:mb-0 xl:w-[728px]'
                    : 'lg:aspect-[2.43]'
            }`"
        />
    </div>
</template>

<script setup lang="ts">
import { BCMSImage } from '@thebcms/components-vue';
import type { TextWithImageWidget } from '~/bcms/types/ts';
import type { ConfigResponse } from '~/server/api/config';

const props = defineProps({
    data: {
        type: Object as PropType<TextWithImageWidget>,
        required: true,
    },
});

const { data: res } = await useFetch<ConfigResponse>('/api/config');

const hasText = computed(() => {
    const text = props.data.text;

    return text && text.nodes.length > 0;
});
</script>
