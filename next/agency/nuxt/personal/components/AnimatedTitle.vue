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
    default: 'h1',
  },
  title: {
    type: String,
    required: true,
  },
  titleClass: {
    type: String,
    required: false,
    default: '',
  },
});

const { $gsap: gsap } = useNuxtApp();

const titleDOM = ref<HTMLHeadingElement>();

onMounted(() => {
  if (titleDOM.value) {
    const containerWidth =
      document.querySelector('.container')?.clientWidth || 0;

    gsap.to(titleDOM.value, {
      x: containerWidth - titleDOM.value.clientWidth,
      scrollTrigger: {
        start: 'top left',
        end: 'bottom right',
        scrub: 1,
      },
    });
  }
});
</script>
