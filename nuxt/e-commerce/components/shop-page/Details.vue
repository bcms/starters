<template>
    <div class="border border-appGray-30 p-4 lg:p-6">
        <div class="flex items-center justify-between gap-4 mb-6">
            <div>
                <h1
                    class="text-[24px] leading-none tracking-[-0.64px] mb-3 lg:text-[32px]"
                >
                    {{ meta.title }}
                </h1>
                <div
                    v-if="meta.units_sold"
                    class="leading-none tracking-[-0.32px] text-appGray-800"
                >
                    {{ meta.units_sold }} Sold
                </div>
            </div>
            <div class="text-right">
                <div
                    class="text-[20px] leading-none tracking-[-0.48px] mb-1 lg:text-[24px]"
                >
                    ${{ meta.price.toFixed(2) }}
                </div>
                <div
                    v-if="meta.discounted_price"
                    class="leading-none tracking-[-0.32px] text-appGray-500 line-through"
                >
                    ${{ meta.discounted_price.toFixed(2) }}
                </div>
            </div>
        </div>
        <div
            class="grid grid-cols-1 gap-4 pb-4 border-b border-appGray-300 mb-8"
        >
            <button
                class="flex justify-center w-full leading-none tracking-[-0.3px] px-14 pt-3.5 pb-[18px] bg-appText text-white transition-colors duration-300 hover:bg-appText/80"
                @click="buy"
            >
                Buy now
            </button>
            <button
                class="flex justify-center w-full leading-none tracking-[-0.3px] px-14 pt-3.5 pb-[18px] bg-white border border-appText transition-colors duration-300 hover:bg-appText hover:text-white"
                :disabled="isLoading"
                @click="addToCart()"
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
        <div class="mb-8">
            <div class="leading-none tracking-[-0.32px] text-appGray-800 mb-4">
                Size
            </div>
            <div class="flex flex-wrap gap-3">
                <button
                    v-for="(size, index) in meta.sizes"
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
                    @click="selectedSize = size.size.meta.en"
                >
                    {{ size.size.meta.en?.title }}
                </button>
            </div>
        </div>
        <div class="mb-8">
            <div class="leading-none tracking-[-0.32px] text-appGray-800 mb-4">
                Colors
            </div>
            <div class="flex flex-wrap gap-3">
                <button
                    v-for="(color, index) in colors"
                    :key="index"
                    class="w-10 h-10 flex items-center justify-center bg-appGray-100 leading-none tracking-[-0.3px] transition-colors duration-300"
                    :class="[
                        activeColor.meta.en?.slug === color.meta.en?.slug
                            ? 'text-appGray-800 bg-appGray-200 border border-appText hover:bg-appGray-200'
                            : 'text-appGray-800 hover:bg-appGray-200',
                    ]"
                    :title="`${color.meta.en?.title} Color`"
                    @click="$emit('colorChange', color)"
                >
                    <div
                        class="w-8 h-8"
                        :style="{
                            background: color.meta.en?.hex,
                        }"
                    />
                </button>
            </div>
        </div>
        <div>
            <div class="leading-none tracking-[-0.32px] text-appGray-800 mb-4">
                Description
            </div>
            <ContentManager
                :items="meta.description.nodes"
                class="productDetails--description"
            />
        </div>
    </div>
</template>

<script setup lang="ts">
import type {
    ProductColorEntry,
    ProductColorEntryMetaItem,
    ProductEntryMetaItem,
    ProductSizeEntryMetaItem,
} from '~/bcms/type/ts';

const props = defineProps({
    meta: {
        type: Object as PropType<ProductEntryMetaItem>,
        required: true,
    },
    activeColor: {
        type: Object as PropType<ProductColorEntry>,
        required: true,
    },
});

defineEmits(['colorChange']);

const { addCartItem } = useCart();
const router = useRouter();

const isLoading = ref(false);

const buy = () => {
    addToCart(true);
};

const addToCart = (redirect?: boolean) => {
    if (selectedSize.value) {
        isLoading.value = true;
        setTimeout(() => {
            addCartItem({
                slug: props.meta.slug,
                title: props.meta.title,
                size: (selectedSize.value ||
                    props.meta.sizes[0].size.meta
                        .en) as ProductSizeEntryMetaItem,
                cover: props.meta.gallery[0].image,
                price: props.meta.discounted_price || props.meta.price,
                color: props.activeColor.meta.en as ProductColorEntryMetaItem,
            });
            isLoading.value = false;
        }, 750);
        if (redirect) {
            router.push('/shop/cart');
        }
    }
};

const selectedSize = ref<ProductSizeEntryMetaItem | undefined>(
    props.meta.sizes[0].size.meta.en,
);

const colors = computed(() => {
    return props.meta.gallery
        .map((item) => item.color)
        .filter(
            (e, _, arr) =>
                arr.find((i) => i.meta.en?.slug === e.meta.en?.slug) === e,
        );
});
</script>

<style lang="scss">
.productDetails {
    &--description {
        @apply grid grid-cols-1 gap-2.5;
        p {
            @apply leading-[1.3] text-appGray-600;
        }
    }
}
</style>
