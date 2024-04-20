<template>
  <div
    class="w-screen h-screen flex flex-col gap-6 items-center justify-center lg:gap-10"
  >
    <h1 class="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
      Error page
    </h1>
    <button
      class="flex px-[18px] py-[14px] rounded-[32px] border border-appGray-200 text-xs leading-none tracking-[-0.41px] font-medium text-appGray-500 uppercase mb-14 lg:px-6 lg:py-4 lg:text-sm lg:leading-none"
      @click="goBack"
    >
      Go back home
    </button>
  </div>
</template>

<script setup lang="ts">
const goBack = () => clearError({ redirect: '/' });
</script>
