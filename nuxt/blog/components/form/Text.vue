<template>
    <label class="relative flex flex-col">
        <div
            v-if="label"
            class="text-sm leading-none tracking-[-0.41px] mb-4 md:text-base md:leading-none lg:text-xl lg:leading-none"
        >
            {{ label }}
        </div>
        <input
            v-if="type !== 'textarea'"
            :value="modelValue"
            :type="type"
            :placeholder="placeholder"
            class="border bg-transparent rounded-3xl px-5 py-4 text-xs leading-none tracking-[-0.41px] transition-colors duration-300 placeholder:text-appText focus:outline-none md:text-sm md:leading-none lg:text-base lg:leading-none"
            :class="[error ? 'border-red-500' : 'border-[#CCCCCC]']"
            @input="handleInput"
        />
        <textarea
            v-else
            :value="modelValue"
            :placeholder="placeholder"
            class="border bg-transparent rounded-3xl px-5 py-4 text-xs leading-none tracking-[-0.41px] transition-colors duration-300 placeholder:text-appText resize-none h-[140px] focus:outline-none md:text-sm md:leading-none lg:text-base lg:leading-none lg:h-[228px]"
            :class="[error ? 'border-red-500' : 'border-[#CCCCCC]']"
            @input="handleInput"
        >
        </textarea>
    </label>
</template>

<script setup lang="ts">
defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    label: { type: String, default: '' },
    placeholder: { type: String, default: '' },
    type: {
        type: String as PropType<'text' | 'email' | 'textarea'>,
        required: false,
        default: 'text',
    },
    error: { type: String, default: '' },
});

const emits = defineEmits(['update:modelValue']);

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;

    emits('update:modelValue', target.value);
};
</script>
