<template>
    <section class="pt-12 pb-14 md:py-20 lg:py-[120px]">
        <div class="container">
            <Swiper
                :modules="[A11y, Pagination]"
                :slides-per-view="1.1"
                watch-overflow
                grab-cursor
                :space-between="16"
                :pagination="{
                    el: '.homeTestimonials--pagination',
                    bulletElement: 'button',
                    bulletClass: 'homeTestimonials--pagination-btn',
                    bulletActiveClass:
                        'homeTestimonials--pagination-btn_active',
                    clickable: true,
                }"
                :breakpoints="{
                    640: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    },
                    1280: {
                        slidesPerView: 4,
                        spaceBetween: 32,
                    },
                }"
            >
                <SwiperSlide
                    v-for="(slide, index) in testimonials"
                    :key="index"
                    class="homeTestimonials--slide flex flex-col bg-appLight rounded-lg p-5 border border-[#CCCAC6] xl:p-8"
                >
                    <div class="flex items-center mb-[18px]">
                        <BCMSImage
                            :media="slide.author.avatar_image"
                            :client="bcms"
                            class="w-8 h-8 object-cover rounded-full mr-[14px] xl:w-10 xl:h-10"
                        />
                        <span
                            class="text-sm leading-none font-semibold font-PlayfairDisplay tracking-[-0.41px] xl:text-base xl:leading-none"
                        >
                            {{ slide.author.name }}
                        </span>
                    </div>
                    <ContentManager
                        :items="slide.review.nodes"
                        class="text-sm leading-[1.45] font-medium text-appGray-600 tracking-[-0.41px] xl:text-base xl:leading-[1.45]"
                    />
                </SwiperSlide>
            </Swiper>
            <div
                class="homeTestimonials--pagination flex items-center gap-2.5 mt-8 lg:mt-12"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import type { ClientConfig } from '@thebcms/client';
import { BCMSImage } from '@thebcms/components-vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { A11y, Pagination } from 'swiper/modules';
import type { TestimonialEntryMetaItem } from '~/bcms/types/ts';

defineProps({
    testimonials: {
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
.homeTestimonials--slide {
    @apply h-auto;
}
.homeTestimonials--pagination {
    &-btn {
        @apply flex flex-1 w-full h-[3px] rounded-[3px] bg-[#BDBBB7] transition-colors duration-300 lg:h-1;
        &_active {
            @apply bg-appAccent;
        }
    }
}
</style>
