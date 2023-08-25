<template>
  <section id="homeJobs" ref="sectionDOM" class="py-12 md:py-20 lg:py-[120px]">
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
        v-if="filteredJobs.length > 0"
        class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
      >
        <JobsCard
          v-for="(card, index) in paginatedJobs"
          :key="index"
          :card="card"
        />
        <div
          class="flex flex-col justify-center items-center md:col-span-2 md:mt-6 lg:col-span-3"
        >
          <Btn
            v-if="paginatedJobs.length < filteredJobs.length"
            theme="accent-outline"
            size="sm"
            class="justify-center w-full max-md:mb-4 md:max-w-max"
            @click="loadMore"
          >
            <span>Load more jobs</span>
          </Btn>
          <Btn
            v-if="filteredJobs.length >= 5"
            theme="dark"
            size="sm"
            class="justify-center w-full md:hidden"
            @click="scrollToTop"
          >
            <span>Back to top</span>
          </Btn>
        </div>
      </div>
      <div
        v-else
        class="flex justify-center text-sm leading-none font-medium tracking-[-0.41px] text-appGray-500"
      >
        There are no jobs for the applied filters
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { HomeJobsGroup } from '@/bcms/types';
import { JobLite } from '@/types';
import JobTypeIcon from '@/assets/icons/briefcase.svg';
import LocationIcon from '@/assets/icons/location.svg';

const props = defineProps({
  data: {
    type: Object as PropType<HomeJobsGroup>,
    required: true,
  },
  jobs: {
    type: Array as PropType<JobLite[]>,
    required: true,
  },
});

const sectionDOM = ref<HTMLElement>();

const paginationPage = ref(1);
const jobsPerPage = ref(9);

const searchValue = ref('');
const jobTypeValue = ref('');
const locationValue = ref('');

const filteredJobs = computed(() => {
  return props.jobs.filter((e) => {
    let show = true;

    if (searchValue.value) {
      show =
        show &&
        `${e.title} ${e.description}`
          .toLowerCase()
          .includes(searchValue.value.toLowerCase());
    }
    if (jobTypeValue.value) {
      show = show && e.type === jobTypeValue.value;
    }

    if (locationValue.value) {
      show =
        show &&
        e.location.toLowerCase().includes(locationValue.value.toLowerCase());
    }

    return show;
  });
});

const paginatedJobs = computed(() => {
  return filteredJobs.value.slice(0, paginationPage.value * jobsPerPage.value);
});

const loadMore = () => {
  paginationPage.value++;
};

const scrollToTop = () => {
  if (sectionDOM.value) {
    window.scrollTo({
      top: sectionDOM.value.offsetTop,
      behavior: 'smooth',
    });
  }
};
</script>
