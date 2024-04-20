<template>
  <div class="fixed z-[60] top-0 left-0 w-full h-full pt-[100px] px-6">
    <div
      class="relative z-10 bg-[#E3E1DC] border border-[#B0AEAB] p-6 rounded-[14px] max-w-[632px] mx-auto max-h-[80vh] overflow-auto overscroll-contain lg:p-8"
    >
      <form class="grid grid-cols-1 gap-6" @submit.prevent="handleSubmit">
        <fieldset class="grid grid-cols-2 items-end gap-2 lg:gap-3">
          <FormText
            v-model="form.firstName.value"
            :error="form.firstName.error"
            label="Name"
            placeholder="First name..."
          />
          <FormText
            v-model="form.lastName.value"
            :error="form.lastName.error"
            placeholder="Last name..."
          />
        </fieldset>
        <FormText
          v-model="form.address.value"
          :error="form.address.error"
          label="Address"
          placeholder="Enter your address..."
        />
        <FormText
          v-model="form.email.value"
          :error="form.email.error"
          label="Email"
          type="email"
          placeholder="Enter your email address..."
        />
        <FormText
          v-model="form.birthDate.value"
          :error="form.birthDate.error"
          label="Birth date"
          type="date"
          placeholder="DD/MM/YY"
        />
        <FormText
          v-model="form.description.value"
          :error="form.description.error"
          label="Describe yourself"
          type="textarea"
          placeholder="Describe yourself..."
        />
        <FormDropzone
          v-model="form.document.value"
          :error="form.document.error"
          label="Upload your document"
        />
        <Btn size="sm" class="justify-center w-full lg:mt-4">
          <span>Submit</span>
        </Btn>
      </form>
    </div>
    <div
      class="absolute top-0 left-0 w-full h-full bg-black/50 cursor-pointer"
      @click="$emit('close')"
    />
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { JobEntryMeta } from '@/bcms/types';

defineProps({
  job: {
    type: Object as PropType<JobEntryMeta>,
    required: true,
  },
});

defineEmits(['close']);

const { checkForInputErrors } = useError();

const form = ref({
  firstName: {
    value: '',
    error: '',
  },
  lastName: {
    value: '',
    error: '',
  },
  address: {
    value: '',
    error: '',
  },
  email: {
    value: '',
    error: '',
  },
  birthDate: {
    value: '',
    error: '',
  },
  description: {
    value: '',
    error: '',
  },
  document: {
    value: undefined as File | undefined,
    error: '',
  },
});

const handleSubmit = () => {
  const errors = checkForInputErrors([
    form.value.firstName,
    form.value.lastName,
    form.value.address,
    form.value.email,
    form.value.birthDate,
    form.value.description,
    form.value.document,
  ]);

  if (!errors) {
    // TODO: Submit
  }
};
</script>
