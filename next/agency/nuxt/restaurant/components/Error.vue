<template>
  <div
    class="w-screen h-screen flex flex-col gap-6 items-center justify-center lg:gap-10"
  >
    <h1 class="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
      Error page
    </h1>
    <Btn
      theme="accent"
      size="sm"
      class="px-4 py-[13px] md:px-6 md:py-4"
      @click="goBack"
      >Go back home</Btn
    >
  </div>
</template>

<script setup lang="ts">
const goBack = () => clearError({ redirect: '/' });
</script>
