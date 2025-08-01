<template>
    <section class="relative">
        <div class="container">
            <div
                class="relative pt-24 pb-6 md:pb-10 lg:pt-[250px] lg:pb-[88px]"
            >
                <div
                    class="relative z-10 flex flex-col items-center text-center lg:items-start lg:text-left"
                >
                    <ContentManager
                        :items="title.nodes"
                        class="homePage--hero-title text-xl leading-[1.2] font-medium text-white mb-3 md:text-3xl lg:text-7xl lg:leading-[1.1] lg:mb-6"
                    />
                    <ContentManager
                        :items="description.nodes"
                        class="text-xs leading-none font-medium text-white mb-6 md:text-sm lg:text-xl lg:leading-none lg:mb-10"
                    />
                    <Btn to="/recipes">
                        <span class="mr-2">Browse recipes</span>
                        <SvgoArrowRight
                            filled
                            :font-controlled="false"
                            class="w-[14px] h-[14px] lg:w-5 lg:h-5"
                        />
                    </Btn>
                </div>
                <RecipesSearch
                    :recipes="recipes"
                    class="absolute z-10 top-10 right-0 w-[300px] max-lg:hidden"
                />
            </div>
        </div>
        <div class="absolute top-0 left-0 w-full h-full">
            <BcmsImage
                :media="cover"
                class="absolute top-0 left-0 w-full h-full object-cover position-top"
            />
            <div
                class="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-[#1E1E1E] to-[#1E1E1E]/0"
            />
        </div>
    </section>
</template>

<script setup lang="ts">
import type {
    PropMediaDataParsed,
    PropRichTextDataParsed,
} from '@thebcms/types';

defineProps({
    title: {
        type: Object as PropType<PropRichTextDataParsed>,
        required: true,
    },
    description: {
        type: Object as PropType<PropRichTextDataParsed>,
        required: true,
    },
    recipes: {
        type: Array as PropType<RecipeLight[]>,
        required: true,
    },
    cover: {
        type: Object as PropType<PropMediaDataParsed>,
        required: true,
    },
});
</script>

<style lang="scss">
.homePage--hero-title {
    i {
        @apply font-PlayfairDisplay;
    }
}
</style>
