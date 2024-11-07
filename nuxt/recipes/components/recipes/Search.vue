<template>
    <div>
        <label
            class="flex items-center w-full bg-white rounded-lg px-4 border transition-colors duration-300 focus-within:border-appAccent"
            :class="[
                static ? 'border-[#DEDEDE]' : 'border-transparent',
                size === 'lg' ? 'lg:px-6' : '',
            ]"
            :style="{
                filter: !static
                    ? 'drop-shadow(0px 0px 8px rgba(10, 34, 19, 0.25))'
                    : '',
            }"
        >
            <SvgoSearch
                filled
                :font-controlled="false"
                class="w-5 h-5"
                :class="[size === 'lg' ? 'lg:w-6 lg:h-6' : '']"
            />
            <div class="relative">
                <input
                    :value="(value || searchValue).toLowerCase()"
                    placeholder="Search recipes"
                    class="px-1.5 py-3 bg-transparent text-sm leading-none font-medium tracking-[-0.41px] w-full placeholder:text-appGray-400 focus:outline-none"
                    :class="[
                        size === 'lg'
                            ? 'lg:px-2.5 lg:py-[18px] lg:text-base lg:leading-none'
                            : '',
                    ]"
                    @input="handleInput"
                    @keypress.enter="handleEnter"
                    @keydown.tab.prevent="handleTabPress"
                />
                <span
                    v-if="
                        filteredRecipes.length > 0 && showResults && searchValue
                    "
                    class="absolute top-1/2 left-[7px] translate-y-[calc(-50%-1px)] text-sm leading-none font-medium tracking-[-0.41px] pointer-events-none"
                >
                    <span class="opacity-0">
                        {{
                            placeholderSuggestion?.slice(0, searchValue.length)
                        }}
                    </span>
                    <span class="text-appGray-400">
                        {{ placeholderSuggestion?.slice(searchValue.length) }}
                    </span>
                </span>
            </div>
        </label>
        <Transition name="fade">
            <div
                v-if="searchValue && showResults"
                class="absolute -bottom-1 left-0 w-full translate-y-full grid grid-cols-1 gap-px bg-[#EBEBEB] border border-[#EBEBEB] rounded-lg overflow-hidden max-h-[200px] overflow-y-auto"
            >
                <template v-if="filteredRecipes.length > 0">
                    <NuxtLink
                        v-for="(recipe, index) in filteredRecipes"
                        :key="index"
                        v-click-outside="() => (searchValue = '')"
                        :to="`/recipes/${recipe.slug}`"
                        class="flex bg-white px-4 py-3 text-sm leading-none font-medium tracking-[-0.41px] text-appGray-500 transition-colors duration-300 hover:text-appAccent"
                    >
                        {{ recipe.title }}
                    </NuxtLink>
                </template>
                <div
                    v-else
                    class="flex bg-white px-4 py-3 text-sm leading-none font-medium tracking-[-0.41px] text-appGray-500"
                >
                    There are no recipes for that search term
                </div>
            </div>
        </Transition>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    value: {
        type: String,
        required: false,
        default: '',
    },
    recipes: {
        type: Array as PropType<RecipeLight[]>,
        required: false,
        default: () => [],
    },
    static: {
        type: Boolean,
        required: false,
    },
    size: {
        type: String as PropType<'regular' | 'lg'>,
        required: false,
        default: 'regular',
    },
    showResults: {
        type: Boolean,
        required: false,
        default: true,
    },
});

const emits = defineEmits(['input', 'enter']);

const searchValue = ref('');

const filteredRecipes = computed(() => {
    return (
        props.recipes?.filter((e) => {
            return `${e.title} ${e.description}`
                .toLowerCase()
                .includes(searchValue.value.toLowerCase());
        }) || []
    );
});

const placeholderSuggestion = computed(() => {
    const suggestions: string[] = [];

    for (let i = 0; i < filteredRecipes.value.length; i++) {
        const recipe = filteredRecipes.value[i];

        const words = recipe.title.split(' ');

        if (
            words.some((e) =>
                e.toLowerCase().startsWith(searchValue.value.toLowerCase()),
            )
        ) {
            suggestions.push(recipe.title.toLowerCase());
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

const handleEnter = (event: Event) => {
    const target = event.target as HTMLInputElement;

    emits('enter', target.value);
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
