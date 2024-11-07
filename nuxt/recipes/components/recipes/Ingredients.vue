<template>
    <div class="mb-8 lg:mb-16">
        <h2
            class="leading-none font-medium tracking-[-0.41px] text-appGray-700 mb-6 lg:text-2xl lg:leading-none"
        >
            Ingredients
        </h2>
        <div class="grid grid-cols-1 gap-2 lg:grid-cols-2 lg:gap-6">
            <div
                v-for="(ingredient, index) in ingredients"
                :key="index"
                class="border border-[#E8E8E8] rounded-lg px-[14px] py-[18px] lg:p-5"
            >
                <ContentManager
                    :items="ingredient.nodes"
                    class="recipeIngredients--content text-xs leading-none tracking-[-0.41px] font-medium text-[#9C9C9C] lg:text-base lg:leading-none"
                />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { PropRichTextDataParsed } from '@thebcms/types';

defineProps({
    ingredients: {
        type: Array as PropType<PropRichTextDataParsed[]>,
        required: true,
    },
});
</script>

<style lang="scss">
.recipeIngredients--content {
    strong {
        @apply font-semibold text-appGray-700;
    }
}
</style>
