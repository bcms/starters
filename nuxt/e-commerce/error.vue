<template>
    <div
        class="w-screen h-[calc(100vh-150px)] flex flex-col gap-6 items-center justify-center lg:gap-10"
    >
        <h1 class="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
            Page Not Found
        </h1>
        <Btn theme="dark-green" label="Go back home" to="/" />
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
