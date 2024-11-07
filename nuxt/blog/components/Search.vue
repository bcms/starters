<template>
    <form
        class="flex items-center border border-appGray-100 rounded-[48px] px-4 max-w-[848px] mx-auto md:px-6 lg:px-8"
        @submit.prevent
    >
        <SvgoSearch
            filled
            :font-controlled="false"
            class="w-[14px] h-[14px] mr-1.5 md:w-6 md:h-6 md:mr-2.5 lg:w-8 lg:h-6 lg:mr-[14px]"
        />
        <label class="w-full">
            <input
                :value="modelValue"
                type="search"
                placeholder="Search"
                class="placeholder:text-appText bg-transparent py-[11px] text-sm leading-none tracking-[-0.41px] w-full focus:outline-none md:text-lg md:leading-none md:py-4 lg:text-2xl lg:leading-none lg:py-[21px]"
                @keypress.enter="$emit('enter')"
                @input="handleInput"
            />
        </label>
    </form>
</template>

<script setup lang="ts">
defineProps({
    modelValue: {
        type: String,
        required: true,
    },
});

const emits = defineEmits(['enter', 'update:modelValue']);

const handleInput = (e: Event) => {
    const target = e.target;

    if (target instanceof HTMLInputElement) {
        emits('update:modelValue', target.value);
    }
};
</script>
