<template>
    <section
        class="relative mb-14 md:py-20 md:mb-20 lg:py-[104px] lg:mb-[120px]"
    >
        <div class="container max-w-[1198px]">
            <div class="grid grid-cols-1 gap-8 md:gap-20 lg:gap-[112px]">
                <div
                    v-for="(col, index) in data"
                    :key="index"
                    class="md:flex md:items-center md:even:flex-row-reverse md:gap-20 lg:gap-[112px]"
                >
                    <div class="max-md:mb-4 md:flex-1">
                        <BCMSImage
                            :media="col.image"
                            :client="bcms"
                            class="w-full object-cover aspect-[1.7] lg:aspect-[1.36]"
                        />
                    </div>
                    <ContentManager
                        :items="col.text.nodes"
                        class="text-xs leading-[1.3] tracking-[-0.41px] uppercase text-appGray-700 md:flex-1 lg:text-[22px] lg:leading-[1.3]"
                    />
                </div>
            </div>
        </div>
        <div
            class="absolute top-0 left-1/2 -translate-x-1/2 w-px h-full bg-[#D9D9D9] max-md:hidden"
        />
    </section>
</template>

<script setup lang="ts">
import type { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-vue';
import type { TextWithImageGroup } from '~/bcms/types/ts';

defineProps({
    data: {
        type: Array as PropType<TextWithImageGroup[]>,
        required: true,
    },
    bcms: {
        type: Object as PropType<ClientConfig>,
        required: true,
    },
});
</script>
