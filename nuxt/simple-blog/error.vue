<template>
    <div class="overflow-hidden flex flex-col min-h-screen">
        <main class="flex flex-col flex-1">
            <div
                class="flex flex-col items-center gap-6 justify-center my-auto min-h-[400px] lg:gap-10"
            >
                <h1
                    class="text-3xl font-semibold text-center md:text-4xl lg:text-5xl"
                >
                    Page Not Found
                </h1>
                <button
                    class="border border-appGray-200 bg-appGray-100 flex leading-none px-3 py-2 text-xl font-medium rounded-lg transition-colors duration-300 hover:bg-appGray-200 focus-visible:bg-appGray-200 md:px-5 md:py-4 md:text-2xl"
                    @click="
                        clearError();
                        $router.push('/');
                    "
                >
                    Go back home
                </button>
            </div>
        </main>
        <LayoutFooter />
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
