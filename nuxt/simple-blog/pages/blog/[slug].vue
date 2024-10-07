<template>
    <div>
        <NuxtLink to="/">Back to home</NuxtLink>
        <pre>{{ data }}</pre>
    </div>
</template>

<script setup lang="ts">
const ctx = useRoute();
const { data, error } = await useFetch(`/api/blog/${ctx.params.slug}`);
</script>
