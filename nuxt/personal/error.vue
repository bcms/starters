<template>
    <div
        class="flex flex-col gap-6 items-center justify-center h-screen my-auto lg:gap-10"
    >
        <h1 class="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
            Page Not Found
        </h1>
        <NuxtLink
            to="/"
            class="flex px-[18px] py-[14px] rounded-[32px] border border-appGray-200 text-xs leading-none tracking-[-0.41px] font-medium text-appGray-500 uppercase mb-14 lg:px-6 lg:py-4 lg:text-sm lg:leading-none"
        >
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
