<template>
    <header class="relative z-50">
        <nav>
            <div class="bg-appText py-[14px] lg:hidden">
                <div class="container">
                    <div class="flex justify-center">
                        <p
                            class="header--jobCta text-appGray-600 text-xs leading-none tracking-[-0.41px]"
                        >
                            Need to hire?
                            <NuxtLink
                                to="/jobs/post"
                                class="font-semibold underline text-white"
                            >
                                {{ ' ' }}
                                Post your job{{ ' ' }}
                            </NuxtLink>
                            now
                        </p>
                    </div>
                </div>
            </div>
            <div class="pt-6 lg:py-4 lg:border-b lg:border-appGray-200">
                <div class="container">
                    <div class="flex items-center justify-between">
                        <NuxtLink
                            to="/"
                            aria-label="Home page"
                            class="flex lg:flex-1"
                        >
                            <SvgoLogo
                                filled
                                :font-controlled="false"
                                class="w-[90px] lg:w-[115px]"
                            />
                        </NuxtLink>
                        <div class="flex justify-center flex-1 max-lg:hidden">
                            <p
                                class="header--jobCta text-appGray-600 text-sm leading-none tracking-[-0.41px]"
                            >
                                Need to hire?
                                <NuxtLink
                                    to="/jobs/post"
                                    class="font-semibold underline text-appText"
                                >
                                    {{ ' ' }}
                                    Post your job{{ ' ' }}
                                </NuxtLink>
                                now
                            </p>
                        </div>
                        <div
                            class="flex items-center gap-2.5 lg:flex-1 lg:justify-end lg:gap-4"
                        >
                            <NuxtLink
                                v-for="(btn, index) in nav"
                                :key="index"
                                :to="btn.href"
                                class="flex items-center rounded-[32px] px-[14px] py-2.5 border transition-all duration-300 lg:px-6 lg:py-[13px]"
                                :class="[
                                    index === 0
                                        ? ' border-appText hover:border-transparent hover:bg-appGray-100'
                                        : 'bg-appText border-transparent text-white',
                                ]"
                            >
                                <span
                                    class="text-xs leading-none font-medium tracking-[-0.41px] mr-1.5 lg:text-sm lg:leading-none lg:mr-2"
                                >
                                    {{ btn.label }}
                                </span>
                                <component
                                    :is="btn.icon"
                                    filled
                                    :font-controlled="false"
                                    class="w-3 h-3 lg:w-[14px] lg:h-[14px]"
                                />
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
const nav = [
    {
        label: 'Contact us',
        href: '/contact',
        icon: 'SvgoPhone',
    },
    {
        label: 'About us',
        href: '/about-us',
        icon: 'SvgoWave',
    },
];
</script>
