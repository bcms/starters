<template>
    <label class="flex flex-col">
        <div
            v-if="label"
            class="text-sm leading-none tracking-[-0.41px] pb-3 border-b border-[#D9D9D9] transition-colors duration-300 lg:text-base lg:leading-none lg:pb-4"
            :class="[error ? 'text-red-500' : '']"
        >
            {{ label }}
        </div>
        <div class="flex items-center">
            <SvgoArrow
                v-if="!isReadOnly"
                filled
                :font-controlled="false"
                class="w-[14px] h-[14px] mr-2 lg:w-4 lg:h-4 lg:mr-2.5"
            />
            <input
                :value="modelValue"
                :type="type"
                :placeholder="placeholder"
                :readonly="isReadOnly"
                class="bg-transparent py-3 text-sm leading-none tracking-[-0.41px] w-full placeholder:text-appGray-400 focus:outline-none lg:py-4 lg:text-base lg:leading-none"
                @input="handleInput"
            />
        </div>
    </label>
</template>

<script setup lang="ts">
defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    label: {
        type: String,
        required: false,
        default: () => '',
    },
    placeholder: {
        type: String,
        required: false,
        default: () => '',
    },
    type: {
        type: String as PropType<'text' | 'email'>,
        required: false,
        default: 'text',
    },
    isReadOnly: {
        type: Boolean,
        required: false,
        default: false,
    },
    error: {
        type: String,
        required: false,
        default: () => '',
    },
});

const emits = defineEmits(['update:modelValue']);

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;

    emits('update:modelValue', target.value);
};
</script>
