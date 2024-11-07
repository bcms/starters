<template>
    <Pagination
        :value="atPage"
        :page-count="pageCount"
        :page-range="pageRange"
        :no-li-surround="true"
        prev-link-class="hidden"
        next-link-class="hidden"
        page-link-class="pagination--item"
        active-class="pagination--item-active"
        @update:model-value="($event: any) => $emit('page-change', $event)"
    >
        <template #break-view-content>
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                class="w-4 h-3 mt-auto lg:w-4 lg:h-4"
            >
                <path
                    fill="#0A2213"
                    d="M2.327 3.135c-.389 0-.722-.137-1.002-.412a1.375 1.375 0 0 1-.419-1.009c0-.388.14-.72.42-.994.279-.28.612-.419 1-.419.389 0 .723.14 1.002.42.28.274.42.605.42.993 0 .26-.067.5-.2.718a1.469 1.469 0 0 1-.511.511c-.213.128-.45.192-.71.192Zm5.664 0c-.388 0-.722-.137-1.002-.412a1.375 1.375 0 0 1-.419-1.009c0-.388.14-.72.42-.994.279-.28.613-.419 1-.419.389 0 .723.14 1.002.42.28.274.42.605.42.993 0 .26-.067.5-.2.718a1.469 1.469 0 0 1-.511.511c-.213.128-.45.192-.71.192Zm5.664 0c-.388 0-.722-.137-1.002-.412a1.375 1.375 0 0 1-.419-1.009c0-.388.14-.72.42-.994.279-.28.613-.419 1-.419.39 0 .723.14 1.002.42.28.274.42.605.42.993 0 .26-.067.5-.2.718a1.469 1.469 0 0 1-.51.511c-.214.128-.45.192-.711.192Z"
                />
            </svg>
        </template>
    </Pagination>
</template>

<script setup lang="ts">
import Pagination from 'vuejs-paginate-next';

defineProps({
    atPage: {
        type: Number,
        required: true,
    },
    pageCount: {
        type: Number,
        required: true,
    },
    pageRange: {
        type: Number,
        required: false,
        default: 4,
    },
});

defineEmits(['page-change']);
</script>

<style lang="scss">
.pagination--item {
    @apply flex items-center justify-center w-8 h-8 border border-[#F0F0F0] rounded-lg text-xs leading-none font-medium text-appAccent lg:w-12 lg:h-12 lg:text-xl lg:leading-none;
    &:not(.disabled) {
        @apply cursor-pointer;
    }
    &-active {
        @apply bg-appAccent text-white border-appAccent;
    }
}
</style>
