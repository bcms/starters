<template>
    <component
        :is="to ? NuxtLink : 'button'"
        :to="to"
        class="flex items-center leading-none font-medium transition-colors duration-300 border border-transparent focus:outline-none lg:text-xl lg:leading-none"
        :class="[
            theme === 'light'
                ? 'bg-appGray-200 text-appAccent hover:bg-appAccent hover:text-appGray-200 hover:border-appGray-200'
                : theme === 'dark'
                  ? 'bg-appAccent text-appGray-200 hover:bg-appGray-200 hover:text-appAccent hover:border-appAccent'
                  : 'bg-[#F2F2F2] text-appGray-600 hover:border-appAccent disabled:bg-[#F2F5F3] disabled:text-[#BABDBB] disabled:hover:border-transparent',
            size === 'regular'
                ? 'px-4 py-[13px] rounded-lg text-sm lg:px-8 lg:py-[18px]'
                : 'p-2.5 rounded-[5px] text-xs lg:px-6 lg:py-4 lg:rounded-lg',
        ]"
    >
        <slot />
    </component>
</template>

<script setup lang="ts">
defineProps({
    to: {
        type: String,
        required: false,
        default: '',
    },
    theme: {
        type: String as PropType<'light' | 'dark' | 'gray'>,
        required: false,
        default: 'light',
    },
    size: {
        type: String as PropType<'sm' | 'regular'>,
        default: 'regular',
    },
});

const NuxtLink = resolveComponent('NuxtLink');
</script>
