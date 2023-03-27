<template>
  <section class="py-12 md:py-20 lg:py-[120px]">
    <div class="container">
      <h2
        class="text-2xl leading-[1.2] font-medium text-center font-PlayfairDisplay tracking-[-0.41px] max-w-[258px] mx-auto mb-4 md:text-3xl md:max-w-[300px] lg:text-5xl lg:leading-[1.2] lg:max-w-[525px] lg:mb-5"
      >
        {{ data.title }}
      </h2>
      <ContentManager
        :item="data.description"
        class="text-sm leading-[1.4] font-medium tracking-[-0.41px] text-appGray-600 text-center max-w-[280px] mx-auto mb-8 lg:text-base lg:leading-normal lg:max-w-[402px] lg:mb-16"
      />
      <div
        class="grid grid-cols-2 gap-x-[14px] mb-8 lg:grid-cols-3 lg:gap-8 lg:mb-10"
      >
        <Search
          :value="searchValue"
          :options="jobs.map((e) => ({ title: e.title }))"
          class="col-span-2 lg:col-span-1"
          @input="searchValue = $event"
        />
        <Dropdown
          v-model="jobTypeValue"
          :options="jobs.map((e) => e.type)"
          placeholder="Job type..."
          :icon="JobTypeIcon"
        />
        <Search
          :value="locationValue"
          :options="jobs.map((e) => ({ title: e.location }))"
          :icon="LocationIcon"
          placeholder="Location"
          @input="locationValue = $event"
        />
      </div>
      <div
        class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        <JobsCard v-for="(card, index) in jobs" :key="index" :card="card" />
        <div
          class="flex flex-col justify-center items-center md:col-span-2 md:mt-6 lg:col-span-3"
        >
          <Btn
            theme="accent-outline"
            size="sm"
            class="justify-center w-full max-md:mb-4 md:max-w-max"
          >
            <span>Load more jobs</span>
          </Btn>
          <Btn
            theme="dark"
            size="sm"
            class="justify-center w-full md:hidden"
            @click="scrollToTop"
          >
            <span>Back to top</span>
          </Btn>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from "vue";
import { HomeJobsGroup } from "~~/bcms/types/group/home_jobs";
import { JobLight } from "~~/types";
import JobTypeIcon from "@/assets/icons/briefcase.svg";
import LocationIcon from "@/assets/icons/location.svg";

defineProps({
  data: {
    type: Object as PropType<HomeJobsGroup>,
    required: true,
  },
  jobs: {
    type: Array as PropType<JobLight[]>,
    required: true,
  },
});

const searchValue = ref("");
const jobTypeValue = ref("");
const locationValue = ref("");

const scrollToTop = () => {};
</script>
