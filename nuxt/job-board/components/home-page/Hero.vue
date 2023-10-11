<template>
  <section class="pt-10 lg:pt-[104px]">
    <div class="container">
      <div class="max-w-[250px] mx-auto md:max-w-[350px] lg:max-w-[840px]">
        <h1 class="homeHero--title mb-4 lg:mb-8">
          <template v-for="(item, index) in data.title" :key="index">
            <ContentManager
              v-if="item.text && item.text.length > 0"
              :key="index"
              :item="item.text"
              class="text-2xl leading-[1.4] font-medium font-PlayfairDisplay tracking-[-0.41px] md:text-4xl lg:text-[80px] lg:leading-[1.1]"
            />
            <BCMSImage
              v-if="item.image"
              :key="index"
              :options="{
                sizes: {
                  exec: [
                    {
                      width: 176,
                      height: 80,
                    },
                    {
                      width: 352,
                      height: 160,
                    },
                  ],
                },
              }"
              :media="item.image"
              class="image cover w-[53px] h-6 flex-shrink-0 translate-y-1 mx-1 bg-center bg-cover lg:w-[176px] lg:h-20 lg:mx-3 lg:translate-y-3"
            />
          </template>
        </h1>
        <ContentManager
          :item="data.description"
          class="text-sm leading-[1.4] font-medium tracking-[-0.41px] text-center text-appGray-600 mb-8 md:text-base lg:leading-none lg:mb-10"
        />
        <Btn class="mx-auto mb-12 lg:mb-[120px]" @click="scrollToJobs">
          <span>Search Jobs Now</span>
        </Btn>
      </div>
    </div>
    <div class="relative">
      <BCMSImage
        :media="data.cover"
        class="w-full aspect-[2.76] cover lg:aspect-[3.1]"
      />
      <div class="absolute top-0 left-0 w-full h-full bg-black/60" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { BCMSImage } from '@/bcms-components';
import { HomeHeroGroup } from '@/bcms/types';

defineProps({
  data: {
    type: Object as PropType<HomeHeroGroup>,
    required: true,
  },
});

const scrollToJobs = () => {
  const jobs = document.getElementById('homeJobs');

  if (jobs) {
    jobs.scrollIntoView({ behavior: 'smooth' });
  }
};
</script>

<style lang="scss">
.homeHero--title {
  * {
    @apply inline;
  }
  .image {
    @apply inline-block;
    picture {
      @apply flex;
    }
  }
}
</style>
