<template>
    <section class="pt-10 lg:pt-[104px]">
        <div class="container">
            <div
                class="max-w-[250px] mx-auto md:max-w-[350px] lg:max-w-[840px]"
            >
                <h1 class="homeHero--title mb-4 lg:mb-8">
                    <template v-for="(item, index) in title" :key="index">
                        <ContentManager
                            v-if="item.text && item.text.nodes.length > 0"
                            :key="index"
                            :items="item.text.nodes"
                            class="text-2xl leading-[1.4] font-medium font-PlayfairDisplay tracking-[-0.41px] md:text-4xl lg:text-[80px] lg:leading-[1.1]"
                        />
                        <BCMSImage
                            v-if="item.image"
                            :key="index"
                            :media="item.image"
                            :client="bcms"
                            class="object-cover w-[53px] h-6 flex-shrink-0 -translate-y-1 mx-1 bg-center bg-cover lg:w-[176px] lg:h-20 lg:mx-3 lg:-translate-y-5"
                        />
                    </template>
                </h1>
                <ContentManager
                    :items="description.nodes"
                    class="text-sm leading-[1.4] font-medium tracking-[-0.41px] text-center text-appGray-600 mb-8 md:text-base lg:leading-none lg:mb-10"
                />
                <Btn class="mx-auto mb-12 lg:mb-[120px]" @click="scrollToJobs">
                    <span>Search Jobs Now</span>
                </Btn>
            </div>
        </div>
        <div class="relative">
            <BCMSImage
                :media="cover"
                :client="bcms"
                class="w-full aspect-[2.76] object-cover lg:aspect-[3.1]"
            />
            <div class="absolute top-0 left-0 w-full h-full bg-black/60" />
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
import type { InlineTextWithImageGroup } from '~/bcms/types/ts';

defineProps({
    title: {
        type: Array as PropType<InlineTextWithImageGroup[]>,
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
    bcms: {
        type: Object as PropType<ClientConfig>,
        required: true,
    },
});

const scrollToJobs = () => {
    const jobs = document.getElementById('homeJobs');

    if (jobs) {
        jobs.scrollIntoView({ behavior: 'smooth' });
    }
};
</script>

<style lang="scss">
.homeHero--title {
    * {
        @apply inline;
    }
}
</style>
