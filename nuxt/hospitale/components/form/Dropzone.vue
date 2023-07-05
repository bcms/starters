<template>
  <div class="flex flex-col">
    <div
      v-if="label"
      class="text-sm leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] mb-4 lg:text-base lg:leading-none"
    >
      {{ label }}
    </div>
    <label
      @drop.prevent="handleDrop"
      @dragenter.prevent
      @dragleave.prevent="isDropzoneActive = false"
      @dragover.prevent="isDropzoneActive = true"
      class="flex flex-col items-center justify-center text-center p-5 rounded-[10px] border border-dashed w-full cursor-pointer min-h-[100px] transition-colors duration-300 lg:py-[45px] lg:min-h-[154px]"
      :class="[
        error
          ? 'border-red-500'
          : isDropzoneActive || modelValue
          ? 'border-appAccent text-appAccent'
          : 'text-[#56565F] border-[#C2C0BC] hover:border-[#56565F]',
      ]"
    >
      <input
        type="file"
        class="sr-only"
        accept=".pdf,.txt"
        @change="handleChange"
      />
      <div
        class="flex flex-col text-xs leading-none font-medium tracking-[-0.41px] lg:text-sm lg:leading-none"
      >
        <template v-if="!modelValue">
          <span class="underline">Upload</span>
          <span class="my-2.5">or</span>
          <span> Drag your file here </span>
        </template>
        <span v-else>{{ modelValue.name }}</span>
      </div>
    </label>
  </div>
</template>

<script setup lang="ts">
defineProps({
  modelValue: {
    type: File,
    required: false,
  },
  label: {
    type: String,
    required: false,
  },
  error: {
    type: String,
    required: false,
  },
});

const emits = defineEmits(["update:modelValue"]);

const isDropzoneActive = ref(false);

const handleDrop = (event: DragEvent) => {
  const files = (event.dataTransfer as DataTransfer).files;

  for (let i = 0; i < files.length; i++) {
    const file = files[i];

    if (["docx", "pdf", "txt"].some((type) => file.type.includes(type))) {
      emits("update:modelValue", file);
    }
  }
};

const handleChange = (event: Event) => {
  const target = event.target as HTMLInputElement;

  const files = target.files || [];

  emits("update:modelValue", files[0]);
};
</script>
