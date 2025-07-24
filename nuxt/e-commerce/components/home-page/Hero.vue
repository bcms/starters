<template>
    <section class="relative overflow-hidden h-screen flex items-center">
        <div class="container">
            <div
                class="relative z-10 flex flex-col items-center justify-center h-full text-center"
            >
                <h1 class="sr-only">
                    {{ title }}
                </h1>
                <SvgoLogoWhite
                    class="w-[250px] text-white mb-8 md:w-[378px]"
                    filled
                    :font-controlled="false"
                />
                <p class="text-xl leading-none text-white">
                    {{ description }}
                </p>
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
    image: {
        type: Object as PropType<PropMediaDataParsed>,
        required: true,
    },
});
</script>
