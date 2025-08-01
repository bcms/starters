<template>
    <footer class="bg-appGray-100 pt-6 pb-[35px] md:pb-8 lg:pt-14">
        <div class="container">
            <div
                class="grid grid-cols-1 gap-8 mb-12 lg:grid-cols-[auto,1fr] lg:mb-24"
            >
                <div class="lg:max-w-[320px]">
                    <BcmsImage :media="data.logo" class="mb-3 lg:mb-4" />
                    <ContentManager
                        :items="data.description.nodes"
                        class="text-xs tracking-[-0.41px] font-medium leading-normal text-appGray-500 lg:text-base"
                    />
                </div>
                <nav
                    class="flex flex-wrap gap-x-12 gap-y-10 lg:justify-end lg:gap-x-10 xl:gap-x-[72px] xl:pr-[130px]"
                >
                    <div v-for="(col, index) in data.nav" :key="index">
                        <div
                            class="text-xs leading-none font-medium tracking-[-0.41px] text-appGray-500 mb-4 lg:text-base lg:leading-none lg:mb-5 lg:text-[17px]"
                        >
                            {{ col.title }}
                        </div>
                        <div class="grid grid-cols-1 gap-[14px] lg:gap-4">
                            <NuxtLink
                                v-for="(item, itemIndex) in col.items"
                                :key="itemIndex"
                                :href="item.link"
                                class="flex hover:underline focus-visible:underline text-sm leading-none font-medium tracking-[-0.41px] text-appAccent lg:text-[17px] lg:leading-none"
                            >
                                {{ item.text }}
                            </NuxtLink>
                        </div>
                    </div>
                </nav>
            </div>
            <div
                class="text-[#898C8A] leading-none font-medium tracking-[-0.41px] md:flex md:items-center md:justify-between"
            >
                <a
                    href="https://thebcms.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center text-sm max-md:mb-3 lg:text-base lg:leading-none"
                >
                    Powered by
                    <img
                        src="/logo-dark.png"
                        class="w-[55px] ml-2 lg:w-[83px] lg:ml-3"
                    />
                </a>
                <div class="text-xs lg:text-base lg:leading-none">
                    &copy; {{ new Date().getFullYear() }} BCMS. All rights
                    reserved
                </div>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import type { FooterEntryMetaItem } from '~/bcms/type/ts';

defineProps({
    data: {
        type: Object as PropType<FooterEntryMetaItem>,
        required: true,
    },
});
</script>
