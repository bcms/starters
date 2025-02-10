<template>
    <header class="fixed top-0 left-0 w-full bg-white z-50">
        <div class="relative z-10 container">
            <nav
                class="relative flex items-center justify-between py-6 md:py-8"
            >
                <NuxtLink to="/" class="flex" aria-label="Home page">
                    <SvgoLogo
                        filled
                        :font-controlled="false"
                        class="w-[92px]"
                        :class="[
                            showMobileMenu
                                ? 'max-md:grayscale max-md:brightness-0 max-md:invert'
                                : '',
                        ]"
                    />
                </NuxtLink>
                <div class="flex items-center gap-5 md:gap-8">
                    <div
                        class="header--nav gap-6 text-xl max-md:text-white max-md:absolute max-md:left-0 max-md:-bottom-6 max-md:translate-y-full max-md:w-full md:text-appGray-700 md:text-base"
                        :class="[showMobileMenu ? '' : 'max-md:hidden']"
                    >
                        <ul class="flex flex-col gap-x-4 md:flex-row">
                            <li class="flex items-center gap-4">
                                <NuxtLink
                                    to="/shop"
                                    class="flex leading-none py-2 transition-colors duration-300 md:hover:text-appText"
                                    >Shop</NuxtLink
                                >
                            </li>
                            <li
                                class="flex items-center gap-4 md:before:w-1 md:before:h-1 md:before:mt-1 md:before:rounded-full md:before:bg-appGray-700"
                            >
                                <NuxtLink
                                    to="/blog"
                                    class="flex leading-none py-2 transition-colors duration-300 md:hover:text-appText"
                                    >Blog</NuxtLink
                                >
                            </li>
                        </ul>
                    </div>
                    <NuxtLink
                        to="/shop/cart"
                        aria-label="My cart"
                        class="flex items-center gap-2 leading-none px-3 py-2 bg-appGray-100 rounded-[5px] transition-colors duration-300 hover:bg-appGray-300"
                    >
                        <SvgoCart
                            class="translate-y-0.5 w-4 h-4"
                            filled
                            :font-controlled="false"
                        />
                        <span class="text-gray-700">My cart</span>
                        <span class="font-bold font-sans text-sm"
                            >({{ cartLength }})</span
                        >
                    </NuxtLink>
                    <button
                        class="flex md:hidden"
                        aria-label="Toggle mobile menu"
                        @click="showMobileMenu = !showMobileMenu"
                    >
                        <SvgoX
                            v-if="showMobileMenu"
                            class="w-6 h-6"
                            :class="[
                                showMobileMenu
                                    ? 'max-md:grayscale max-md:brightness-0 max-md:invert'
                                    : '',
                            ]"
                        />
                        <SvgoMenu v-else class="w-6 h-6" />
                    </button>
                </div>
            </nav>
        </div>
        <div
            v-if="showMobileMenu"
            class="fixed top-0 left-0 w-screen h-screen bg-appText md:hidden"
        />
    </header>
</template>

<script setup lang="ts">
const { cartLength } = useCart();

const showMobileMenu = ref(false);
</script>
