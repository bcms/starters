<template>
    <button
        v-if="href"
        class="border border-appGray-200 bg-appGray-100 flex leading-none rounded-lg"
        :class="[sizeClass]"
    >
        <slot />
    </button>
    <div
        v-else
        class="border border-appGray-200 bg-appGray-100 flex leading-none rounded-lg"
        :class="[sizeClass]"
    >
        <slot />
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    size: {
        type: String as PropType<'md' | 'lg'>,
        default: 'md',
    },
    href: String,
});

const sizeClass = computed(() => {
    return props.size === 'md'
        ? 'px-2 py-1 max-md:text-sm md:p-2'
        : 'px-3 py-2 text-xl font-medium rounded-lg md:px-5 md:py-4 md:text-2xl';
});
</script>
