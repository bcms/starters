<template>
    <div class="flex flex-col">
        <NuxtLink :to="`/shop/${card.slug}`" class="group flex flex-col">
            <div class="flex overflow-hidden mb-6">
                <div class="size-full">
                    <BcmsImage
                        :media="card.cover"
                        class="w-full h-[320px] object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                </div>
            </div>
            <div class="mb-6">
                <h3 class="text-2xl leading-none tracking-[-0.5px] mb-3">
                    {{ card.title }}
                </h3>
                <div class="flex items-center gap-1">
                    <span
                        class="text-2xl leading-none tracking-[-0.5px] font-bold"
                    >
                        ${{ (card.discounted_price || card.price).toFixed(2) }}
                    </span>
                    <span
                        v-if="card.discounted_price"
                        class="text-lg leading-none tracking-[-0.4px] line-through text-appGray-500"
                    >
                        ${{ card.price.toFixed(2) }}
                    </span>
                </div>
            </div>
        </NuxtLink>
        <div>
            <div
                v-if="emptySizeError"
                class="text-appError text-sm leading-none mb-3"
            >
                {{ emptySizeError }}
            </div>
            <div class="flex flex-wrap gap-3 mb-6">
                <button
                    v-for="(size, index) in card.sizes"
                    :key="index"
                    :disabled="!size.available"
                    class="w-8 h-8 flex items-center justify-center bg-appGray-100 leading-none tracking-[-0.3px] transition-colors duration-300"
                    :class="[
                        size.available
                            ? selectedSize?.title === size.size.meta.en?.title
                                ? 'text-appGray-800 bg-appGray-200 border border-appText hover:bg-appGray-200'
                                : 'text-appGray-800 hover:bg-appGray-200'
                            : 'text-appGray-400 cursor-default',
                    ]"
                    :title="`${size.size.meta.en?.title} Size`"
                    @click="
                        selectedSize = size.size.meta.en;
                        emptySizeError = '';
                    "
                >
                    {{ size.size.meta.en?.title }}
                </button>
            </div>
        </div>
        <button
            class="flex justify-center w-full leading-none tracking-[-0.3px] px-14 pt-3.5 pb-[18px] bg-appText text-white transition-colors duration-300 hover:bg-appText/80"
            :disabled="isLoading"
            @click="addToCart"
        >
            <span> Add to cart </span>
            <SvgoLoader
                v-if="isLoading"
                class="w-3.5 h-3.5 ml-3 mt-0.5 animate-spin"
                filled
                :font-controlled="false"
            />
        </button>
    </div>
</template>

<script setup lang="ts">
import type { ProductSizeEntryMetaItem } from '~/bcms/type/ts';

const props = defineProps({
    card: {
        type: Object as PropType<ProductLite>,
        required: true,
    },
});

const { addCartItem } = useCart();

const isLoading = ref(false);

const emptySizeError = ref('');
const selectedSize = ref<ProductSizeEntryMetaItem>();

const addToCart = () => {
    if (selectedSize.value) {
        isLoading.value = true;
        setTimeout(() => {
            addCartItem({
                slug: props.card.slug,
                title: props.card.title,
                size: selectedSize.value as ProductSizeEntryMetaItem,
                cover: props.card.cover,
                price: props.card.discounted_price || props.card.price,
                color: props.card.color,
            });
            isLoading.value = false;
        }, 750);
    } else {
        emptySizeError.value = 'Please select a size';
    }
};
</script>
