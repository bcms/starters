<template>
    <header class="relative z-50 bg-appAccent">
        <nav>
            <div class="container">
                <div
                    class="relative flex items-center justify-between py-[13px] max-md:justify-center md:py-4"
                >
                    <div class="flex items-center">
                        <NuxtLink
                            to="/"
                            class="flex max-md:absolute max-md:left-0 max-md:-bottom-[50px] md:mr-8"
                            aria-label="Home page"
                        >
                            <BcmsImage
                                :media="data.logo"
                                :class="`w-full md:grayscale md:brightness-0 md:invert ${[
                                    $route.name === 'index'
                                        ? 'grayscale brightness-0 invert'
                                        : '',
                                ]}`"
                            />
                        </NuxtLink>
                        <NuxtLink
                            :to="data.nav[0].link"
                            class="text-sm leading-none tracking-[-0.41px] text-appAccent-100 underline transition-colors duration-300 hover:text-white focus-visible:text-white"
                        >
                            {{ data.nav[0].text }}
                        </NuxtLink>
                    </div>
                    <button
                        class="flex items-center justify-center w-8 h-8 bg-white/70 rounded-full max-md:absolute max-md:right-0 max-md:-bottom-[54px] md:hidden"
                        aria-label="Toggle mobile nav"
                        @click="showMobileNav = !showMobileNav"
                    >
                        <SvgoNavX
                            v-if="showMobileNav"
                            filled
                            :font-controlled="false"
                            class="flex w-[18px] h-[18px] text-appAccent"
                        />
                        <SvgoNavMenu
                            filled
                            :font-controlled="false"
                            v-else
                            class="flex w-[18px] h-[18px]"
                        />
                    </button>
                    <div
                        ref="navItemsDOM"
                        class="flex flex-col items-center gap-6 md:flex-row"
                        :class="[
                            showMobileNav
                                ? 'max-md:absolute max-md:-bottom-16 max-md:right-0 max-md:translate-y-full max-md:bg-white max-md:px-2 max-md:py-4 max-md:rounded max-md:shadow-lg'
                                : 'max-md:hidden',
                        ]"
                    >
                        <NuxtLink
                            v-for="(navItem, index) in data.nav.slice(1)"
                            :key="index"
                            :to="navItem.link"
                            class="text-sm leading-none tracking-[-0.41px] text-appAccent/70 font-medium transition-colors duration-300 hover:text-appAccent focus-visible:text-appAccent md:text-appAccent-100 md:hover:text-white md:focus-visible:text-white"
                        >
                            {{ navItem.text }}
                        </NuxtLink>
                    </div>
                </div>
            </div>
        </nav>
    </header>
</template>

<script setup lang="ts">
import type { HeaderEntryMetaItem } from '~/bcms/type/ts';

defineProps({
    data: {
        type: Object as PropType<HeaderEntryMetaItem>,
        required: true,
    },
});

const navItemsDOM = ref<HTMLElement>();
const showMobileNav = ref(false);

const handleMobileNavClickOutside = (event: MouseEvent) => {
    const navItemsEl = navItemsDOM.value as HTMLElement;

    if (!navItemsEl.contains(event.target as Node)) {
        showMobileNav.value = false;
    }
};

watch(showMobileNav, (isOpen) => {
    const navItemsEl = navItemsDOM.value;

    if (navItemsEl) {
        if (isOpen) {
            setTimeout(() => {
                document.addEventListener('click', handleMobileNavClickOutside);
            }, 0);
        } else {
            document.removeEventListener('click', handleMobileNavClickOutside);
        }
    }
});

onMounted(() => {
    showMobileNav.value = false;
});
</script>
