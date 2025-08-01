<template>
    <div>
        <div class="container pb-14 md:pb-20 lg:pb-[136px]">
            <template v-if="cartItems.length > 0">
                <div class="grid grid-cols-1 gap-4">
                    <div
                        v-for="(item, index) in cartItems"
                        :key="index"
                        class="border border-appGray-300 bg-white p-[26px] flex flex-col justify-between gap-10 md:flex-row md:items-center"
                    >
                        <div class="flex items-center gap-5">
                            <BcmsImage
                                :media="item.item.cover"
                                class="w-[96px] aspect-square object-cover"
                            />
                            <div>
                                <NuxtLink
                                    :to="`/shop/${item.item.slug}`"
                                    class="flex text-[24px] leading-none tracking-[-0.48px] mb-3"
                                >
                                    {{ item.item.title }}
                                </NuxtLink>
                                <div class="flex items-center gap-2">
                                    <div
                                        class="w-8 h-8 flex items-center justify-center bg-appGray-100 leading-none tracking-[-0.3px] text-appGray-800"
                                        :title="`${item.item.size.title} Size`"
                                    >
                                        {{ item.item.size.title }}
                                    </div>
                                    <div
                                        class="w-8 h-8 flex items-center justify-center border border-appGray-300"
                                        :title="`${item.item.color.title} Color`"
                                    >
                                        <div
                                            class="w-6 h-6"
                                            :style="{
                                                background: item.item.color.hex,
                                            }"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex items-center gap-16">
                            <div class="flex items-center gap-4">
                                <button
                                    class="flex items-center justify-center w-8 h-8 bg-appGray-100 transition-colors duration-300 hover:bg-appGray-200"
                                    @click="removeCartItem(item.item)"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-4 h-4"
                                    >
                                        <mask
                                            id="mask0_1616_68522"
                                            style="mask-type: alpha"
                                            maskUnits="userSpaceOnUse"
                                            x="0"
                                            y="0"
                                            width="16"
                                            height="16"
                                        >
                                            <rect
                                                width="16"
                                                height="16"
                                                fill="#D9D9D9"
                                            />
                                        </mask>
                                        <g mask="url(#mask0_1616_68522)">
                                            <path
                                                d="M3.3335 8.66536V7.33203H12.6668V8.66536H3.3335Z"
                                                fill="#121212"
                                            />
                                        </g>
                                    </svg>
                                </button>
                                <div
                                    class="flex items-center justify-center w-10 h-8 text-[24px] leading-none tracking-[-0.48px]"
                                >
                                    {{ item.amount }}
                                </div>
                                <button
                                    class="flex items-center justify-center w-8 h-8 bg-appGray-100 transition-colors duration-300 hover:bg-appGray-200"
                                    @click="addCartItem(item.item)"
                                >
                                    <svg
                                        width="16"
                                        height="16"
                                        viewBox="0 0 16 16"
                                        fill="none"
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="w-4 h-4"
                                    >
                                        <mask
                                            id="mask0_1616_68528"
                                            style="mask-type: alpha"
                                            maskUnits="userSpaceOnUse"
                                            x="0"
                                            y="0"
                                            width="16"
                                            height="16"
                                        >
                                            <rect
                                                width="16"
                                                height="16"
                                                fill="#D9D9D9"
                                            />
                                        </mask>
                                        <g mask="url(#mask0_1616_68528)">
                                            <path
                                                d="M7.3335 12.6654V8.66536H3.3335V7.33203H7.3335V3.33203H8.66683V7.33203H12.6668V8.66536H8.66683V12.6654H7.3335Z"
                                                fill="#121212"
                                            />
                                        </g>
                                    </svg>
                                </button>
                            </div>
                            <div
                                class="text-[24px] leading-none tracking-[-0.48px]"
                            >
                                ${{ item.item.price.toFixed(2) }}
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    class="flex items-center justify-between bg-[#F7F7F7] px-[26px] py-5 mt-8"
                >
                    <div>
                        <div
                            class="text-[20px] leading-none tracking-[-0.4px] text-appGray-500 mb-2.5"
                        >
                            Total
                        </div>
                        <div
                            class="text-[24px] leading-none tracking-[-0.48px]"
                        >
                            ${{ totalCartPrice }}
                        </div>
                    </div>
                    <button
                        class="flex bg-appText text-white p-4 leading-none tracking-[-0.32px]"
                    >
                        Checkout
                    </button>
                </div>
            </template>
            <div v-else class="flex flex-col items-center py-20">
                <div class="text-[32px] leading-none text-appGray-700 mb-10">
                    Your cart is empty
                </div>
                <NuxtLink
                    to="/shop"
                    class="flex max-w-max text-2xl leading-none tracking-[-0.5px] px-14 pt-3.5 pb-[18px] bg-white border border-appGray-400 mx-auto transition-colors duration-300 hover:bg-appText hover:text-white"
                >
                    Shop
                </NuxtLink>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { setOgHead } = useHeadTags();
const { cartItems, addCartItem, removeCartItem, totalCartPrice } = useCart();

useHead(() =>
    setOgHead({
        title: 'Cart - Moda',
    }),
);
</script>
