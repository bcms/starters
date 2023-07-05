<template>
  <section class="pb-10 lg:pb-14">
    <div class="relative container">
      <div
        class="relative z-10 md:flex md:items-start md:justify-between md:gap-16 lg:gap-20"
      >
        <div class="flex items-center mb-[14px] md:mt-4">
          <div
            class="w-1.5 h-1.5 bg-appText rounded-full mr-2 lg:w-2.5 lg:h-2.5 lg:mr-4 lg:mt-1"
          />
          <h2
            class="text-lg leading-none tracking-[-0.41px] font-Helvetica lg:text-[32px] lg:leading-none"
          >
            {{ data.title }}
          </h2>
        </div>
        <div>
          <ContentManager
            :item="data.description"
            class="homeAbout--description text-sm leading-[1.4] tracking-[-0.41px] text-appGray-400 pb-6 border-b border-appGray-100 mb-6 md:max-w-[761px] lg:text-base lg:leading-[1.4] lg:pb-8 lg:mb-8"
          />
          <div class="pb-6 border-b border-appGray-100 mb-6 lg:pb-8 lg:mb-8">
            <div
              class="leading-none font-medium tracking-[-0.41px] mb-5 lg:text-xl lg:leading-none"
            >
              {{ data.education.title }}
            </div>
            <div class="flex flex-wrap gap-3">
              <div
                v-for="(degree, index) in visibleDegrees"
                :key="index"
                class="flex text-sm leading-none tracking-[-0.41px] text-appGray-500 px-4 py-3 border border-appGray-200 rounded-[32px] lg:text-base lg:leading-none"
              >
                {{ degree }}
              </div>
              <button
                v-if="visibleDegrees.length < data.education.degrees.length"
                @click="workHistoryItemsToShow = 999"
                class="flex px-4 py-3 text-sm leading-none tracking-[-0.41px] text-white bg-appGray-600 font-medium rounded-[32px] lg:text-base lg:leading-none"
              >
                See all
              </button>
            </div>
          </div>
          <div class="pb-6 border-b border-appGray-100 lg:pb-8 lg:mb-8">
            <div
              class="leading-none font-medium tracking-[-0.41px] mb-5 lg:text-xl lg:leading-none"
            >
              {{ data.workHistory.title }}
            </div>
            <div class="flex flex-wrap gap-3">
              <div
                v-for="(item, index) in visibleWorkHistoryItems"
                :key="index"
                class="flex items-center text-sm leading-none tracking-[-0.41px] text-appGray-500 px-4 py-3 border border-appGray-200 rounded-[32px] lg:text-base lg:leading-none"
              >
                <span>{{ item.company_name }}</span>
                <span
                  class="w-[3px] h-[3px] rounded-full bg-appGray-500 mx-1.5 lg:mx-2"
                />
                <span>{{ new Date(item.from).getFullYear() }}</span>
              </div>
              <button
                v-if="
                  visibleWorkHistoryItems.length < data.workHistory.items.length
                "
                @click="workHistoryItemsToShow = 999"
                class="flex px-4 py-3 text-sm leading-none tracking-[-0.41px] text-white bg-appGray-600 font-medium rounded-[32px] lg:text-base lg:leading-none"
              >
                See all
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        class="absolute top-[40%] -translate-y-1/2 left-0 w-[296px] h-[296px] rounded-full opacity-20 blur-[120px] bg-blend-overlay bg-[#FFBF4B] pointer-events-none max-md:hidden"
      />
      <div
        class="absolute top-[80%] -translate-y-1/2 -left-[15%] w-[296px] h-[296px] rounded-full opacity-20 blur-[120px] bg-blend-overlay bg-[#3A437E] pointer-events-none max-md:hidden"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { HomeAbout } from "~~/types";

const props = defineProps({
  data: {
    type: Object as PropType<HomeAbout>,
    required: true,
  },
});

const degreesToShow = ref(3);
const workHistoryItemsToShow = ref(3);

const visibleDegrees = computed(() => {
  return props.data.education.degrees.slice(0, degreesToShow.value);
});

const visibleWorkHistoryItems = computed(() => {
  return props.data.workHistory.items.slice(0, workHistoryItemsToShow.value);
});
</script>

<style lang="scss">
.homeAbout--description {
  strong {
    @apply font-medium text-appGray-600;
  }
}
</style>
