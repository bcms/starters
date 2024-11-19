<template>
    <div>
        <div className="pt-8 pb-14 md:pb-20 lg:pt-20 lg:pb-[120px]">
            <div className="container">
                <div className="max-w-[632px] mx-auto">
                    <JobsPostForm />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { setOgHead } = useHeadTags();

useHead(() =>
    setOgHead({
        title: `Job post - Hospitale`,
    }),
);
</script>
