<template>
    <label
        class="relative flex items-center cursor-pointer"
        :class="[size === 'sm' ? 'gap-2' : 'gap-3']"
    >
        <input
            :value="modelValue"
            type="checkbox"
            class="sr-only"
            @change="$emit('update:modelValue', !modelValue)"
        />
        <div
            class="flex items-center justify-center rounded-sm bg-white border border-appGray-400 flex-shrink-0"
            :class="[size === 'sm' ? 'w-[18px] h-[18px]' : 'w-6 h-6']"
        >
            <div
                class="bg-appText rounded-[1px] transition-opacity duration-300"
                :class="[
                    modelValue ? '' : 'opacity-0',
                    size === 'sm' ? 'w-3 h-3' : 'w-4 h-4',
                ]"
            />
        </div>
        <div
            class="leading-none tracking-[-0.32px] select-none mb-1"
            :class="[size === 'sm' ? '' : 'text-lg md:text-[24px]']"
        >
            {{ label }}
        </div>
    </label>
</template>

<script setup lang="ts">
defineProps({
    modelValue: {
        type: Boolean,
        required: true,
    },
    label: { type: String, required: true },
    size: {
        type: String as PropType<'default' | 'sm'>,
        required: false,
        default: 'default',
    },
});

defineEmits(['update:modelValue']);
</script>
