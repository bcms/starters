<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <div class="pt-8 pb-14 md:pb-20 lg:pt-20 lg:pb-[120px]">
      <div class="container">
        <div class="max-w-[632px] mx-auto">
          <div
            class="grid grid-cols-1 gap-6 bg-[#E3E1DC] border border-[#B0AEAB] rounded-[14px] p-6 mb-6 lg:mb-10"
          >
            <h1 class="sr-only">Post your job</h1>
            <template v-if="activeStep === 1">
              <FormText
                v-model="stepOne.jobTitle.value"
                :error="stepOne.jobTitle.error"
                label="Job title"
                placeholder="Enter job title..."
              />
              <FormText
                v-model="stepOne.jobDescription.value"
                :error="stepOne.jobDescription.error"
                type="textarea"
                label="Job description"
                placeholder="Enter job description..."
              />
              <FormText
                v-model="stepOne.responsibility.value"
                :error="stepOne.responsibility.error"
                type="textarea"
                label="Responsibility"
                placeholder="Enter job responsibility..."
              />
              <FormText
                v-model="stepOne.jobDetails.value"
                :error="stepOne.jobDetails.error"
                type="textarea"
                label="Job details"
                placeholder="Enter job details..."
              />
            </template>
            <template v-else-if="activeStep === 2">
              <FormText
                v-model="stepTwo.companyName.value"
                :error="stepTwo.companyName.error"
                label="Company name"
                placeholder="Enter your company name..."
              />
              <FormDropzone
                v-model="stepTwo.companyLogo.value"
                :error="stepTwo.companyLogo.error"
                label="Upload your company logo"
              />
              <FormText
                v-model="stepTwo.companyWebsite.value"
                :error="stepTwo.companyWebsite.error"
                label="Company website"
                placeholder="Enter your company website or url..."
              />
              <fieldset
                class="grid grid-cols-2 gap-x-2 items-end gap-y-4 lg:gap-x-3"
              >
                <FormText
                  v-model="stepTwo.contactPerson.fullName.value"
                  :error="stepTwo.contactPerson.fullName.error"
                  label="Contact person"
                  placeholder="Enter full name"
                />
                <FormText
                  v-model="stepTwo.contactPerson.email.value"
                  :error="stepTwo.contactPerson.email.error"
                  type="email"
                  placeholder="Enter your email"
                />
                <FormText
                  v-model="stepTwo.contactPerson.phoneNumber.value"
                  :error="stepTwo.contactPerson.phoneNumber.error"
                  placeholder="Phone number"
                />
                <FormText
                  v-model="stepTwo.contactPerson.address.value"
                  :error="stepTwo.contactPerson.address.error"
                  placeholder="Mailing address"
                />
              </fieldset>
              <FormText
                v-model="stepTwo.companyAddress.value"
                :error="stepTwo.companyAddress.error"
                label="Company address"
                placeholder="Enter your company address or location..."
              />
            </template>
            <template v-else-if="activeStep === 3">
              <FormSelect
                v-model="stepThree.jobType.value"
                :error="stepThree.jobType.error"
                label="Job type"
                placeholder="Job type"
                :options="['Full-time', 'Part-time', 'Freelance']"
              />
              <fieldset class="grid grid-cols-2 gap-2 items-end lg:gap-3">
                <FormText
                  v-model="stepThree.salaryRange.min.value"
                  :error="stepThree.salaryRange.min.error"
                  label="Salary range"
                  placeholder="Min salary"
                />
                <FormText
                  v-model="stepThree.salaryRange.max.value"
                  :error="stepThree.salaryRange.max.error"
                  placeholder="Max salary"
                />
              </fieldset>
              <FormSelect
                v-model="stepThree.experienceLevel.value"
                :error="stepThree.experienceLevel.error"
                label="Experience level"
                placeholder="Level"
                :options="['Entry', 'Mid', 'Senior']"
              />
              <FormSelect
                v-model="stepThree.education.value"
                :error="stepThree.education.error"
                label="Education"
                placeholder="Education"
                :options="['High School', 'Bachelor\'s', 'Master\'s']"
              />
              <FormSelect
                v-model="stepThree.requiredSkill.value"
                :error="stepThree.requiredSkill.error"
                label="Required skill"
                placeholder="Skill"
                :options="[
                  'Programming',
                  'Data Analysis',
                  'Project Management',
                ]"
              />
              <fieldset class="grid grid-cols-2 gap-2 items-end lg:gap-3">
                <FormText
                  v-model="stepThree.workSchedule.days.value"
                  :error="stepThree.workSchedule.days.error"
                  label="Work schedule"
                  placeholder="Days"
                />
                <FormText
                  v-model="stepThree.workSchedule.hours.value"
                  :error="stepThree.workSchedule.hours.error"
                  placeholder="Hours"
                />
              </fieldset>
            </template>
            <template v-else>
              <FormText
                v-model="stepFour.howToApply.value"
                :error="stepFour.howToApply.error"
                type="textarea"
                label="How to apply"
                placeholder="Explain how to apply for this job..."
              />
              <FormText
                v-model="stepFour.whatToSubmit.value"
                :error="stepFour.whatToSubmit.error"
                label="What to submit"
                placeholder="What to submit"
              />
              <FormText
                v-model="stepFour.howToSubmit.value"
                :error="stepFour.howToSubmit.error"
                type="textarea"
                label="How to submit"
                placeholder="Explain how to submit the attachment..."
              />
              <FormText
                v-model="stepFour.deadline.value"
                :error="stepFour.deadline.error"
                type="date"
                label="Deadline"
                placeholder="DD/MM/YY"
              />
              <FormText
                v-model="stepFour.companyBenefit.value"
                :error="stepFour.companyBenefit.error"
                label="Company benefit"
                placeholder="Enter company benefit..."
              />
            </template>
            <Btn class="justify-center w-full lg:mt-4" @click="handleNextStep">
              <span>
                {{ activeStep === 4 ? 'Post your job' : 'Next' }}
              </span>
            </Btn>
          </div>
          <div class="flex items-center gap-2.5 lg:gap-[22px]">
            <div
              v-for="index in 4"
              :key="index"
              class="flex flex-1 w-full h-1 rounded-[3px] transition-colors duration-300"
              :class="[index <= activeStep ? 'bg-appAccent' : 'bg-[#BDBBB7]']"
            />
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { PostJobPageEntry, PostJobPageEntryMeta } from '@/bcms/types';
import { JobPostPageData, PageProps } from '@/types';

const { data, error } = useAsyncData<PageProps<JobPostPageData>>(
  async (ctx) => {
    const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
    const postJobPage = (await ctx?.$bcms.entry.get({
      template: 'post_job_page',
      entry: 'post-your-job',
    })) as PostJobPageEntry;
    if (!postJobPage) {
      throw new Error('Job post page entry does not exist.');
    }
    return {
      footer,
      header,
      page: {
        meta: postJobPage.meta.en as PostJobPageEntryMeta,
      },
    };
  },
);
if (error.value) {
  throw createError({
    statusCode: 500,
    statusMessage: error.value.message,
    stack: error.value.stack,
    fatal: true,
  });
}

const { setOgHead } = useHeadTags();
const { checkForInputErrors } = useError();

const activeStep = ref(1);

const stepOne = ref({
  jobTitle: {
    value: '',
    error: '',
  },
  jobDescription: {
    value: '',
    error: '',
  },
  responsibility: {
    value: '',
    error: '',
  },
  jobDetails: {
    value: '',
    error: '',
  },
});

const stepTwo = ref({
  companyName: {
    value: '',
    error: '',
  },
  companyLogo: {
    value: undefined,
    error: '',
  },
  companyWebsite: {
    value: '',
    error: '',
  },
  contactPerson: {
    fullName: {
      value: '',
      error: '',
    },
    email: {
      value: '',
      error: '',
    },
    phoneNumber: {
      value: '',
      error: '',
    },
    address: {
      value: '',
      error: '',
    },
  },
  companyAddress: {
    value: '',
    error: '',
  },
});

const stepThree = ref({
  jobType: {
    value: '',
    error: '',
  },
  salaryRange: {
    min: {
      value: '',
      error: '',
    },
    max: {
      value: '',
      error: '',
    },
  },
  experienceLevel: {
    value: '',
    error: '',
  },
  education: {
    value: '',
    error: '',
  },
  requiredSkill: {
    value: '',
    error: '',
  },
  workSchedule: {
    days: {
      value: '',
      error: '',
    },
    hours: {
      value: '',
      error: '',
    },
  },
});

const stepFour = ref({
  howToApply: {
    value: '',
    error: '',
  },
  whatToSubmit: {
    value: '',
    error: '',
  },
  howToSubmit: {
    value: '',
    error: '',
  },
  deadline: {
    value: '',
    error: '',
  },
  companyBenefit: {
    value: '',
    error: '',
  },
});

const handleNextStep = () => {
  if (activeStep.value === 1) {
    const errors = checkForInputErrors([
      stepOne.value.jobTitle,
      stepOne.value.jobDescription,
      stepOne.value.responsibility,
      stepOne.value.jobDetails,
    ]);

    if (!errors) {
      activeStep.value++;
    }
  } else if (activeStep.value === 2) {
    const errors = checkForInputErrors([
      stepTwo.value.companyName,
      stepTwo.value.companyLogo,
      stepTwo.value.companyWebsite,
      stepTwo.value.contactPerson.fullName,
      stepTwo.value.contactPerson.email,
      stepTwo.value.contactPerson.phoneNumber,
      stepTwo.value.contactPerson.address,
      stepTwo.value.companyAddress,
    ]);

    if (!errors) {
      activeStep.value++;
    }
  } else if (activeStep.value === 3) {
    const errors = checkForInputErrors([
      stepThree.value.jobType,
      stepThree.value.salaryRange.min,
      stepThree.value.salaryRange.max,
      stepThree.value.experienceLevel,
      stepThree.value.education,
      stepThree.value.requiredSkill,
      stepThree.value.workSchedule.days,
      stepThree.value.workSchedule.hours,
    ]);

    if (!errors) {
      activeStep.value++;
    }
  } else {
    const errors = checkForInputErrors([
      stepFour.value.howToApply,
      stepFour.value.whatToSubmit,
      stepFour.value.howToSubmit,
      stepFour.value.deadline,
      stepFour.value.companyBenefit,
    ]);

    if (!errors) {
      // TODO: Submit
    }
  }
};

useHead(() =>
  setOgHead({
    title: data.value?.page.meta.seo?.title || data.value?.page.meta.title,
    description: data.value?.page.meta.seo?.description,
  }),
);
</script>
