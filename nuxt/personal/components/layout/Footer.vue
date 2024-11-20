<template>
    <footer class="pb-10">
        <div class="container">
            <div
                class="pb-6 border-b border-appGray-100 mb-6 md:flex md:items-end md:justify-between md:pb-8 md:mb-8"
            >
                <div
                    class="text-lg leading-[1.2] tracking-[-0.41px] font-Helvetica max-w-[174px] max-md:mb-6 md:text-3xl md:leading-[1.2] md:max-w-[300px] lg:text-[40px] lg:max-w-[394px]"
                >
                    Let’s create something beautiful together
                </div>
                <nav>
                    <ul
                        class="grid grid-cols-[repeat(2,auto)] gap-4 md:flex md:items-center md:gap-6"
                    >
                        <li v-for="(item, index) in nav" :key="index">
                            <NuxtLink
                                :to="item.href"
                                class="text-sm leading-none tracking-[-0.41px] lg:text-base lg:leading-none"
                            >
                                {{ item.label }}
                            </NuxtLink>
                        </li>
                    </ul>
                </nav>
            </div>
            <div
                class="sm:grid sm:grid-cols-2 lg:flex lg:items-center lg:justify-between"
            >
                <div
                    class="pb-6 border-b border-appGray-100 mb-6 sm:col-span-2 md:pb-8 md:mb-8 lg:col-span-1 lg:order-2 lg:border-none lg:pb-0 lg:mb-0"
                >
                    <ul class="grid grid-cols-2 gap-3 max-w-max sm:grid-cols-4">
                        <li v-for="(item, index) in socials" :key="index">
                            <a
                                :href="item.href"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="flex items-center justify-center px-4 py-[9px] border rounded-[32px] lg:py-3"
                                :class="[
                                    item.icon
                                        ? 'text-appGray-500 border-appGray-200'
                                        : 'text-white border-appText bg-appText',
                                ]"
                            >
                                <component
                                    v-if="item.icon"
                                    :is="item.icon"
                                    filled
                                    :font-controlled="false"
                                    class="w-[14px] h-[14px] mr-2 lg:w-4 lg:h-4"
                                />
                                <span
                                    class="text-sm leading-none font-medium tracking-[-0.41px] uppercase lg:text-base lg:leading-none"
                                >
                                    {{ item.label }}
                                </span>
                            </a>
                        </li>
                    </ul>
                </div>
                <a
                    href="https://thebcms.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center max-md:mb-4 lg:order-1"
                >
                    <span
                        class="text-sm leading-none tracking-[-0.41px] text-appGray-500 mr-2 lg:text-base lg:leading-none lg:mr-3"
                    >
                        Powered by
                    </span>
                    <img
                        src="/logo-dark.png"
                        alt="BCMS Logo"
                        class="w-[55px] lg:w-[83px]"
                    />
                </a>
                <div
                    class="text-sm leading-none tracking-[-0.41px] sm:text-right lg:order-3 lg:text-base lg:leading-none"
                >
                    &copy; {{ new Date().getFullYear() }} Personal website. All
                    rights reserved
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
const nav = [
    {
        label: '(+1) 734 8123 8162',
        href: 'tel:+173481238162',
    },
    {
        label: 'qwerty@mail.com',
        href: 'mailto:qwerty@mail.com',
    },
    {
        label: 'Legal page',
        href: '/legal',
    },
];

const socials = [
    {
        label: 'Dribble',
        icon: 'SvgoDribble',
        href: 'https://dribbble.com/',
    },
    {
        label: 'LinkedIn',
        icon: 'SvgoLinkedin',
        href: 'https://www.linkedin.com/',
    },
    {
        label: 'Twitter',
        icon: 'SvgoTwitterX',
        href: 'https://www.xcom/',
    },
    {
        label: 'Contact me',
        href: '/contact',
    },
];
</script>
