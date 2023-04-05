<template>
  <div class="flex">
    <component :is="tag" ref="titleDOM" :class="titleClass">
      {{ title }}
    </component>
  </div>
</template>

<script setup lang="ts">
defineProps({
  tag: {
    type: String,
    required: false,
    default: "h1",
  },
  title: {
    type: String,
    required: true,
  },
  titleClass: {
    type: String,
    required: false,
    default: "",
  },
});

const { $gsap: gsap } = useNuxtApp();

const titleDOM = ref<HTMLHeadingElement>();

onMounted(() => {
  if (titleDOM.value) {
    gsap.to(titleDOM.value, {
      x: "-100%",
      scrollTrigger: {
        start: "top left",
        end: "bottom right",
        scrub: true,
      },
    });
  }
});
</script>
