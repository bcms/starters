<template>
  <div
    class="fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center"
  >
    <div
      class="relative z-10 bg-white rounded-2xl border border-[#D4D4D4] p-6 w-[736px] max-w-[95vw] max-h-[90vh] overflow-y-auto overscroll-contain lg:p-10"
    >
      <form
        class="grid grid-cols-1 gap-4 lg:gap-10"
        @submit.prevent="handleSubmit"
      >
        <FormText
          v-model="form.name.value"
          :error="form.name.error"
          label="Name"
          placeholder="Enter your name"
        />
        <FormText
          v-model="form.email.value"
          :error="form.email.error"
          type="email"
          label="Email"
          placeholder="Enter your email"
        />
        <FormText
          v-model="form.message.value"
          :error="form.message.error"
          type="textarea"
          label="Message"
          placeholder="Enter your message"
        />
        <FormSelect
          v-model="form.query.value"
          :error="form.query.error"
          :options="['Option 1', 'Option 2', 'Option 3']"
          label="Type of Query"
          placeholder="Selects the type of query"
        />
        <button
          class="flex justify-center w-full p-[17px] rounded-lg bg-[#7EE984] text-sm leading-none font-medium tracking-[-0.04em] text-appGray-600 lg:p-5 lg:text-2xl lg:leading-none"
          @click="handleSubmit"
        >
          Submit
        </button>
      </form>
    </div>
    <div
      class="absolute top-0 left-0 w-full h-full cursor-pointer bg-[#171717B2]"
      @click="$emit('close')"
    />
  </div>
</template>

<script setup lang="ts">
defineEmits(['close']);

const { checkForInputErrors } = useError();

const form = ref({
  name: {
    value: '',
    error: '',
  },
  email: {
    value: '',
    error: '',
  },
  message: {
    value: '',
    error: '',
  },
  query: {
    value: '',
    error: '',
  },
});

const handleSubmit = () => {
  const errors = checkForInputErrors([
    form.value.name,
    form.value.email,
    form.value.message,
    form.value.query,
  ]);

  if (!errors) {
    // TODO: Submit
  }
};
</script>
