<template>
    <section class="pb-10 lg:pb-14">
        <div class="relative container">
            <div
                class="relative z-10 mb-8 md:flex md:items-start md:justify-between md:gap-16 lg:gap-20 lg:mb-10"
            >
                <div class="flex items-center mb-[14px] md:mt-4">
                    <div
                        class="w-1.5 h-1.5 bg-appText rounded-full mr-2 lg:w-2.5 lg:h-2.5 lg:mr-4 lg:mt-1"
                    />
                    <h2
                        class="text-lg leading-none tracking-[-0.41px] font-Helvetica lg:text-[32px] lg:leading-none"
                    >
                        {{ title }}
                    </h2>
                </div>
                <div class="md:max-w-[761px]">
                    <ContentManager
                        :items="description.nodes"
                        class="homeTestimonials--description text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 pb-6 border-b border-appGray-100 mb-6 lg:text-base lg:leading-[1.4] lg:pb-8 lg:mb-8"
                    />
                    <div class="grid grid-cols-1 gap-6 lg:gap-8">
                        <div
                            v-for="(item, index) in items"
                            :key="index"
                            class="pb-6 border-b border-appGray-100 lg:pb-8"
                        >
                            <div class="flex items-center mb-[14px] lg:mb-6">
                                <BCMSImage
                                    :media="item.author_image"
                                    :client="bcms"
                                    class="w-8 h-8 rounded-full overflow-hidden object-cover mr-2.5 lg:w-12 lg:h-12 lg:mr-4"
                                />
                                <div
                                    class="text-sm leading-none tracking-[-0.41px] font-Helvetica lg:text-lg lg:leading-none"
                                >
                                    {{ item.title }}
                                </div>
                            </div>
                            <ContentManager
                                :items="item.content.nodes"
                                class="text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 lg:text-[15px] lg:leading-[1.4]"
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="absolute top-[50%] -left-[10%] w-[296px] h-[296px] rounded-full opacity-20 blur-[120px] bg-blend-overlay bg-[#FFBF4B] pointer-events-none max-md:hidden"
            />
            <div
                class="absolute top-[30%] left-0 w-[296px] h-[296px] rounded-full opacity-20 blur-[120px] bg-blend-overlay bg-[#3A437E] pointer-events-none max-md:hidden"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import type { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-vue';
import type { PropRichTextDataParsed } from '@thebcms/types';
import type { TestimonialEntryMetaItem } from '~/bcms/types/ts';

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
        type: Array as PropType<TestimonialEntryMetaItem[]>,
        required: true,
    },
    bcms: {
        type: Object as PropType<ClientConfig>,
        required: true,
    },
});
</script>

<style lang="scss">
.homeTestimonials {
    &--description {
        strong {
            @apply font-medium text-appGray-600;
        }
    }
}
</style>
