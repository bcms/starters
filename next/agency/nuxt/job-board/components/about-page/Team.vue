<template>
  <section>
    <div class="container">
      <h2
        class="text-2xl leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] text-center mb-4 lg:text-5xl lg:leading-none lg:mb-5"
      >
        {{ data.title }}
      </h2>
      <ContentManager
        :item="data.description"
        class="text-sm leading-[1.4] font-medium tracking-[-0.41px] text-appGray-600 text-center max-w-[833px] mx-auto mb-10 lg:text-lg lg:leading-normal lg:mb-[105px]"
      />
      <div
        class="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3 xl:gap-x-12 xl:gap-y-14"
      >
        <div v-for="(member, index) in members" :key="index">
          <div class="relative rounded-xl overflow-hidden mb-[18px] lg:mb-6">
            <BCMSImage
              :media="member.image"
              :options="{
                sizes: {
                  exec: [
                    {
                      width: 650,
                      height: 650,
                    },
                  ],
                },
              }"
              class="aspect-[1.69] cover xl:aspect-square"
            />
            <div class="absolute top-0 left-0 w-full h-full bg-black/40" />
          </div>
          <div
            class="text-sm leading-none font-medium font-PlayfairDisplay tracking-[-0.41px] mb-1.5 lg:text-2xl lg:leading-none lg:mb-[14px]"
          >
            {{ member.title }}
          </div>
          <div
            class="text-xs leading-none font-medium tracking-[-0.41px] text-[#48465F] mb-3 lg:text-xl lg:leading-none lg:mb-5"
          >
            {{ member.role }}
          </div>
          <ContentManager
            :item="member.description"
            class="text-xs leading-[1.4] font-medium tracking-[-0.41px] text-appGray-600 lg:text-lg lg:leading-normal"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { PropType } from 'vue';
import { BCMSImage } from '@/bcms-components';
import { AboutTeamGroup, TeamMemberEntryMeta } from '@/bcms/types';

defineProps({
  data: {
    type: Object as PropType<AboutTeamGroup>,
    required: true,
  },
  members: {
    type: Array as PropType<TeamMemberEntryMeta[]>,
    required: true,
  },
});
</script>
