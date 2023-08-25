<template>
  <PageWrapper v-if="data && meta" :header="data.header" :footer="data.footer">
    <div class="pt-8 pb-14 md:py-20 lg:py-[120px]">
      <div class="container">
        <div class="max-w-[632px] mx-auto">
          <h1
            class="text-2xl leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] text-center mb-4 md:text-3xl md:leading-none lg:text-[80px] lg:leading-none lg:mb-5"
          >
            {{ meta.title }}
          </h1>
          <ContentManager
            :item="meta.description"
            class="text-sm leading-[1.4] font-medium tracking-[-0.41px] text-center text-appGray-600 max-w-[446px] mx-auto mb-12 lg:text-base lg:leading-normal lg:mb-[88px]"
          />
          <div
            class="grid grid-cols-1 gap-6 bg-[#E3E1DC] border border-[#B0AEAB] rounded-[14px] p-6 lg:p-8"
          >
            <FormText
              v-model="form.name.value"
              :error="form.name.error"
              label="Full name"
              placeholder="Enter your full name"
            />
            <FormText
              v-model="form.email.value"
              :error="form.email.error"
              type="email"
              label="Email"
              placeholder="Enter your email"
            />
            <FormText
              v-model="form.phone.value"
              :error="form.phone.error"
              label="Phone number"
              placeholder="Enter your phone number"
            />
            <FormText
              v-model="form.message.value"
              :error="form.message.error"
              type="textarea"
              label="How can we help you?"
              placeholder="Give us details on how we can help you..."
            />
            <Btn class="justify-center w-full lg:mt-4" @click="handleSubmit">
              <span> Submit </span>
            </Btn>
          </div>
        </div>
      </div>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import { NuxtApp } from 'nuxt/app';
import { ContactPageData, PageProps } from '@/types';
import { ContactPageEntry, ContactPageEntryMeta } from '@/bcms/types';

const { data, error } = useAsyncData<PageProps<ContactPageData>>(
  async (ctx) => {
    const { header, footer } = await getHeaderAndFooter(ctx as NuxtApp);
    const contactPage = (await ctx?.$bcms.entry.get({
      template: 'contact_page',
      entry: 'contact',
    })) as ContactPageEntry;
    if (!contactPage) {
      throw new Error('Contact page entry does not exist.');
    }
    return {
      header,
      footer,
      page: {
        meta: contactPage.meta.en as ContactPageEntryMeta,
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

const meta = computed(() => data.value?.page.meta);

const form = ref({
  name: {
    value: '',
    error: '',
  },
  email: {
    value: '',
    error: '',
  },
  phone: {
    value: '',
    error: '',
  },
  message: {
    value: '',
    error: '',
  },
});

const handleSubmit = () => {
  const errors = checkForInputErrors([
    form.value.name,
    form.value.email,
    form.value.phone,
    form.value.message,
  ]);

  if (!errors) {
    // TODO: Submit
  }
};

useHead(() =>
  setOgHead({
    title: data.value?.page.meta.title,
  }),
);
</script>
