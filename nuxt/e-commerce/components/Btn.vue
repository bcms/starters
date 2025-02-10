<template>
    <component
        :is="tag ? tag : to ? NuxtLink : 'button'"
        :to="to"
        class="relative flex items-center px-6 py-[16px] rounded-[40px] focus:outline-none"
        :class="[
            theme === 'dark-green'
                ? 'bg-appAccent-darkGreen text-white'
                : theme === 'light-green'
                  ? 'bg-appAccent-lightGreen'
                  : 'bg-appAccent-orange',
        ]"
    >
        <span
            class="text-[20px] leading-none uppercase -translate-y-1 md:text-[32px]"
        >
            {{ label }}
        </span>
        <SvgoArrow
            class="w-6 h-6 ml-2 fill-current md:w-8 md:h-8"
            filled
            :font-controlled="false"
        />
    </component>
</template>

<script setup lang="ts">
import type { BtnTheme } from '~/types';

defineProps({
    to: {
        type: String,
        required: false,
        default: '',
    },
    theme: {
        type: String as PropType<BtnTheme>,
        required: true,
    },
    label: {
        type: String,
        required: true,
    },
    tag: {
        type: String,
        required: false,
        default: '',
    },
});

const NuxtLink = resolveComponent('NuxtLink');
</script>
