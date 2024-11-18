<template>
    <div>
        <ContactHero />
        <ContactForm />
    </div>
</template>

<script setup lang="ts">
const { setOgHead } = useHeadTags();

useHead(() =>
    setOgHead({
        title: 'Contact - BrandCrafters',
    }),
);
</script>
