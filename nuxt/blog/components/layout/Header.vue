<template>
    <header class="relative z-50">
        <div class="relative z-10 container">
            <nav class="relative flex items-center justify-between pt-6">
                <NuxtLink to="/" class="flex" aria-label="Home page">
                    <SvgoLogo
                        filled
                        :font-controlled="false"
                        class="w-[125px] md:w-[165px]"
                        :class="[
                            showMobileMenu
                                ? 'max-md:grayscale max-md:brightness-0 max-md:invert'
                                : '',
                        ]"
                    />
                </NuxtLink>
                <ul
                    class="flex gap-6 max-md:absolute max-md:left-0 max-md:-bottom-6 max-md:translate-y-full max-md:w-full md:flex-row md:justify-center lg:gap-10"
                    :class="[showMobileMenu ? 'flex-col' : 'max-md:hidden']"
                >
                    <li v-for="(item, index) in nav" :key="index">
                        <NuxtLink
                            :to="item.url"
                            class="text-xl leading-none tracking-[-0.41px] max-md:text-white"
                        >
                            {{ item.label }}
                        </NuxtLink>
                    </li>
                </ul>
                <button
                    class="flex md:hidden"
                    aria-label="Toggle mobile menu"
                    @click="showMobileMenu = !showMobileMenu"
                >
                    <SvgoX
                        v-if="showMobileMenu"
                        filled
                        :font-controlled="false"
                        class="w-6 h-6"
                        :class="[
                            showMobileMenu
                                ? 'max-md:grayscale max-md:brightness-0 max-md:invert'
                                : '',
                        ]"
                    />
                    <SvgoMenu
                        v-else
                        filled
                        :font-controlled="false"
                        class="w-6 h-6"
                    />
                </button>
            </nav>
        </div>
        <template v-if="showMobileMenu">
            <div
                class="fixed top-0 left-0 w-screen h-screen bg-appText md:hidden"
            />
            <TopGradient class="md:hidden" />
        </template>
    </header>
</template>

<script setup lang="ts">
const showMobileMenu = ref(false);

const nav = [
    {
        label: 'Home',
        url: '/',
    },
    {
        label: 'Blog',
        url: '/blog',
    },
    {
        label: 'About me',
        url: '/about-me',
    },
    {
        label: 'Contact',
        url: '/contact',
    },
];
</script>
