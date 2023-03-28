<template>
  <div class="fixed z-[60] top-0 left-0 w-full h-full pt-[100px] px-6">
    <div
      class="relative z-10 bg-[#E3E1DC] border border-[#B0AEAB] p-6 rounded-[14px] max-w-[632px] mx-auto max-h-[80vh] overflow-auto overscroll-contain lg:p-8"
    >
      <form @submit.prevent="handleSubmit" class="grid grid-cols-1 gap-6">
        <fieldset class="grid grid-cols-2 items-end gap-2 lg:gap-3">
          <FormText
            v-model="form.firstName"
            label="Name"
            placeholder="First name..."
          />
          <FormText v-model="form.firstName" placeholder="Last name..." />
        </fieldset>
        <FormText
          v-model="form.address"
          label="Address"
          placeholder="Enter your address..."
        />
        <FormText
          v-model="form.email"
          label="Email"
          type="email"
          placeholder="Enter your email address..."
        />
        <FormText
          v-model="form.birthDate"
          label="Birth date"
          type="date"
          placeholder="DD/MM/YY"
        />
        <FormText
          v-model="form.description"
          label="Describe yourself"
          type="textarea"
          placeholder="Describe yourself..."
        />
        <FormDropzone v-model="form.document" label="Upload your document" />
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
import { PropType } from "vue";
import { JobEntryMeta } from "~~/bcms/types";

defineProps({
  job: {
    type: Object as PropType<JobEntryMeta>,
    required: true,
  },
});

defineEmits(["close"]);

const form = ref({
  firstName: "",
  lastName: "",
  address: "",
  email: "",
  birthDate: "",
  description: "",
  document: undefined as File | undefined,
});

const handleSubmit = () => {
  //
};
</script>
