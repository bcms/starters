<template>
    <footer class="bg-black text-white py-8 lg:py-14">
        <div class="container">
            <div
                class="flex items-center justify-center gap-6 pb-5 border-b border-[#302E45] mb-5 lg:gap-8 lg:mb-6"
            >
                <a
                    v-for="(link, index) in socials"
                    :key="index"
                    :href="link.href"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="text-sm leading-none font-PlayfairDisplay font-medium tracking-[-0.41px] text-appGray-200 transition-colors duration-300 hover:text-white lg:text-base lg:leading-none"
                >
                    {{ link.label }}
                </a>
            </div>
            <div class="lg:flex lg:items-center lg:justify-between">
                <nav
                    class="flex items-center justify-center gap-2 max-lg:mb-8 lg:order-2 lg:gap-4"
                >
                    <template v-for="(link, index) in nav" :key="index">
                        <NuxtLink
                            :to="link.href"
                            class="text-xs leading-none font-medium tracking-[-0.41px] text-white hover:underline lg:text-sm lg:leading-none"
                        >
                            {{ link.label }}
                        </NuxtLink>
                        <div
                            v-if="index !== nav.length - 1"
                            class="w-1 h-1 rounded-full bg-appGray-100"
                        />
                    </template>
                </nav>
                <a
                    href="https://thebcms.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-center max-lg:mb-3 lg:order-1"
                >
                    <div
                        class="text-sm leading-none font-medium tracking-[-0.41px] text-[#B2AFCC] mr-2 lg:text-base lg:leading-none lg:mr-3"
                    >
                        Powered by
                    </div>
                    <img src="/logo.png" class="w-[55px] lg:w-[83px]" />
                </a>
                <div
                    class="text-xs leading-none font-medium tracking-[-0.41px] text-center text-[#83808C] lg:order-3 lg:text-base lg:leading-none"
                >
                    &copy; {{ new Date().getFullYear() }} BCMS. All rights
                    reserved
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const socials = [
    {
        label: 'Instagram',
        href: 'https://www.instagram.com/',
    },
    {
        label: 'Facebook',
        href: 'https://www.facebook.com/',
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/',
    },
    {
        label: 'X',
        href: 'https://X.com/',
    },
];
const nav = [
    {
        label: 'Privacy and policy',
        href: '/legal',
    },
    {
        label: 'Terms and Conditions',
        href: '/legal',
    },
    {
        label: 'Contact us',
        href: '/contact',
    },
];
</script>
