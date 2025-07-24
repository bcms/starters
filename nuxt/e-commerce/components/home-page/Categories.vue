<template>
    <section>
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            <div
                v-for="(category, index) in data"
                :key="index"
                class="group relative aspect-square flex items-end p-8 overflow-hidden"
            >
                <div
                    class="relative z-10 transition-opacity duration-300 group-hover:opacity-0"
                >
                    <h2
                        class="flex items-end flex-wrap gap-4 text-white leading-none"
                    >
                        <span class="text-[32px] md:text-[40px]">
                            {{ category.meta.title }}
                        </span>
                        <span class="text-[18px] md:text-[24px]">
                            ({{ category.productsCount }} Product{{
                                category.productsCount === 0 ||
                                category.productsCount > 1
                                    ? 's'
                                    : ''
                            }}
                            )
                        </span>
                    </h2>
                </div>
                <NuxtLink
                    :to="`/shop${
                        category.productsCount > 0
                            ? '?category=' + category.meta.slug
                            : ''
                    }`"
                    class="absolute z-10 inset-0 bg-black/60 flex flex-col items-center justify-center text-center transition-all duration-300 ease-in-out opacity-0 group-hover:opacity-100"
                >
                    <div
                        class="text-white text-[28px] leading-none mb-6 md:text-[32px]"
                    >
                        {{ category.meta.title }}
                    </div>
                    <Btn :theme="ctaTheme" label="Shop now" />
                </NuxtLink>
                <div class="absolute top-0 left-0 size-full">
                    <BcmsImage
                        :media="category.meta.gallery[0]"
                        class="size-full object-cover"
                    />
                </div>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import type { ProductCategoryEntryMetaItem } from '~/bcms/type/ts';
import type { BtnTheme } from '~/types';

defineProps({
    data: {
        type: Array as PropType<
            Array<{
                meta: ProductCategoryEntryMetaItem;
                productsCount: number;
            }>
        >,
        required: true,
    },
    ctaTheme: {
        type: String as PropType<BtnTheme>,
        required: true,
    },
});
</script>
