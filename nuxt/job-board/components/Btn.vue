<template>
    <component
        :is="tag ? tag : to ? NuxtLink : 'button'"
        :to="to"
        class="group relative flex items-center text-sm leading-none font-medium tracking-[-0.41px] px-5 rounded-[32px] border transition-all duration-300 focus:outline-none hover:px-7 lg:px-7"
        :class="[
            theme === 'accent'
                ? 'bg-appAccent text-white border-transparent'
                : theme === 'pale'
                  ? 'bg-appAccent/10 text-appAccent border-transparent'
                  : theme === 'dark'
                    ? 'bg-appText text-white border-transparent'
                    : 'border border-appAccent text-appAccent',
            size === 'sm' ? 'py-3 lg:py-4' : 'py-4 lg:py-5',
        ]"
        @mouseover="showArrow = true"
        @mouseleave="showArrow = false"
    >
        <slot />
        <span
            class="overflow-hidden transition-all duration-300"
            :class="[showArrow ? 'w-3.5 ml-2' : 'w-0']"
        >
            <SvgoArrow filled :font-controlled="false" class="size-3.5" />
        </span>
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
        type: String as PropType<'accent' | 'pale' | 'dark' | 'accent-outline'>,
        required: false,
        default: 'accent',
    },
    tag: {
        type: String,
        required: false,
        default: '',
    },
    size: {
        type: String as PropType<'sm' | 'regular'>,
        required: false,
        default: 'regular',
    },
});

const NuxtLink = resolveComponent('NuxtLink');

const showArrow = ref(false);
</script>
