<template>
    <section class="relative h-screen flex items-center py-20">
        <div class="container">
            <div
                class="relative z-10 flex flex-col items-center justify-center h-full text-center"
            >
                <h2
                    class="text-[32px] leading-[1.2] tracking-[-0.1px] text-appGray-900 max-w-[890px] mx-auto mb-4 md:text-[48px]"
                >
                    {{ title }}
                </h2>
                <p
                    class="text-[20px] leading-[1.3] text-appGray-600 max-w-[710px] mx-auto mb-10"
                >
                    {{ description }}
                </p>
                <Btn theme="light-green" :to="cta.to" :label="cta.label" />
            </div>
        </div>
        <div class="absolute top-0 left-0 size-full">
            <BcmsImage :media="image" class="size-full object-cover" />
        </div>
    </section>
</template>

<script setup lang="ts">
import type { PropMediaDataParsed } from '@thebcms/types';

defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    cta: {
        type: Object as PropType<{
            label: string;
            to: string;
        }>,
        required: true,
    },
    image: {
        type: Object as PropType<PropMediaDataParsed>,
        required: true,
    },
});
</script>
