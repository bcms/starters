<template>
    <section class="pt-[108px] pb-10 overflow-hidden md:pb-14 lg:pt-[218px]">
        <div class="container max-w-[1198px]">
            <ArchWithStar />
            <div
                class="relative px-4 max-w-[400px] mx-auto lg:max-w-[962px] xl:px-0"
            >
                <SvgoAboutUsOutline
                    filled
                    :font-controlled="false"
                    class="absolute w-[220px] right-[30px] lg:w-[822px] lg:-right-4 lg:-top-6"
                />
                <ContentManager
                    :items="title.nodes"
                    class="aboutHero--title relative z-10 text-xl leading-none font-Gloock mb-2 lg:text-[56px] lg:leading-none lg:mb-3"
                />
                <ContentManager
                    :items="subtitle.nodes"
                    class="relative z-10 text-[10px] leading-[1.2] uppercase max-w-max ml-auto mb-10 lg:text-base lg:leading-[1.2] lg:mb-[120px]"
                />
            </div>
            <BCMSImage
                :media="cover"
                :client="bcms"
                class="w-full object-cover aspect-[1.635] mb-4 lg:aspect-[2.67] lg:mb-10"
            />
            <ContentManager
                :items="description.nodes"
                class="text-sm leading-[1.3] tracking-[-0.41px] uppercase text-appGray-700 mb-6 lg:text-[32px] lg:leading-[1.3] lg:mb-14"
            />
            <Btn to="/menu" class="uppercase max-w-max mx-auto">
                <span>Browse menu</span>
            </Btn>
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
    title: {
        type: Object as PropType<PropRichTextDataParsed>,
        required: true,
    },
    subtitle: {
        type: Object as PropType<PropRichTextDataParsed>,
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
</script>

<style lang="scss">
.aboutHero--title {
    h1 {
        @apply flex flex-col gap-1.5 lg:gap-3;
        u {
            @apply no-underline;
        }
        br ~ u {
            @apply text-right;
        }
    }
}
</style>
