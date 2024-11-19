<template>
    <label
        class="relative flex items-center border-b border-appGray-400 w-full overflow-hidden"
    >
        <component
            :is="icon"
            filled
            :font-controlled="false"
            class="w-[14px] h-[14px] flex-shrink-0"
        />
        <input
            :value="searchValue.toLowerCase()"
            type="text"
            :placeholder="placeholder"
            class="bg-transparent px-1.5 py-[17px] flex-1 w-full text-sm leading-none font-medium tracking-[-0.41px] placeholder:text-appGray-500 focus:outline-none"
            @input="handleInput"
            @keydown.tab.prevent="handleTabPress"
        />
        <span
            v-if="filteredOptions.length > 0 && searchValue"
            class="absolute top-1/2 left-[21px] -translate-y-1/2 truncate text-sm leading-none font-medium tracking-[-0.41px] pointer-events-none"
        >
            <span class="opacity-0">
                {{ placeholderSuggestion?.slice(0, searchValue.length) }}
            </span>
            <span class="text-appGray-400">
                {{ placeholderSuggestion?.slice(searchValue.length) }}
            </span>
        </span>
    </label>
</template>

<script setup lang="ts">
const props = defineProps({
    value: {
        type: String,
        required: false,
        default: '',
    },
    options: {
        type: Array as PropType<
            Array<{
                title: string;
            }>
        >,
        required: true,
    },
    placeholder: {
        type: String,
        required: false,
        default: 'Search',
    },
    icon: {
        type: String,
        required: false,
        default: 'SvgoSearch',
    },
});

const emits = defineEmits(['input']);

const searchValue = ref('');

const filteredOptions = computed(() => {
    return (
        props.options?.filter((e) => {
            return e.title
                .toLowerCase()
                .includes(searchValue.value.toLowerCase());
        }) || []
    );
});

const placeholderSuggestion = computed(() => {
    const suggestions: string[] = [];

    for (let i = 0; i < filteredOptions.value.length; i++) {
        const job = filteredOptions.value[i];

        const words = job.title.split(' ');

        if (
            words.some((e) =>
                e.toLowerCase().startsWith(searchValue.value.toLowerCase()),
            )
        ) {
            suggestions.push(job.title.toLowerCase());
        }
    }

    if (suggestions[0]) {
        return suggestions[0].slice(
            suggestions[0].indexOf(searchValue.value.toLowerCase()),
        );
    }
});

const handleInput = (event: Event) => {
    const target = event.target as HTMLInputElement;

    searchValue.value = target.value;

    emits('input', target.value);
};

const handleTabPress = (event: KeyboardEvent) => {
    const placeholderValue = placeholderSuggestion.value?.slice(
        searchValue.value.length,
    );
    if (
        event.key === 'Tab' &&
        placeholderValue &&
        placeholderValue.length > 0
    ) {
        searchValue.value = `${searchValue.value}${placeholderValue}`;
    }
};
</script>
