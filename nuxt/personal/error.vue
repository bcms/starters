<template>
  <div>
    <Error />
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
