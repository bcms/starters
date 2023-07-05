<template>
  <PageWrapper v-if="data" :header="data.header" :footer="data.footer">
    <section
      class="pt-[108px] pb-10 overflow-hidden md:pb-20 lg:pt-[218px] lg:pb-[120px]"
    >
      <div class="container max-w-[1198px]">
        <ArchWithStar />
        <div
          class="relative px-4 max-w-[400px] mx-auto lg:max-w-[808px] xl:px-0"
        >
          <h1
            class="text-xl leading-none font-Gloock uppercase text-center mb-10 lg:text-5xl lg:leading-none lg:mb-14"
          >
            {{ data.data.meta.title }}
          </h1>
          <form
            @submit.prevent="handleSubmit"
            class="grid grid-cols-2 gap-x-[14px] gap-y-[22px] lg:gap-x-4 lg:gap-y-[30px]"
          >
            <FormText
              v-model="form.name.value"
              :error="form.name.error"
              label="Name"
              placeholder="Enter your full name or nickname..."
              class="col-span-2"
            />
            <FormText
              v-model="form.date.value"
              :error="form.date.error"
              type="date"
              label="Date"
              placeholder="DD/MM/YYYY"
            />
            <FormText
              v-model="form.time.value"
              :error="form.time.error"
              type="time"
              label="Time"
              placeholder="Enter time"
            />
            <FormText
              v-model="form.guestsCount.value"
              :error="form.guestsCount.error"
              label="Number of guests"
              placeholder="Number of guests"
            />
            <FormText
              v-model="form.email.value"
              :error="form.email.error"
              label="Email / Phone"
              placeholder="Email or phone..."
            />
            <FormText
              v-model="form.notes.value"
              :error="form.notes.error"
              type="textarea"
              label="Notes"
              placeholder="If you have special requirements..."
              class="col-span-2"
            />
            <label class="flex items-start col-span-2 cursor-pointer">
              <input
                v-model="form.acceptTerms.value"
                type="checkbox"
                class="sr-only"
              />
              <div
                class="flex justify-center items-center flex-shrink-0 w-4 h-4 rounded-[3px] border mt-0.5 mr-2 transition-colors duration-300 lg:mr-[14px]"
                :class="[
                  form.acceptTerms.value
                    ? 'border-appAccent bg-appAccent'
                    : form.acceptTerms.error
                    ? 'border-red-500'
                    : 'border-[#A8A7A0]',
                ]"
              >
                <svg
                  v-if="form.acceptTerms.value"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="w-3 h-3 text-white"
                >
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
              </div>
              <div
                class="text-xs leading-[1.2] tracking-[-0.41px] text-[#665E5E] lg:text-base lg:leading-[1.2]"
              >
                By submitting this form, you confirm you have read and
                understood how Tastyyy processes your personal data for the
                purpose of making a reservation and in accordance with the terms
                of the
                <NuxtLink to="/" class="underline">Privacy Notice</NuxtLink>.
              </div>
            </label>
            <Btn
              theme="accent"
              size="lg"
              class="justify-center w-full col-span-2"
            >
              <span>Submit your reservation</span>
            </Btn>
          </form>
        </div>
      </div>
    </section>
  </PageWrapper>
</template>

<script setup lang="ts">
import { APIResponse, ReservationPageData } from "~~/types";

const { data } = useAsyncData(async (ctx) => {
  return await ctx?.$bcms.request<APIResponse<ReservationPageData>>({
    url: "/reservation.json",
  });
});

const { checkForInputErrors } = useError();
const { setOgHead } = useHeadTags();

const form = ref({
  name: {
    value: "",
    error: "",
  },
  date: {
    value: "",
    error: "",
  },
  time: {
    value: "",
    error: "",
  },
  guestsCount: {
    value: "",
    error: "",
  },
  email: {
    value: "",
    error: "",
  },
  notes: {
    value: "",
    error: "",
  },
  acceptTerms: {
    value: false,
    error: "",
  },
});

const handleSubmit = () => {
  const errors = checkForInputErrors([
    form.value.name,
    form.value.date,
    form.value.time,
    form.value.guestsCount,
    form.value.email,
    form.value.notes,
    form.value.acceptTerms,
  ]);

  if (!errors) {
    // TODO: Submit
  }
};

useHead(() =>
  setOgHead({
    title: data.value?.data.meta.title,
  })
);
</script>
