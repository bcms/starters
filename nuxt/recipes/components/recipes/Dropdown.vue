<template>
    <div class="relative">
        <button
            class="flex items-center justify-between border border-[#DEDEDE] rounded-md px-4 py-[13px] w-full lg:px-6 lg:py-5"
            @click="showOptions = !showOptions"
        >
            <span
                class="text-sm leading-none font-medium tracking-[-0.41px] transition-colors duration-300 lg:text-base lg:leading-none"
                :class="[modelValue ? '' : 'text-appGray-400']"
            >
                {{ modelValue || placeholder }}
            </span>
            <SvgoChevronDown
                filled
                :font-controlled="false"
                class="w-[14px] h-[14px] transition-transform duration-300 lg:w-4 lg:h-4"
                :class="[showOptions ? 'rotate-180' : '']"
            />
        </button>
        <Transition name="fade">
            <div
                v-if="showOptions"
                v-click-outside="() => (showOptions = !showOptions)"
                class="absolute -bottom-1 w-full translate-y-full grid grid-cols-1 gap-px border border-[#EBEBEB] bg-[#EBEBEB] rounded-lg max-h-[194px] overflow-y-auto lg:-bottom-4 lg:w-[470px] lg:flex lg:flex-wrap lg:gap-4 lg:bg-white lg:p-6 xl:w-[636px]"
                :class="[dropdownPosition === 'left' ? 'right-0' : 'left-0']"
            >
                <button
                    v-for="(option, index) in options"
                    :key="index"
                    class="group relative px-4 py-3 w-full text-sm leading-none font-medium tracking-[-0.41px] text-appGray-400 text-left transition-colors duration-300 hover:bg-[#EBEBEB] lg:w-max lg:rounded-[40px] lg:px-6 lg:py-4 lg:bg-transparent lg:before:absolute lg:before:left-0 lg:before:top-1/2 lg:before:-translate-y-1/2 lg:before:w-full lg:before:h-full lg:before:bg-[#F7F7F7] lg:before:transition-all lg:before:duration-300 lg:before:rounded-[40px] lg:hover:before:bg-appAccent lg:hover:before:w-[calc(100%+32px)]"
                    :class="[
                        modelValue === option
                            ? 'bg-[#EBEBEB] lg:before:bg-appAccent lg:text-white'
                            : 'bg-white lg:bg-transparent lg:text-appAccent',
                    ]"
                    :style="{
                        zIndex: options.length - index,
                    }"
                    @click="handleOptionSelect(option)"
                >
                    <span
                        class="relative z-10 transition-colors duration-300 group-hover:text-appGray-400 lg:group-hover:text-white"
                    >
                        {{ option }}
                    </span>
                    <SvgoArrowRight
                        filled
                        :font-controlled="false"
                        class="absolute top-1/2 -translate-y-1/2 -right-2.5 -translate-x-2 w-5 h-5 opacity-0 transition-all duration-300 text-white group-hover:opacity-100 group-hover:translate-x-1 max-lg:hidden"
                    />
                </button>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    modelValue: {
        type: String,
        required: true,
    },
    options: {
        type: Array as PropType<string[]>,
        required: true,
    },
    placeholder: {
        type: String,
        required: true,
    },
    dropdownPosition: {
        type: String as PropType<'left' | 'right'>,
        required: false,
        default: 'right',
    },
});

const emits = defineEmits(['update:modelValue']);

const showOptions = ref(false);

const handleOptionSelect = (option: string) => {
    if (props.modelValue === option) {
        emits('update:modelValue', '');
    } else {
        emits('update:modelValue', option);
    }
    showOptions.value = false;
};
</script>
