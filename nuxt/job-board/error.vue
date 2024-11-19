<template>
    <div
        class="h-screen flex flex-col gap-6 items-center justify-center lg:gap-10"
    >
        <h1 class="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
            Page Not Found
        </h1>
        <Btn to="/"> Go back home </Btn>
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
