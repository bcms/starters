<template>
    <div>
        <div
            class="pt-8 pb-10 overflow-hidden md:pb-20 lg:pt-[72px] lg:pb-[120px]"
        >
            <div class="container">
                <AnimatedTitle
                    title="Contact"
                    class="mb-10 md:mb-20 lg:mb-[192px]"
                    titleClass="text-[114px] flex-shrink-0 leading-none font-Helvetica tracking-[1.59px] sm:text-[190px] md:text-[220px] lg:text-[300px] lg:tracking-[5.59px] xl:text-[464px]"
                />
                <ContactPageForm />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const { setOgHead } = useHeadTags();

useHead(() =>
    setOgHead({
        title: `Contact - Personal Website`,
    }),
);
</script>
