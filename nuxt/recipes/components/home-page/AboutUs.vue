<template>
    <section class="relative pb-8 lg:pb-20 xl:pb-[120px]">
        <div class="container">
            <div
                class="relative rounded-[20px] overflow-hidden p-4 lg:p-8 lg:pt-32 xl:pt-[280px]"
            >
                <div
                    class="relative z-10 flex flex-col items-center text-center rounded-2xl px-4 py-6 bg-white/90 backdrop-blur-sm md:items-start md:text-left md:max-w-[540px] md:ml-auto lg:max-w-[740px] lg:p-10 lg:backdrop-blur"
                >
                    <h2
                        class="leading-none font-semibold tracking-[-0.41px] text-appAccent mb-[14px] lg:text-[28px] lg:leading-none lg:mb-5"
                    >
                        {{ data.title }}
                    </h2>
                    <ContentManager
                        :items="data.description.nodes"
                        class="text-xs font-medium text-appGray-400 leading-normal mb-6 lg:text-xl lg:leading-normal lg:mb-8"
                    />
                    <div
                        class="grid grid-cols-1 gap-6 md:grid-cols-3 lg:gap-10"
                    >
                        <div
                            v-for="(item, index) in data.stats"
                            :key="index"
                            class="flex flex-col items-center text-appAccent tracking-[-0.41px]"
                        >
                            <div
                                class="text-xl leading-none font-semibold mb-2.5 lg:text-[40px] lg:mb-[14px]"
                            >
                                {{ item.value }}
                            </div>
                            <div
                                class="text-sm leading-none font-medium text-appGray-400 lg:text-base lg:leading-none"
                            >
                                {{ item.label }}
                            </div>
                        </div>
                    </div>
                </div>
                <BcmsImage
                    :media="data.cover_image"
                    class="absolute top-0 left-0 w-full h-full object-cover"
                />
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { HomeAboutUsGroup } from '~/bcms/type/ts';

defineProps({
    data: {
        type: Object as PropType<HomeAboutUsGroup>,
        required: true,
    },
});
</script>
