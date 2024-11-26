<template>
    <div class="w-screen h-screen flex flex-col gap-6 items-center justify-center lg:gap-10">
        <h1 class="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
            Page Not Found
        </h1>
        <NuxtLink to="/"
            class="px-[14px] py-[9px] border border-appGray-700 rounded-[32px] text-sm leading-none tracking-[-0.41px] text-appGray-100 lg:px-6 lg:py-[15px] lg:text-2xl lg:leading-none">
            Go back home
        </NuxtLink>
    </div>
</template>

<script setup lang="ts">
const { setOgHead } = useHeadTags();

useHead(() =>
    setOgHead({
        title: 'Page Not Found',
    }),
);
</script>
