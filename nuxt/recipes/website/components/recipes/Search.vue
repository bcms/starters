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
      <SearchIcon
        class="w-5 h-5"
        :class="[size === 'lg' ? 'lg:w-6  lg:h-6' : '']"
      />
      <input
        v-model="searchValue"
        placeholder="Search recipes"
        class="px-1.5 py-3 bg-transparent text-sm leading-none font-medium tracking-[-0.41px] w-full placeholder:text-appGray-400 focus:outline-none"
        :class="[
          size === 'lg'
            ? 'lg:px-2.5 lg:py-[18px] lg:text-base lg:leading-none'
            : '',
        ]"
        @input="handleInput"
      />
    </label>
    <Transition name="fade">
      <div
        v-if="searchValue && showResults"
        class="absolute -bottom-1 left-0 w-full translate-y-full grid grid-cols-1 gap-px bg-[#EBEBEB] border border-[#EBEBEB] rounded-lg overflow-hidden max-h-[200px] overflow-y-auto"
      >
        <template v-if="filteredRecipes.length > 0">
          <NuxtLink
            v-for="(recipe, index) in filteredRecipes"
            :to="`/recipes/${recipe.slug}`"
            :key="index"
            class="flex bg-white px-4 py-3 text-sm leading-none font-medium tracking-[-0.41px] text-appGray-500 transition-colors duration-300 hover:text-appAccent"
            v-click-outside="() => (searchValue = '')"
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
import { PropType } from "vue";
import SearchIcon from "@/assets/icons/search.svg";
import { RecipeLight } from "~~/types";

const props = defineProps({
  recipes: {
    type: Array as PropType<RecipeLight[]>,
    required: false,
  },
  static: {
    type: Boolean,
    required: false,
  },
  size: {
    type: String as PropType<"regular" | "lg">,
    required: false,
    default: "regular",
  },
  showResults: {
    type: Boolean,
    required: false,
    default: true,
  },
});

const emits = defineEmits(["input"]);

const searchValue = ref("");

const filteredRecipes = computed(() => {
  return (
    props.recipes?.filter((e) => {
      return `${e.title} ${e.description}`
        .toLowerCase()
        .includes(searchValue.value.toLowerCase());
    }) || []
  );
});

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;

  emits("input", target.value);
};
</script>
