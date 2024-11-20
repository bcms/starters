<template>
    <header class="relative z-50">
        <div class="relative z-10 container">
            <nav class="relative flex items-center justify-between pt-6">
                <NuxtLink to="/" class="flex md:flex-1" aria-label="Home page">
                    <SvgoLogo
                        filled
                        :font-controlled="false"
                        class="w-[34px] md:w-[50px]"
                        :class="[
                            showMobileMenu
                                ? 'max-md:grayscale max-md:brightness-100 max-md:invert'
                                : '',
                        ]"
                    />
                </NuxtLink>
                <ul
                    class="flex flex-col gap-8 transition-colors duration-300 max-md:absolute max-md:left-0 max-md:-bottom-8 max-md:translate-y-full max-md:w-full md:flex-row md:flex-1 md:justify-center lg:gap-10"
                    :class="[
                        showMobileMenu
                            ? 'flex flex-col text-white md:text-appGray-500'
                            : 'text-appGray-500 max-md:hidden',
                    ]"
                >
                    <li v-for="(item, index) in nav" :key="index">
                        <NuxtLink
                            :to="item.href"
                            class="text-sm leading-none font-medium tracking-[-0.41px] md:text-base md:leading-none transition-colors duration-300 md:hover:text-appText"
                        >
                            {{ item.label }}
                        </NuxtLink>
                    </li>
                </ul>
                <div
                    class="flex items-center justify-end flex-1 leading-none font-medium tracking-[-0.41px] max-lg:hidden"
                >
                    <SvgoPin
                        filled
                        :font-controlled="false"
                        class="w-4 h-4 mr-1"
                    />
                    <span>Sydney</span>
                    <div class="w-4 h-4 bg-appAccent rounded-full mx-2" />
                    <span>{{ timeNow }}</span>
                </div>
                <button
                    class="flex md:hidden"
                    aria-label="Toggle mobile menu"
                    @click="showMobileMenu = !showMobileMenu"
                >
                    <SvgoX
                        filled
                        :font-controlled="false"
                        v-if="showMobileMenu"
                        class="w-6 h-6 text-white"
                    />
                    <SvgoMenu
                        filled
                        :font-controlled="false"
                        v-else
                        class="w-6 h-6"
                    />
                </button>
            </nav>
        </div>
        <div
            v-if="showMobileMenu"
            class="fixed top-0 left-0 w-screen h-screen bg-appText md:hidden"
        />
    </header>
</template>

<script setup lang="ts">
const showMobileMenu = ref(false);

const nav = [
    {
        label: 'Home',
        href: '/',
    },
    {
        label: 'Services',
        href: '/services',
    },
    {
        label: 'About',
        href: '/about',
    },
    {
        label: 'Portfolio',
        href: '/portfolio',
    },
    {
        label: 'Testimonials',
        href: '/testimonials',
    },
    {
        label: 'Contact',
        href: '/contact',
    },
];

const timeNow = computed(() => {
    return new Date().toLocaleTimeString('en-US', {
        timeZone: 'Australia/Sydney',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    });
});
</script>
