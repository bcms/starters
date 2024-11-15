<template>
    <section class="pt-10 md:pt-20 lg:pt-[200px]">
        <div class="container">
            <div class="relative mb-[14px] lg:mb-12">
                <svg
                    viewBox="0 0 1376 986"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    xmlns:xlink="http://www.w3.org/1999/xlink"
                    class="w-full"
                >
                    <path
                        d="M0 238.786C403.766 -78.5849 972.234 -78.5849 1376 238.786V986H0V238.786Z"
                        fill="url(#pattern0)"
                    />
                    <defs>
                        <pattern
                            id="pattern0"
                            patternContentUnits="objectBoundingBox"
                            width="1"
                            height="1"
                        >
                            <use
                                xlink:href="#image0_560_272"
                                transform="matrix(0.000558036 0 0 0.000596162 0 -0.301242)"
                            />
                        </pattern>
                        <image
                            id="image0_560_272"
                            width="1792"
                            height="2688"
                            :xlink:href="`/home-cover.jpg`"
                        />
                    </defs>
                </svg>
                <div
                    class="absolute top-1 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center justify-between xl:top-10 xl:w-full"
                >
                    <div class="flex flex-col items-end max-xl:hidden">
                        <div class="text-lg leading-none mb-1.5">
                            {{ address }}
                        </div>
                        <HomePageMap :map="map" :bcms="bcms" />
                    </div>
                    <div class="h-px flex-1 bg-[#D9D9D9] mx-4 max-xl:hidden" />
                    <div
                        class="bg-white px-4 py-[14px] rounded-[128px] max-w-max lg:px-20 lg:py-14"
                    >
                        <div class="flex items-center">
                            <SvgoStar
                                filled
                                :font-controlled="false"
                                class="w-2 h-2 lg:w-12 lg:h-12"
                            />
                            <h1
                                class="text-xl leading-none font-Gloock mx-2.5 lg:text-[80px] lg:leading-none lg:mx-12 2xl:text-[112px] 2xl:leading-none"
                            >
                                {{ title }}
                            </h1>
                            <SvgoStar
                                filled
                                :font-controlled="false"
                                class="w-2 h-2 lg:w-12 lg:h-12"
                            />
                        </div>
                    </div>
                    <div class="h-px flex-1 bg-[#D9D9D9] mx-4 max-xl:hidden" />
                    <ContentManager
                        :items="open_time.nodes"
                        class="homeHero--openTime max-xl:hidden"
                    />
                </div>
            </div>
            <div class="flex items-start justify-between mb-6 xl:hidden">
                <div>
                    <div
                        class="text-sm leading-none mb-1.5 lg:text-lg lg:leading-none"
                    >
                        {{ address }}
                    </div>
                    <HomePageMap :map="map" :bcms="bcms" />
                </div>
                <ContentManager
                    :items="open_time.nodes"
                    class="homeHero--openTime"
                />
            </div>
            <div class="homeHero--description mb-6 lg:mb-14">
                <template v-for="(item, index) in description" :key="index">
                    <ContentManager
                        v-if="item.text && item.text.nodes.length > 0"
                        :key="index"
                        :items="item.text.nodes"
                        class="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-700 lg:text-[40px] lg:leading-none"
                    />
                    <BCMSImage
                        v-if="item.image"
                        :key="index"
                        :media="item.image"
                        :client="bcms"
                        class="image image_sm h-4 flex-shrink-0 mx-2 bg-center bg-cover lg:hidden"
                        :style="`width: ${item.image.width / 5}px`"
                    />
                    <BCMSImage
                        v-if="item.image"
                        :key="index"
                        :media="item.image"
                        :client="bcms"
                        class="image image_lg h-10 flex-shrink-0 mx-4 bg-center bg-cover max-lg:hidden lg:-translate-y-2"
                        :style="`width: ${item.image.width / 2}px`"
                    />
                </template>
            </div>
            <Btn
                to="/about-us"
                class="uppercase max-w-max mx-auto"
                aria-label="About us"
            >
                <span>Learn more <span class="sr-only">about us</span></span>
            </Btn>
            <HomePageDivider />
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
        type: String,
        required: true,
    },
    open_time: {
        type: Object as PropType<PropRichTextDataParsed>,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    map: {
        type: Object as PropType<PropMediaDataParsed>,
        required: true,
    },
    description: {
        type: Array as PropType<InlineTextWithImageGroup[]>,
        required: true,
    },
    bcms: {
        type: Object as PropType<ClientConfig>,
        required: true,
    },
});
</script>

<style lang="scss">
.homeHero {
    &--openTime {
        @apply text-xs leading-none text-appGray-400 text-right lg:text-sm lg:leading-none xl:text-left;
        strong {
            @apply inline-block text-sm leading-none font-normal text-appText mb-1.5 lg:text-lg lg:leading-none;
        }
    }
    &--description {
        * {
            @apply inline;
        }
        .image {
            @apply inline-block;
            &_sm {
                @apply lg:hidden;
            }
            &_lg {
                @apply hidden lg:inline-block;
            }
            picture {
                @apply flex h-full;
            }
        }
    }
}
</style>
