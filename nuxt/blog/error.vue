<template>
    <div
        class="flex flex-col gap-6 items-center justify-center min-h-screen my-auto lg:gap-10"
    >
        <h1 class="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
            Page Not Found
        </h1>
        <NuxtLink
            to="/"
            class="flex items-center px-[15px] py-2.5 bg-appAccent rounded-[32px]"
        >
            <span
                class="text-sm leading-none tracking-[-0.41px] mr-1.5 md:text-base md:leading-none md:mr-2 lg:text-xl lg:leading-none"
            >
                Go back home
            </span>
            <SvgoArrow
                filled
                :font-controlled="false"
                class="w-[14px] h-[14px] md:w-4 md:h-4 lg:w-5 lg:h-5"
            />
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
