<template>
    <div
        class="flex flex-col items-center gap-6 justify-center my-auto min-h-screen lg:gap-10"
    >
        <h1 class="text-3xl font-semibold text-center md:text-4xl lg:text-5xl">
            Page Not Found
        </h1>
        <Btn
            theme="accent"
            size="sm"
            to="/"
            class="px-4 py-[13px] md:px-6 md:py-4"
        >
            Go back home
        </Btn>
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
