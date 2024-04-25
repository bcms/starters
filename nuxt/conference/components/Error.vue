<template>
  <div
    class="w-screen h-[calc(100vh-150px)] flex flex-col gap-6 items-center justify-center lg:gap-10"
  >
    <h1 class="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
      Page Not Found
    </h1>
    <button
      class="flex items-center px-5 py-[13px] bg-black rounded-[48px] lg:col-start-2 lg:row-start-1 lg:px-[26px] lg:py-[19px]"
      @click="goBack"
    >
      <span
        class="text-sm leading-none tracking-[-0.41px] font-semibold text-white uppercase mr-2 lg:text-lg lg:leading-none"
      >
        Go back home
      </span>
      <ArrowIcon class="w-[14px] h-[14px] text-white lg:w-[18px] lg:h-[18px]" />
    </button>
  </div>
</template>

<script setup lang="ts">
import ArrowIcon from '@/assets/icons/arrow.svg';

const goBack = () => clearError({ redirect: '/' });
</script>
