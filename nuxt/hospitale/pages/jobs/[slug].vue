<template>
  <PageWrapper v-if="data && meta" :header="data.header" :footer="data.footer">
    <div class="relative mt-6 mb-10 lg:mt-0 lg:mb-[72px]">
      <BCMSImage
        :media="meta.cover"
        class="w-full aspect-[2.76] cover lg:aspect-[3.71]"
      />
      <div class="absolute top-0 left-0 w-full h-full bg-black/20" />
    </div>
    <div class="container">
      <div
        class="mb-12 lg:grid lg:grid-cols-[1fr,380px] lg:gap-10 lg:items-start lg:mb-[104px]"
      >
        <div class="bg-appGray-100 rounded-lg lg:rounded-[14px]">
          <div
            class="flex items-center justify-between rounded-t-lg bg-[#C9C8C3] p-4 lg:px-8 lg:py-6 lg:rounded-t-[14px]"
          >
            <div class="flex items-center">
              <BCMSImage
                :media="meta.avatar"
                class="w-8 h-8 rounded-full cover mr-3 lg:w-12 lg:h-12 lg:mr-[14px]"
              />
              <div>
                <div
                  class="text-sm leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] mb-1.5 lg:text-base lg:leading-none lg:mb-2.5"
                >
                  {{ meta.title }}
                </div>
                <div class="flex items-center">
                  <LocationIcon
                    class="w-3 h-3 flex-shrink-0 text-appGray-600 mr-1 lg:w-[14px] lg:h-[14px]"
                  />
                  <span
                    class="text-xs leading-none font-medium tracking-[-0.41px] text-appGray-600 lg:text-sm lg:leading-none"
                    >{{ meta.title }}</span
                  >
                </div>
              </div>
            </div>
            <div
              class="text-xs leading-none font-medium tracking-[-0.41px] text-[#7A7A77] lg:text-sm lg:leading-none"
            >
              Posted 9h ago
            </div>
          </div>
          <div>
            <div class="px-4 py-6 border-b border-[#CFCDC8] lg:p-8">
              <div
                class="flex items-center px-3 py-1.5 rounded-[5px] bg-[#C9C8C3] max-w-max mb-5 lg:py-[9px] lg:mb-6"
              >
                <div
                  class="w-[5px] h-[5px] rounded-full bg-appAccent mr-1.5 lg:w-2 lg:h-2"
                />
                <span
                  class="text-xs leading-none font-medium tracking-[-0.41px] text-appGray-600 lg:text-sm lg:leading-none"
                >
                  Job description
                </span>
              </div>
              <ContentManager
                :item="meta.description_extended"
                class="job--rt text-xs leading-normal font-medium tracking-[-0.41px] text-appGray-500 lg:text-base lg:leading-normal"
              />
            </div>
            <div class="px-4 py-6 border-b border-[#CFCDC8] lg:p-8">
              <div
                class="flex items-center px-3 py-1.5 rounded-[5px] bg-[#C9C8C3] max-w-max mb-5 lg:py-[9px] lg:mb-6"
              >
                <div
                  class="w-[5px] h-[5px] rounded-full bg-appAccent mr-1.5 lg:w-2 lg:h-2"
                />
                <span
                  class="text-xs leading-none font-medium tracking-[-0.41px] text-appGray-600 lg:text-sm lg:leading-none"
                >
                  Responsibilities
                </span>
              </div>
              <ContentManager
                :item="meta.responsibilities"
                class="job--rt text-xs leading-normal font-medium tracking-[-0.41px] text-appGray-500 lg:text-base lg:leading-normal"
              />
            </div>
            <div class="px-4 py-6 lg:p-8">
              <div
                class="flex items-center px-3 py-1.5 rounded-[5px] bg-[#C9C8C3] max-w-max mb-5 lg:py-[9px] lg:mb-6"
              >
                <div
                  class="w-[5px] h-[5px] rounded-full bg-appAccent mr-1.5 lg:w-2 lg:h-2"
                />
                <span
                  class="text-xs leading-none font-medium tracking-[-0.41px] text-appGray-600 lg:text-sm lg:leading-none"
                >
                  Job details
                </span>
              </div>
              <ContentManager
                :item="meta.details"
                class="job--rt text-xs leading-normal font-medium tracking-[-0.41px] text-appGray-500 lg:text-base lg:leading-normal"
              />
            </div>
          </div>
        </div>
        <div class="mt-6 mb-12 lg:hidden">
          <Btn
            size="sm"
            class="justify-center w-full"
            @click="showApplyModal = true"
          >
            <span>Apply for this job</span>
          </Btn>
        </div>
        <div
          v-if="company"
          class="border border-[#B0AEAB] bg-appGray-100 rounded-lg p-4 pb-6 mb-12 lg:p-8 lg:rounded-[14px]"
        >
          <div class="flex items-center mb-4 lg:mb-[18px]">
            <div
              class="flex items-center justify-center w-8 h-8 border border-[#CFCCC7] rounded-full p-1 mr-3 lg:w-12 lg:h-12 lg:p-0 lg:mr-4"
            >
              <BCMSImage :media="company.logo" svg />
            </div>
            <div
              class="text-sm leading-none font-medium tracking-[-0.41px] font-PlayfairDisplay lg:text-base lg:leading-none"
            >
              {{ company.title }}
            </div>
          </div>
          <ContentManager
            :item="company.description"
            class="text-xs leading-normal font-medium tracking-[-0.41px] text-appGray-500 lg:text-sm lg:leading-normal"
          />
          <div class="mt-8 max-lg:hidden">
            <Btn
              size="sm"
              class="justify-center w-full"
              @click="showApplyModal = true"
            >
              <span>Apply for this job</span>
            </Btn>
          </div>
        </div>
      </div>
      <div
        v-if="filteredJobs.length > 0"
        ref="sectionDOM"
        class="pb-14 md:pb-20 lg:pb-[120px]"
      >
        <h2
          class="leading-none font-semibold font-PlayfairDisplay tracking-[-0.41px] mb-6 lg:text-2xl lg:leading-none lg:mb-12"
        >
          Other job you may like
        </h2>
        <div
          class="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3 lg:gap-8"
        >
          <JobsCard
            v-for="(card, index) in filteredJobs"
            :key="index"
            :card="card"
          />
          <div
            class="flex flex-col justify-center items-center mt-2 md:col-span-2 md:mt-6 lg:col-span-3"
          >
            <Btn
              v-if="filteredJobs.length < data.data.jobs.length"
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
      </div>
    </div>
    <Teleport to="body">
      <Transition name="fade">
        <JobsApplyModal
          v-if="showApplyModal"
          :job="data.data.meta"
          @close="showApplyModal = false"
        />
      </Transition>
    </Teleport>
  </PageWrapper>
</template>

<script setup lang="ts">
import { BCMSImage } from "~~/bcms-components";
import { APIResponse, JobPageData } from "~~/types";
import LocationIcon from "@/assets/icons/location.svg";

const { setOgHead } = useHeadTags();
const route = useRoute();

const { data } = useAsyncData(async (ctx) => {
  return await ctx?.$bcms.request<APIResponse<JobPageData>>({
    url: `/jobs/${route.params.slug}/data.json`,
  });
});

const sectionDOM = ref<HTMLElement>();

const paginationPage = ref(1);
const jobsPerPage = ref(9);

const meta = computed(() => {
  return data.value?.data.meta;
});

const company = computed(() => {
  return meta.value?.company.meta.en;
});

const filteredJobs = computed(() => {
  return (
    data.value?.data.jobs.slice(0, paginationPage.value * jobsPerPage.value) ||
    []
  );
});

const loadMore = () => {
  paginationPage.value++;
};

const scrollToTop = () => {
  if (sectionDOM.value) {
    window.scrollTo({
      top: sectionDOM.value.offsetTop,
      behavior: "smooth",
    });
  }
};

const showApplyModal = ref(false);

useHead(() =>
  setOgHead({
    title: data.value?.data.meta.title,
  })
);
</script>

<style lang="scss">
.job--rt {
  ul {
    @apply grid grid-cols-1 gap-[14px] lg:gap-5;
    li {
      @apply relative flex items-start before:w-[14px] before:h-[14px] before:flex-shrink-0 before:mr-2 before:mt-0.5 lg:before:w-5 lg:before:h-5 lg:before:mr-3;
      &::before {
        background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTQiIHZpZXdCb3g9IjAgMCAxNCAxNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iNyIgY3k9IjciIHI9IjciIGZpbGw9IiMyNzdENTMiIGZpbGwtb3BhY2l0eT0iMC4xIi8+CjxtYXNrIGlkPSJtYXNrMF80OTlfMTI1OSIgc3R5bGU9Im1hc2stdHlwZTphbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMyIgeT0iMyIgd2lkdGg9IjgiIGhlaWdodD0iOCI+CjxyZWN0IHg9IjMiIHk9IjMiIHdpZHRoPSI4IiBoZWlnaHQ9IjgiIGZpbGw9IiNEOUQ5RDkiLz4KPC9tYXNrPgo8ZyBtYXNrPSJ1cmwoI21hc2swXzQ5OV8xMjU5KSI+CjxwYXRoIGQ9Ik02LjE4MzQ1IDkuMDAwMDlMNC4yODM0NSA3LjEwMDA5TDQuNzU4NDUgNi42MjUwOUw2LjE4MzQ1IDguMDUwMDlMOS4yNDE3OCA0Ljk5MTc2TDkuNzE2NzggNS40NjY3Nkw2LjE4MzQ1IDkuMDAwMDlaIiBmaWxsPSIjMjc3RDUzIi8+CjwvZz4KPC9zdmc+Cg==);

        @media screen and (min-width: 1024px) {
          background-image: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGNpcmNsZSBjeD0iMTAiIGN5PSIxMCIgcj0iMTAiIGZpbGw9IiMyNzdENTMiIGZpbGwtb3BhY2l0eT0iMC4xIi8+CjxtYXNrIGlkPSJtYXNrMF80NTRfMTA0NCIgc3R5bGU9Im1hc2stdHlwZTphbHBoYSIgbWFza1VuaXRzPSJ1c2VyU3BhY2VPblVzZSIgeD0iMyIgeT0iMyIgd2lkdGg9IjE0IiBoZWlnaHQ9IjE0Ij4KPHJlY3QgeD0iMyIgeT0iMyIgd2lkdGg9IjE0IiBoZWlnaHQ9IjE0IiBmaWxsPSIjRDlEOUQ5Ii8+CjwvbWFzaz4KPGcgbWFzaz0idXJsKCNtYXNrMF80NTRfMTA0NCkiPgo8cGF0aCBkPSJNOC41NzA4NSAxMy40OTk5TDUuMjQ1ODUgMTAuMTc0OUw2LjA3NzEgOS4zNDM2OEw4LjU3MDg1IDExLjgzNzRMMTMuOTIyOSA2LjQ4NTM1TDE0Ljc1NDIgNy4zMTY2TDguNTcwODUgMTMuNDk5OVoiIGZpbGw9IiMyNzdENTMiLz4KPC9nPgo8L3N2Zz4K);
        }
      }
    }
  }
}
</style>
